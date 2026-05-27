import React, { useState, useEffect } from 'react';
import { Cookies } from 'wxt/browser';
import { X, Save } from 'lucide-react';
import { Button, Input, cn } from './ui';

interface CookieModalProps {
  cookie?: Cookies.Cookie | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (details: any) => void;
}

export const CookieModal: React.FC<CookieModalProps> = ({
  cookie,
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<any>({
    name: '',
    value: '',
    domain: '',
    path: '/',
    secure: false,
    httpOnly: false,
    expirationDate: undefined,
  });

  useEffect(() => {
    if (cookie) {
      setFormData({
        name: cookie.name,
        value: cookie.value,
        domain: cookie.domain,
        path: cookie.path,
        secure: cookie.secure,
        httpOnly: cookie.httpOnly,
        expirationDate: cookie.expirationDate,
      });
    } else {
      setFormData({
        name: '',
        value: '',
        domain: '',
        path: '/',
        secure: false,
        httpOnly: false,
        expirationDate: undefined,
      });
    }
  }, [cookie]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl w-full max-w-md animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-lg font-semibold dark:text-white">
            {cookie ? 'Edit Cookie' : 'Add New Cookie'}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium dark:text-slate-300">Name</label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g. session_id"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium dark:text-slate-300">Value</label>
            <Input
              name="value"
              value={formData.value}
              onChange={handleChange}
              placeholder="Cookie value"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium dark:text-slate-300">Domain</label>
              <Input
                name="domain"
                value={formData.domain}
                onChange={handleChange}
                required
                placeholder=".google.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium dark:text-slate-300">Path</label>
              <Input
                name="path"
                value={formData.path}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="secure"
                checked={formData.secure}
                onChange={handleChange}
                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm dark:text-slate-300">Secure</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="httpOnly"
                checked={formData.httpOnly}
                onChange={handleChange}
                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm dark:text-slate-300">HttpOnly</span>
            </label>
          </div>
          <div className="flex justify-end gap-2 pt-4 border-t border-slate-200 dark:border-slate-800">
            <Button variant="secondary" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" className="gap-2">
              <Save className="w-4 h-4" />
              Save Cookie
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
