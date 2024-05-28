import React from 'react';

const App = () => {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    async function selectProd() {
      try {
        const response = await fetch('http://localhost:3333/products', {
          method: 'GET',
        });
        if (!response.ok) {
          throw new Error('Erro na resposta da rede');
        }
        const json = await response.json();
        setData(json);
      } catch (error) {
        setError(error.message);
      }
    }
    selectProd();
  }, []);

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <div>
      <h1>Lista de Produtos</h1>
      {data ? (
        <ul>
          {data.map((product) => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default App;
