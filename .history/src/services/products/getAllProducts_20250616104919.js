async function getAllProducts() {
  const data = await fetch('https://dummyjson.com/products/?limit=194');
  const json = await data.json();

  return json.products;
}

export { getAllProducts };
