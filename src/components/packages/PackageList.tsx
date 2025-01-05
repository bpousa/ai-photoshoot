import React from 'react';
import { Package } from '@/types/packages';
import { PackageCard } from './PackageCard';

interface PackageListProps {
  packages: Package[];
  onEdit?: (pkg: Package) => void;
}

export function PackageList({ packages, onEdit }: PackageListProps) {
  const [filter, setFilter] = React.useState<'all' | 'active' | 'inactive'>('all');

  const filteredPackages = React.useMemo(() => {
    return packages.filter(pkg => {
      if (filter === 'all') return true;
      return filter === 'active' ? pkg.active : !pkg.active;
    });
  }, [packages, filter]);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex space-x-2">
        {(['all', 'active', 'inactive'] as const).map((value) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={`
              px-3 py-1 text-sm rounded-md
              ${filter === value 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-600 hover:bg-gray-100'}
            `}
          >
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </button>
        ))}
      </div>

      {/* Package Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPackages.map((pkg) => (
          <PackageCard
            key={pkg.id}
            package={pkg}
            onEdit={() => onEdit?.(pkg)}
          />
        ))}
      </div>
    </div>
  );
}