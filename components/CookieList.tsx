import React, { useRef, useMemo } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Cookies } from 'wxt/browser';
import { Trash2, Edit2, Globe, Shield, Clock } from 'lucide-react';
import { Button, cn } from './ui';

interface CookieItemProps {
  cookie: Cookies.Cookie;
  onDelete: (cookie: Cookies.Cookie) => void;
  onEdit: (cookie: Cookies.Cookie) => void;
}

const CookieItem: React.FC<CookieItemProps> = ({ cookie, onDelete, onEdit }) => {
  return (
    <div className="group flex items-center justify-between p-3 border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
      <div className="flex flex-col min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm text-slate-900 dark:text-slate-100 truncate">
            {cookie.name}
          </span>
          {cookie.secure && <Shield className="w-3 h-3 text-green-500" title="Secure" />}
          {cookie.httpOnly && <Clock className="w-3 h-3 text-orange-500" title="HttpOnly" />}
        </div>
        <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
          <Globe className="w-3 h-3" />
          <span className="truncate">{cookie.domain}</span>
          <span className="text-slate-300 dark:text-slate-600">|</span>
          <span className="truncate">{cookie.path}</span>
        </div>
      </div>
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button variant="ghost" size="icon" onClick={() => onEdit(cookie)}>
          <Edit2 className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" className="hover:text-red-500" onClick={() => onDelete(cookie)}>
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

interface CookieListProps {
  cookies: Cookies.Cookie[];
  onDelete: (cookie: Cookies.Cookie) => void;
  onEdit: (cookie: Cookies.Cookie) => void;
}

export const CookieList: React.FC<CookieListProps> = ({ cookies, onDelete, onEdit }) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: cookies.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 64, // Estimate height of CookieItem
    overscan: 10,
  });

  return (
    <div
      ref={parentRef}
      className="flex-1 overflow-auto bg-white dark:bg-slate-950"
      style={{ height: '100%' }}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => (
          <div
            key={virtualRow.key}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${virtualRow.size}px`,
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            <CookieItem
              cookie={cookies[virtualRow.index]}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          </div>
        ))}
      </div>
      {cookies.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full p-8 text-slate-500">
          <Globe className="w-12 h-12 mb-4 opacity-20" />
          <p className="text-sm">No cookies found</p>
        </div>
      )}
    </div>
  );
};
