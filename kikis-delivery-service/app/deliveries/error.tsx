"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
 <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>An unexpected error occurred</h2>
      <p style={{ color: '#888', margin: '1rem 0' }}>
        {error.message || 'Something went wrong while loading this page.'}
      </p>
      <button
        onClick={() => reset()}
        style={{
          padding: '0.6rem 1.2rem',
          borderRadius: '4px',
          border: 'none',
          backgroundColor: '#000',
          color: '#fff',
          cursor: 'pointer',
        }}
      >
        Try again
      </button>
    </div>
  );
}
