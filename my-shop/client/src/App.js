import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState({ products: [], news: '' });

  // Завантажуємо дані з сервера
  useEffect(() => {
    fetch('http://localhost:5000/api/data')
      .then(res => res.json())
      .then(json => setData(json));
  }, []);

  // ФУНКЦІЯ АДМІНА (тепер всередині компонента)
  const addProduct = () => {
    const name = prompt("Назва товару:");
    const price = prompt("Ціна:");
    
    if (name && price) {
      fetch('http://localhost:5000/api/admin/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, price })
      }).then(() => window.location.reload()); 
    }
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1>Мій Магазин</h1>
      
      {/* КНОПКА АДМІНА */}
      <button onClick={addProduct} style={{ marginBottom: '20px', padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        ➕ Додати товар (Адмін)
      </button>

      <p style={{ backgroundColor: '#fff3cd', padding: '10px', borderRadius: '5px' }}>📢 {data.news}</p>
      
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '20px', marginTop: '30px' }}>
        {data.products.map(item => (
          <div key={item.id} style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '15px', width: '220px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <h3>{item.name}</h3>
            <p style={{ fontWeight: 'bold' }}>Ціна: {item.price} грн</p>
            <button onClick={() => alert(`Оплатіть ${item.price} грн, щоб отримати посилання!`)} 
                    style={{ background: '#007bff', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', width: '100%' }}>
              Купити
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;