# Cookie Manager Pro 🍪

Advanced Chrome Extension for cookie inspection, editing, and management. Built with modern web technologies and optimized for performance.

## Key Features

- **Real-time Synchronization**: Instant updates via Service Worker whenever cookies are modified.
- **High Performance**: Virtualized rendering (using `@tanstack/react-virtual`) capable of handling 10,000+ cookie records smoothly.
- **Import/Export**: Seamlessly backup and restore cookies via JSON format.
- **Advanced Editing**: Modify any cookie attribute including Secure, HttpOnly, and Expiration.
- **Search & Filter**: Blazing fast search by domain or name.
- **Modern UI**: Clean, dark-mode ready interface built with Tailwind CSS and Lucide icons.

## Tech Stack

- **Framework**: [WXT](https://wxt.dev/) (Web Extension Framework)
- **UI Library**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Performance**: @tanstack/react-virtual
- **Testing**: Vitest + Testing Library
- **Language**: TypeScript

## Installation & Setup

1. **Clone the repository**
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Run in development mode**:
   ```bash
   npm run dev
   ```
4. **Build for production**:
   ```bash
   npm run build
   ```

## Testing

The project includes integration tests validating cookie behavior and utility functions.
```bash
npx vitest
```

## Architecture

- `entrypoints/background.ts`: Service worker listening for cookie events and broadcasting changes.
- `entrypoints/popup/`: Main UI entrypoint with React and Tailwind.
- `lib/cookies.ts`: Core business logic for cookie manipulation.
- `components/CookieList.tsx`: Virtualized list implementation for performance.
