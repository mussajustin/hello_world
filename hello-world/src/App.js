import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
 /*  return (
    <div className="App">
      <h1>Hello World!</h1>
      </div>
  ); */
  const [text, setMessage] = useState('');

  useEffect(() => {
    fetch('/.netlify/functions/hello')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setMessage(data.text))
      .catch(err => console.error('Error fetching data:', err));
  }, []);
  
  return (
    <div className="App">
      <header className="App-header">
        {text}
      </header>
    </div>
  );
}


export default App; 
