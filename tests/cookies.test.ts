import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getAllCookies, exportCookies } from '../lib/cookies';

// Mock the browser API
const mockCookies = [
  { name: 'test1', value: 'val1', domain: 'example.com', path: '/' },
  { name: 'test2', value: 'val2', domain: 'example.com', path: '/' },
];

vi.stubGlobal('browser', {
  cookies: {
    getAll: vi.fn().mockResolvedValue(mockCookies),
    set: vi.fn().mockResolvedValue({}),
    remove: vi.fn().mockResolvedValue({}),
  },
});

describe('Cookie Utilities', () => {
  it('should fetch all cookies', async () => {
    const cookies = await getAllCookies();
    expect(cookies).toHaveLength(2);
    expect(cookies[0].name).toBe('test1');
  });

  it('should export cookies to JSON string', () => {
    const json = exportCookies(mockCookies as any);
    const parsed = JSON.parse(json);
    expect(parsed).toHaveLength(2);
    expect(parsed[0].name).toBe('test1');
  });
});
