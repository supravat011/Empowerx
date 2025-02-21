import React, { useState } from 'react';

const Queries = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');

  const handleSearch = () => {
    if (query.trim()) {
      // Simulate a query result, replace with actual logic
      setResult(`Result for "${query}"`);
      setQuery('');
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Search Queries</h3>
      <input 
        type="text" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        style={styles.input}
        placeholder="Enter your query..."
      />
      <button onClick={handleSearch} style={styles.button}>Search</button>
      {result && (
        <div style={styles.resultCard}>
          <div style={styles.resultText}>{result}</div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    width: '400px',
    margin: '20px auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    marginBottom: '20px',
    textAlign: 'center',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007BFF',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '16px',
  },
  resultCard: {
    marginTop: '20px',
    padding: '15px',
    borderRadius: '8px',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  resultText: {
    color: '#333',
  },
};

export default Queries;
