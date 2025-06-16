const getAllProducts = async (retries = 3, delay = 1000) => {
  try {
    const data = await fetch('https://dummyjson.com/products?limit=194');

    if (data.status === 429 && retries > 0) {
      console.log(`Rate limit alcanzado. Reintentando en ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
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
}

export { getAllProducts };
