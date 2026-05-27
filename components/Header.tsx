import React from 'react';
import { Search, Download, Upload, RefreshCw, Plus } from 'lucide-react';
import { Button, Input } from './ui';

interface HeaderProps {
  onSearch: (query: string) => void;
  onImport: () => void;
  onExport: () => void;
  onRefresh: () => void;
  onAdd: () => void;
  isRefreshing: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onSearch,
  onImport,
  onExport,
  onRefresh,
  onAdd,
  isRefreshing,
}) => {
  return (
    <div className="flex flex-col gap-3 p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <span className="bg-blue-600 text-white p-1 rounded">CP</span>
          Cookie Manager
        </h1>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" onClick={onRefresh} disabled={isRefreshing}>
            <RefreshCw className={cn("w-4 h-4", isRefreshing && "animate-spin")} />
          </Button>
          <Button variant="ghost" size="icon" onClick={onAdd}>
            <Plus className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onImport}>
            <Upload className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onExport}>
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input
          placeholder="Search cookies by name or domain..."
          className="pl-9"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </div>
  );
};

import { cn } from './ui';
