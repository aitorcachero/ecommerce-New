import mockData from '../../mocks/products.json';

const getAllProducts = async () => {
  try {
    // Simular un pequeño delay para mantener la experiencia de carga
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Retornar los productos del mock
    return mockData.products;
  } catch (error) {
    console.error('Error al obtener productos del mock:', error);
    throw error;
  }
}

export { getAllProducts };
