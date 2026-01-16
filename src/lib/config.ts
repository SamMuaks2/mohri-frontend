export const getApiUrl = () => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  
  // Fallback for development
  if (typeof window === 'undefined') {
    // Server-side
    return process.env.API_URL || 'http://localhost:4000';
  } else {
    // Client-side
    return 'http://localhost:4000';
  }
};