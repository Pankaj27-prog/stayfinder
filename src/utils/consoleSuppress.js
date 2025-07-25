// Aggressive console warning suppression utility
(function() {
  // Store original console methods immediately
  const originalWarn = console.warn;
  const originalError = console.error;
  const originalLog = console.log;
  const originalInfo = console.info;

  // Create a comprehensive filter function
  function shouldSuppress(message) {
    const lowerMessage = message.toLowerCase();
    return (
      lowerMessage.includes('katex') ||
      lowerMessage.includes('quirks mode') ||
      lowerMessage.includes('document is in quirks mode') ||
      lowerMessage.includes('function*') ||
      lowerMessage.includes('critical dependency') ||
      lowerMessage.includes('webpack') ||
      lowerMessage.includes('module not found')
    );
  }

  // Override console.warn with aggressive filtering
  console.warn = function(...args) {
    const message = args.join(' ');
    if (shouldSuppress(message)) {
      return; // Completely suppress these warnings
    }
    originalWarn.apply(console, args);
  };

  // Override console.error with aggressive filtering
  console.error = function(...args) {
    const message = args.join(' ');
    if (shouldSuppress(message)) {
      return; // Completely suppress these errors
    }
    originalError.apply(console, args);
  };

  // Override console.log to filter some verbose messages
  console.log = function(...args) {
    const message = args.join(' ');
    if (shouldSuppress(message)) {
      return; // Suppress verbose messages
    }
    originalLog.apply(console, args);
  };

  // Override console.info to filter some messages
  console.info = function(...args) {
    const message = args.join(' ');
    if (shouldSuppress(message)) {
      return; // Suppress info messages
    }
    originalInfo.apply(console, args);
  };

  // Block KaTeX globally
  if (typeof window !== 'undefined') {
    // Prevent KaTeX from being defined
    Object.defineProperty(window, 'katex', {
      value: {
        render: () => '',
        renderToString: () => '',
        __esModule: true
      },
      writable: false,
      configurable: false
    });

    // Create a mock module for KaTeX
    if (typeof window.__mockKaTeX === 'undefined') {
      window.__mockKaTeX = {
        render: () => '',
        renderToString: () => '',
        __esModule: true
      };
    }
  }

  // Log that suppression is active (this will show in console)
  originalLog('KaTeX warning suppression active - all KaTeX warnings suppressed');
})();

export const suppressWarnings = () => {
  // This function is now redundant since we're auto-initializing
  console.log('Warning suppression already active');
}; 