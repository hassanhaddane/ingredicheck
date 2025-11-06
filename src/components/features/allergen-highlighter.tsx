'use client';

import { COMMON_ALLERGENS } from '@/lib/schemas';

interface AllergenHighlighterProps {
  text: string;
  className?: string;
}

export function AllergenHighlighter({ text, className = '' }: AllergenHighlighterProps) {
  if (!text) return null;

  const highlightAllergens = (ingredientText: string) => {
    const result: React.ReactNode[] = [];
    let lastIndex = 0;
    const lowerText = ingredientText.toLowerCase();

    // Find all allergen positions
    const allergenMatches: { start: number; end: number; allergen: string }[] = [];

    COMMON_ALLERGENS.forEach((allergen) => {
      const regex = new RegExp(`\\b${allergen}\\b`, 'gi');
      let match;

      while ((match = regex.exec(lowerText)) !== null) {
        allergenMatches.push({
          start: match.index,
          end: match.index + match[0].length,
          allergen: match[0],
        });
      }
    });

    // Sort by start position
    allergenMatches.sort((a, b) => a.start - b.start);

    // Remove overlapping matches
    const filteredMatches = allergenMatches.filter((match, index) => {
      if (index === 0) return true;
      return match.start >= allergenMatches[index - 1].end;
    });

    // Build the result with highlighting
    filteredMatches.forEach((match, index) => {
      // Add text before the allergen
      if (match.start > lastIndex) {
        result.push(
          <span key={`text-${index}`}>{ingredientText.substring(lastIndex, match.start)}</span>
        );
      }

      // Add highlighted allergen
      result.push(
        <mark
          key={`allergen-${index}`}
          className="bg-yellow-200 dark:bg-yellow-900/50 text-yellow-900 dark:text-yellow-100 px-1 rounded font-semibold"
        >
          {ingredientText.substring(match.start, match.end)}
        </mark>
      );

      lastIndex = match.end;
    });

    // Add remaining text
    if (lastIndex < ingredientText.length) {
      result.push(<span key="text-end">{ingredientText.substring(lastIndex)}</span>);
    }

    return result.length > 0 ? result : ingredientText;
  };

  return <div className={className}>{highlightAllergens(text)}</div>;
}
