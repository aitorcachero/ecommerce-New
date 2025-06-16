import mockData from '../../mocks/products.json';

const USE_MOCK = true; // Cambia a false para usar la API real

const getAllProducts = async (retries = 3, delay = 1000) => {
  if (USE_MOCK) {
    try {
      // Simular delay de red
      await new Promise((resolve) => setTimeout(resolve, 300));
      return mockData.products;
    } catch (error) {
      console.error('Error al obtener productos del mock:', error);
      throw error;
    }
  }

  // Código original para API real
  try {
    const data = await fetch('https://dummyjson.com/products?limit=194');

    if (data.status === 429 && retries > 0) {
      console.log(`Rate limit alcanzado. Reintentando en ${delay}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return getAllProducts(retries - 1, delay * 2);
    }

    if (!data.ok) {
      throw new Error(`Error ${data.status}: ${data.statusText}`);
    }

    const json = await data.json();
    return json.products;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
};

export { getAllProducts };
