import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState({ products: [], news: '' });

  useEffect(() => {
    // Беремо дані з нашого сервера
    fetch('http://localhost:5000/api/data')
      .then(res => res.json())
      .then(json => setData(json));
  }, []);

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1>Мій Магазин</h1>
      <p style={{ backgroundColor: '#fff3cd', padding: '10px' }}>📢 {data.news}</p>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '30px' }}>
        {data.products.map(item => (
          <div key={item.id} style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '15px', width: '200px' }}>
            <h3>{item.name}</h3>
            <p>Ціна: {item.price} грн</p>
            <button onClick={() => alert(`Оплатіть ${item.price} грн, щоб отримати посилання!`)} 
                    style={{ background: '#007bff', color: '#fff', border: 'none', padding: '10px', borderRadius: '5px', cursor: 'pointer' }}>
              Купити
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;