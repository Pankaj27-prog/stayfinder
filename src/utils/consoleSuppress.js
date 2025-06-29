// Console warning suppression utility
export const suppressWarnings = () => {
  // Store original console methods
  const originalWarn = console.warn;
  const originalError = console.error;

  // Override console.warn to filter out specific warnings
  console.warn = function(...args) {
    const message = args.join(' ');
    
    // Suppress KaTeX-related warnings
    if (message.includes('KaTeX') && message.includes('quirks mode')) {
      return;
    }
    
    // Suppress general quirks mode warnings
    if (message.includes('document is in quirks mode')) {
      return;
    }
    
    // Suppress other common third-party warnings
    if (message.includes('function*') || message.includes('Critical dependency')) {
      return;
    }
    
    // Call original warn method for other warnings
    originalWarn.apply(console, args);
  };

  // Override console.error to filter out specific errors
  console.error = function(...args) {
    const message = args.join(' ');
    
    // Suppress KaTeX-related errors
    if (message.includes('KaTeX')) {
      return;
    }
    
    // Call original error method for other errors
    originalError.apply(console, args);
  };

  // Log that warning suppression is active
  console.log('Console warning suppression active');
};

// Auto-initialize when imported
suppressWarnings(); 