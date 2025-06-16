const getAllProducts = async () => {
  try {
    const data = await fetch('https://dummyjson.com/products?limit=194');

    if (!data.ok) {
      if (data.status === 429) {
        throw new Error(
          'Demasiadas peticiones. Por favor, espera un momento e intenta de nuevo.'
        );
      }
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
