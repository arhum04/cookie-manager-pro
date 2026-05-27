import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Cookies } from 'wxt/browser';
import { getAllCookies, removeCookie, setCookie, exportCookies, importCookies } from '@/lib/cookies';
import { Header } from '@/components/Header';
import { CookieList } from '@/components/CookieList';
import { CookieModal } from '@/components/CookieModal';
import './App.css';

function App() {
  const [cookies, setCookies] = useState<Cookies.Cookie[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCookie, setSelectedCookie] = useState<Cookies.Cookie | null>(null);

  const fetchCookies = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const allCookies = await getAllCookies();
      setCookies(allCookies);
    } catch (error) {
      console.error('Error fetching cookies:', error);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchCookies();

    // Listen for real-time updates from background script
    const listener = (message: any) => {
      if (message.type === 'COOKIE_CHANGED') {
        fetchCookies();
      }
    };

    browser.runtime.onMessage.addListener(listener);
    return () => browser.runtime.onMessage.removeListener(listener);
  }, [fetchCookies]);

  const filteredCookies = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return cookies.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.domain.toLowerCase().includes(query)
    );
  }, [cookies, searchQuery]);

  const handleDelete = async (cookie: Cookies.Cookie) => {
    const protocol = cookie.secure ? 'https://' : 'http://';
    const domain = cookie.domain.startsWith('.') ? cookie.domain.substring(1) : cookie.domain;
    const url = `${protocol}${domain}${cookie.path}`;
    
    await removeCookie({ url, name: cookie.name, storeId: cookie.storeId });
    fetchCookies();
  };

  const handleEdit = (cookie: Cookies.Cookie) => {
    setSelectedCookie(cookie);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedCookie(null);
    setIsModalOpen(true);
  };

  const handleSave = async (details: any) => {
    const protocol = details.secure ? 'https://' : 'http://';
    const domain = details.domain.startsWith('.') ? details.domain.substring(1) : details.domain;
    const url = `${protocol}${domain}${details.path}`;

    await setCookie({
      ...details,
      url,
    });
    setIsModalOpen(false);
    fetchCookies();
  };

  const handleExport = () => {
    const data = exportCookies(filteredCookies);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cookies-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = async (e: any) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = async (event) => {
          const content = event.target?.result as string;
          try {
            const result = await importCookies(content);
            alert(`Imported ${result.success} cookies. ${result.failed} failed.`);
            fetchCookies();
          } catch (err) {
            alert('Failed to import cookies: ' + (err as Error).message);
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-hidden">
      <Header
        onSearch={setSearchQuery}
        onImport={handleImport}
        onExport={handleExport}
        onRefresh={fetchCookies}
        onAdd={handleAdd}
        isRefreshing={isRefreshing}
      />
      <div className="flex-1 overflow-hidden relative">
        <CookieList
          cookies={filteredCookies}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
        <div className="absolute bottom-4 right-4 bg-slate-900/80 text-white px-3 py-1 rounded-full text-xs backdrop-blur-sm">
          {filteredCookies.length} {filteredCookies.length === 1 ? 'cookie' : 'cookies'}
        </div>
      </div>
      <CookieModal
        isOpen={isModalOpen}
        cookie={selectedCookie}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}

export default App;
