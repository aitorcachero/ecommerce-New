import React, { useState, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import {
  CheckIcon,
  ChevronUpDownIcon,
  FunnelIcon,
  XMarkIcon,
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
  ChevronUpIcon,
} from '@heroicons/react/20/solid';
import { useProducts } from '../../contexts/ProductsContext';
import ProductCard from '../../components/ProductCard/ProductCard';
import Loader from '../../components/Loader/Loader';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ProductsPage() {
  const { products, loading, getProducts } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    'Todas las categorías'
  );
  const [selectedOrder, setSelectedOrder] = useState('Ordenar por');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Estado simplificado para el rango de precio
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 });

  const categories = [
    'Todas las categorías',
    'smartphones',
    'laptops',
    'fragrances',
    'skincare',
    'groceries',
    'home-decoration',
    'furniture',
    'tops',
    'womens-dresses',
    'womens-shoes',
    'mens-shirts',
    'mens-shoes',
    'mens-watches',
    'womens-watches',
    'womens-bags',
    'womens-jewellery',
    'sunglasses',
    'automotive',
    'motorcycle',
    'lighting',
  ];

  const orderOptions = [
    'Ordenar por',
    'Precio: Menor a Mayor',
    'Precio: Mayor a Menor',
    'Nombre: A-Z',
    'Nombre: Z-A',
    'Rating: Mayor a Menor',
  ];

  // Cargar productos al montar el componente
  useEffect(() => {
    if (!products.length) {
      getProducts();
    }
  }, [products.length, getProducts]);

  // Filtrar y ordenar productos
  useEffect(() => {
    let filtered = [...products];

    // Filtrar por categoría
    if (selectedCategory !== 'Todas las categorías') {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Filtrar por término de búsqueda
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower)
      );
    }

    // Filtrar por rango de precio
    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange.min && product.price <= priceRange.max
    );

    // Ordenar productos
    switch (selectedOrder) {
      case 'Precio: Menor a Mayor':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'Precio: Mayor a Menor':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'Nombre: A-Z':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'Nombre: Z-A':
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'Rating: Mayor a Menor':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, selectedOrder, priceRange, searchTerm]);

  // Efecto para mostrar/ocultar el botón de scroll to top
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setShowScrollTop(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // HANDLERS - Funciones que faltaban
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleOrderChange = (orderType) => {
    setSelectedOrder(orderType);
  };

  // Handler para el slider de precio mínimo
  const handleMinPriceChange = (e) => {
    const value = parseInt(e.target.value);
    setPriceRange((prev) => ({
      min: value,
      max: Math.max(value, prev.max),
    }));
  };

  // Handler para el slider de precio máximo
  const handleMaxPriceChange = (e) => {
    const value = parseInt(e.target.value);
    setPriceRange((prev) => ({
      min: Math.min(prev.min, value),
      max: value,
    }));
  };

  // Handler para los inputs de precio
  const handleMinInputChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    if (value >= 0 && value <= 2000) {
      setPriceRange((prev) => ({
        min: value,
        max: Math.max(value, prev.max),
      }));
    }
  };

  const handleMaxInputChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    if (value >= 0 && value <= 2000) {
      setPriceRange((prev) => ({
        min: Math.min(prev.min, value),
        max: value,
      }));
    }
  };

  // Handler para resetear filtros
  const handleReset = () => {
    setSelectedCategory('Todas las categorías');
    setSelectedOrder('Ordenar por');
    setPriceRange({ min: 0, max: 2000 });
    setSearchTerm('');
  };

  // Función para hacer scroll al top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Contar filtros activos
  const activeFiltersCount = [
    selectedCategory !== 'Todas las categorías',
    selectedOrder !== 'Ordenar por',
    priceRange.min > 0 || priceRange.max < 2000,
    searchTerm.trim().length > 0,
  ].filter(Boolean).length;

  // MOVER EL RETURN DE LOADING DESPUÉS DE TODOS LOS HOOKS
  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Nuestros Productos
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Descubre nuestra amplia selección de productos de alta calidad
            </p>
          </div>

          {/* Barra de búsqueda */}
          <div className="mt-8 max-w-md mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              />
            </div>
          </div>

          {/* Botón de filtros móvil */}
          <div className="mt-6 lg:hidden flex justify-center">
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            >
              <FunnelIcon className="h-5 w-5 mr-2" />
              Filtros
              {activeFiltersCount > 0 && (
                <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-blue-500 rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Aviso de advertencia sobre productos falsos */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mx-4 sm:mx-6 lg:mx-8 mt-4 rounded-r-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              <strong>Aviso:</strong> Los productos mostrados son de demostración y provienen de una API externa (DummyJSON). 
              Las imágenes pueden fallar en cargar ocasionalmente debido a limitaciones del servidor externo. 
              Este es un proyecto de demostración y los productos no están disponibles para compra real.
            </p>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Sidebar de filtros */}
          <aside
            className={`lg:col-span-1 ${
              showMobileFilters ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              {/* Header de filtros */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <AdjustmentsHorizontalIcon className="h-6 w-6 mr-2 text-blue-500" />
                  Filtros
                </h2>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={handleReset}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                  >
                    Limpiar
                  </button>
                )}
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="lg:hidden p-1 text-gray-400 hover:text-gray-500"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>

              {/* Filtro de categoría */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Categoría
                </h3>
                <Listbox
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  {({ open }) => (
                    <>
                      <div className="relative">
                        <Listbox.Button className="relative w-full cursor-default rounded-xl border border-gray-300 bg-white py-3 pl-3 pr-10 text-left shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200">
                          <span className="block truncate font-medium">
                            {selectedCategory}
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>

                        <Transition
                          show={open}
                          as={React.Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {categories.map((category) => (
                              <Listbox.Option
                                key={category}
                                className={({ active }) =>
                                  classNames(
                                    active
                                      ? 'bg-blue-50 text-blue-600'
                                      : 'text-gray-900',
                                    'relative cursor-default select-none py-2 pl-3 pr-9 hover:bg-blue-50 transition-colors duration-150'
                                  )
                                }
                                value={category}
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={classNames(
                                        selected
                                          ? 'font-semibold text-blue-600'
                                          : 'font-normal',
                                        'block truncate'
                                      )}
                                    >
                                      {category}
                                    </span>
                                    {selected && (
                                      <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                                        <CheckIcon className="h-5 w-5 text-blue-600" />
                                      </span>
                                    )}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </>
                  )}
                </Listbox>
              </div>

              {/* Filtro de orden */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Ordenar por
                </h3>
                <Listbox value={selectedOrder} onChange={handleOrderChange}>
                  {({ open }) => (
                    <>
                      <div className="relative">
                        <Listbox.Button className="relative w-full cursor-default rounded-xl border border-gray-300 bg-white py-3 pl-3 pr-10 text-left shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200">
                          <span className="block truncate font-medium">
                            {selectedOrder}
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        </Listbox.Button>

                        <Transition
                          show={open}
                          as={React.Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {orderOptions.map((orderType) => (
                              <Listbox.Option
                                key={orderType}
                                className={({ active }) =>
                                  classNames(
                                    active
                                      ? 'bg-blue-50 text-blue-600'
                                      : 'text-gray-900',
                                    'relative cursor-default select-none py-2 pl-3 pr-9 hover:bg-blue-50 transition-colors duration-150'
                                  )
                                }
                                value={orderType}
                              >
                                {({ selected }) => (
                                  <>
                                    <span
                                      className={classNames(
                                        selected
                                          ? 'font-semibold text-blue-600'
                                          : 'font-normal',
                                        'block truncate'
                                      )}
                                    >
                                      {orderType}
                                    </span>
                                    {selected && (
                                      <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                                        <CheckIcon className="h-5 w-5 text-blue-600" />
                                      </span>
                                    )}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </>
                  )}
                </Listbox>
              </div>

              {/* Filtro de rango de precio */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Rango de Precio
                </h3>
                <div className="space-y-6">
                  {/* Valores actuales */}
                  <div className="flex items-center justify-between text-sm font-medium text-gray-700">
                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg">
                      ${priceRange.min}
                    </span>
                    <span className="text-gray-400">-</span>
                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg">
                      ${priceRange.max}
                    </span>
                  </div>

                  {/* Slider dual moderno */}
                  <div className="relative px-2">
                    <div className="relative h-2 bg-gray-200 rounded-full">
                      {/* Barra de progreso */}
                      <div
                        className="absolute h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                        style={{
                          left: `${(priceRange.min / 2000) * 100}%`,
                          width: `${
                            ((priceRange.max - priceRange.min) / 2000) * 100
                          }%`,
                        }}
                      />

                      {/* Slider mínimo */}
                      <input
                        type="range"
                        min={0}
                        max={2000}
                        step={10}
                        value={priceRange.min}
                        onChange={handleMinPriceChange}
                        className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer slider-thumb"
                        style={{ zIndex: 1 }}
                      />

                      {/* Slider máximo */}
                      <input
                        type="range"
                        min={0}
                        max={2000}
                        step={10}
                        value={priceRange.max}
                        onChange={handleMaxPriceChange}
                        className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer slider-thumb"
                        style={{ zIndex: 2 }}
                      />
                    </div>
                  </div>

                  {/* Inputs de precio */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Mínimo
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={2000}
                        value={priceRange.min}
                        onChange={handleMinInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Máximo
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={2000}
                        value={priceRange.max}
                        onChange={handleMaxInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Grid de productos */}
          <main className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No se encontraron productos
                </h3>
                <p className="text-gray-600">
                  Intenta ajustar los filtros o buscar con otros términos
                </p>
              </div>
            ) : (
              <>
                {/* Contador de resultados */}
                <div className="mb-6">
                  <p className="text-sm text-gray-600">
                    Mostrando {filteredProducts.length} de {products.length}{' '}
                    productos
                  </p>
                </div>

                {/* Grid de productos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            )}
          </main>
        </div>
      </div>

      {/* Botón Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300"
          aria-label="Volver arriba"
        >
          <ChevronUpIcon className="h-6 w-6" />
        </button>
      )}

      {/* Estilos CSS para el slider */}
      <style>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
          transition: all 0.2s ease;
        }

        .slider-thumb::-webkit-slider-thumb:hover {
          background: #2563eb;
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
        }

        .slider-thumb::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
          transition: all 0.2s ease;
        }

        .slider-thumb::-moz-range-thumb:hover {
          background: #2563eb;
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
        }

        .slider-thumb:focus {
          outline: none;
        }

        .slider-thumb:focus::-webkit-slider-thumb {
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
        }
      `}</style>
    </div>
  );
}
