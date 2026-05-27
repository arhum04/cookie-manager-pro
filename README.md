# Cookie Manager Pro

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![WXT](https://img.shields.io/badge/WXT-5B45E0?style=flat-square)

Professional-grade Chrome extension for cookie inspection, editing, and secure data portability.

### Stack
**Languages:** TypeScript  
**UI:** React 19, Tailwind CSS v4  
**Tools:** Vite, WXT, Vitest  

Professional-grade Chrome extension for cookie inspection, editing, and secure data portability. Built with modern web standards and optimized for high-performance handling of large datasets.

## Key Features

- **Real-time Synchronization**: Instant UI updates via background service worker listeners, ensuring state consistency across browser sessions.
- **High Performance**: Optimized rendering using `@tanstack/react-virtual`, capable of handling 10,000+ cookie records with constant-time performance.
- **Data Portability**: Secure import and export functionality via JSON format for session backup and migration.
- **Advanced Management**: granular control over cookie attributes including Secure, HttpOnly, SameSite, and Expiration.
- **Efficient Filtering**: Low-latency search implementation for filtering by domain or name.
- **Professional UI**: Responsive interface built with Tailwind CSS, supporting both light and dark mode preferences.

## Technical Architecture

- **Framework**: WXT (Web Extension Framework)
- **Library**: React 19 (TypeScript)
- **Build System**: Vite
- **Styling**: Tailwind CSS v4
- **Performance**: TanStack Virtual
- **Testing**: Vitest with JSDOM and Testing Library

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/arhum04/cookie-manager-pro.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run development mode:
   ```bash
   npm run dev
   ```

### Production Build

To generate the production-ready extension:
```bash
npm run build
```
The output will be available in the `.output/chrome-mv3` directory.

## Testing and Quality Assurance

The project maintains high reliability through automated integration tests.

```bash
npx vitest run
```

## Privacy and Security

Cookie Manager Pro is designed with a security-first approach:
- **Local-only Processing**: No data is transmitted to external servers. All cookie manipulations occur within the local browser context.
- **Minimal Permissions**: The extension requests only the necessary permissions (`cookies`, `storage`) required for its core functionality.
- **Secure Data Handling**: JSON imports are validated to prevent injection of malicious payloads.

## Contributing

Contributions are welcome. Please ensure that any pull requests follow the established TypeScript and styling conventions.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
