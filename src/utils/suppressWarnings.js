// Suppress specific console warnings
export function suppressWarnings() {
  if (typeof window === 'undefined') return;

  // Create a mock KaTeX object
  Object.defineProperty(window, 'katex', {
    value: {
      render: () => '',
      renderToString: () => '',
      __esModule: true
    },
    writable: false,
    configurable: false
  });

  // Store original console methods
  const originalWarn = console.warn;
  const originalError = console.error;

  // Override console.warn
  console.warn = function(...args) {
    const message = args.join(' ').toLowerCase();
    if (message.includes('katex') || message.includes('quirks mode')) {
      return;
    }
    originalWarn.apply(console, args);
  };

  // Override console.error
  console.error = function(...args) {
    const message = args.join(' ').toLowerCase();
    if (message.includes('katex')) {
      return;
    }
    originalError.apply(console, args);
  };
} 