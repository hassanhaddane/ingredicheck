'use client';

import { SearchFilters } from '@/lib/schemas';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Filter, X } from 'lucide-react';
import { useState } from 'react';

interface ProductFiltersProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onReset: () => void;
}

export function ProductFilters({ filters, onFiltersChange, onReset }: ProductFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNutriScore = (grade: 'a' | 'b' | 'c' | 'd' | 'e') => {
    const current = filters.nutriScore || [];
    const updated = current.includes(grade)
      ? current.filter((g) => g !== grade)
      : [...current, grade];
    onFiltersChange({ ...filters, nutriScore: updated.length > 0 ? updated : undefined });
  };

  const toggleNovaGroup = (group: number) => {
    const current = filters.novaGroup || [];
    const updated = current.includes(group)
      ? current.filter((g) => g !== group)
      : [...current, group];
    onFiltersChange({ ...filters, novaGroup: updated.length > 0 ? updated : undefined });
  };

  const toggleOrganic = () => {
    onFiltersChange({ ...filters, organic: !filters.organic });
  };

  const togglePalmOilFree = () => {
    onFiltersChange({ ...filters, palmOilFree: !filters.palmOilFree });
  };

  const hasActiveFilters = Object.values(filters).some(
    (value) => value !== undefined && (Array.isArray(value) ? value.length > 0 : value)
  );

  return (
    <div className="w-full">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full sm:w-auto mb-4"
      >
        <Filter className="h-4 w-4 mr-2" />
        Filtres {hasActiveFilters && `(actifs)`}
      </Button>

      {isOpen && (
        <Card className="mb-6 animate-in slide-in-from-top-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Filtres</CardTitle>
            <div className="flex gap-2">
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={onReset}>
                  <X className="h-4 w-4 mr-1" />
                  Réinitialiser
                </Button>
              )}
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* NutriScore Filter */}
            <div>
              <h3 className="font-semibold mb-2">NutriScore</h3>
              <div className="flex flex-wrap gap-2">
                {(['a', 'b', 'c', 'd', 'e'] as const).map((grade) => (
                  <Badge
                    key={grade}
                    variant={
                      filters.nutriScore?.includes(grade) ? 'default' : 'outline'
                    }
                    className={`cursor-pointer uppercase ${
                      filters.nutriScore?.includes(grade)
                        ? grade === 'a'
                          ? 'bg-green-500 hover:bg-green-600'
                          : grade === 'b'
                          ? 'bg-lime-500 hover:bg-lime-600'
                          : grade === 'c'
                          ? 'bg-yellow-500 hover:bg-yellow-600'
                          : grade === 'd'
                          ? 'bg-orange-500 hover:bg-orange-600'
                          : 'bg-red-500 hover:bg-red-600'
                        : ''
                    }`}
                    onClick={() => toggleNutriScore(grade)}
                  >
                    {grade}
                  </Badge>
                ))}
              </div>
            </div>

            {/* NOVA Group Filter */}
            <div>
              <h3 className="font-semibold mb-2">Groupe NOVA</h3>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4].map((group) => (
                  <Badge
                    key={group}
                    variant={filters.novaGroup?.includes(group) ? 'default' : 'outline'}
                    className={`cursor-pointer ${
                      filters.novaGroup?.includes(group)
                        ? group === 1
                          ? 'bg-green-500 hover:bg-green-600'
                          : group === 2
                          ? 'bg-yellow-500 hover:bg-yellow-600'
                          : group === 3
                          ? 'bg-orange-500 hover:bg-orange-600'
                          : 'bg-red-500 hover:bg-red-600'
                        : ''
                    }`}
                    onClick={() => toggleNovaGroup(group)}
                  >
                    Groupe {group}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Other Filters */}
            <div>
              <h3 className="font-semibold mb-2">Autres critères</h3>
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={filters.organic ? 'default' : 'outline'}
                  className={`cursor-pointer ${
                    filters.organic ? 'bg-green-600 hover:bg-green-700' : ''
                  }`}
                  onClick={toggleOrganic}
                >
                  Bio
                </Badge>
                <Badge
                  variant={filters.palmOilFree ? 'default' : 'outline'}
                  className={`cursor-pointer ${
                    filters.palmOilFree ? 'bg-blue-600 hover:bg-blue-700' : ''
                  }`}
                  onClick={togglePalmOilFree}
                >
                  Sans huile de palme
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
