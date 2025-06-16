import React, { useState, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import {
  CheckIcon,
  ChevronUpDownIcon,
  FunnelIcon,
  XMarkIcon,
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/20/solid';
import { useProducts } from '../../contexts/ProductsContext';
import ProductCard from '../../components/ProductCard/ProductCard';
import Loader from '../../components/Loader/Loader';
import MultiRangeSlider from '../../components/MultiRangeSlider/MultiRangeSlider';

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
  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 2000,
    minValue: 0,
    maxValue: 2000,
  });

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
        product.price >= priceRange.minValue &&
        product.price <= priceRange.maxValue
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

  // Handlers
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleOrderChange = (orderType) => {
    setSelectedOrder(orderType);
  };

  const handlePriceChange = (values) => {
    setPriceRange((prev) => ({
      ...prev,
      minValue: values.min,
      maxValue: values.max,
    }));
  };

  const handleMinPriceInput = (value) => {
    const numValue = Math.max(0, Math.min(value, priceRange.maxValue - 1));
    setPriceRange((prev) => ({ ...prev, minValue: numValue }));
  };

  const handleMaxPriceInput = (value) => {
    const numValue = Math.min(
      priceRange.max,
      Math.max(value, priceRange.minValue + 1)
    );
    setPriceRange((prev) => ({ ...prev, maxValue: numValue }));
  };

  const handleReset = () => {
    setSelectedCategory('Todas las categorías');
    setSelectedOrder('Ordenar por');
    setSearchTerm('');
    setPriceRange({
      min: 0,
      max: 2000,
      minValue: 0,
      maxValue: 2000,
    });
  };

  const activeFiltersCount = [
    selectedCategory !== 'Todas las categorías',
    selectedOrder !== 'Ordenar por',
    priceRange.minValue > 0 || priceRange.maxValue < 2000,
    searchTerm.trim().length > 0,
  ].filter(Boolean).length;

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
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>${priceRange.minValue}</span>
                    <span>${priceRange.maxValue}</span>
                  </div>

                  {/* Slider de rango */}
                  <div className="px-2 py-4">
                    <MultiRangeSlider
                      min={priceRange.min}
                      max={priceRange.max}
                      step={10}
                      minValue={priceRange.minValue}
                      maxValue={priceRange.maxValue}
                      onInput={handlePriceChange}
                      onChange={handlePriceChange}
                    />
                  </div>

                  {/* Inputs de precio */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Mínimo
                      </label>
                      <input
                        type="number"
                        min={priceRange.min}
                        max={priceRange.max}
                        value={priceRange.minValue}
                        onChange={(e) =>
                          handleMinPriceInput(parseInt(e.target.value) || 0)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Máximo
                      </label>
                      <input
                        type="number"
                        min={priceRange.min}
                        max={priceRange.max}
                        value={priceRange.maxValue}
                        onChange={(e) =>
                          handleMaxPriceInput(parseInt(e.target.value) || 2000)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Botón de reset */}
              <button
                onClick={handleReset}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Reiniciar Filtros
              </button>
            </div>
          </aside>

          {/* Grid de productos */}
          <main className="lg:col-span-3 mt-8 lg:mt-0">
            {/* Header de resultados */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {filteredProducts.length} Producto
                  {filteredProducts.length !== 1 ? 's' : ''}
                </h2>
                {activeFiltersCount > 0 && (
                  <p className="text-sm text-gray-600 mt-1">
                    {activeFiltersCount} filtro
                    {activeFiltersCount > 1 ? 's' : ''} aplicado
                    {activeFiltersCount > 1 ? 's' : ''}
                  </p>
                )}
              </div>
            </div>

            {/* Grid de productos con espaciado mejorado */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-xl"
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No se encontraron productos
                </h3>
                <p className="text-gray-600 mb-6">
                  Intenta ajustar tus filtros o términos de búsqueda
                </p>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                >
                  Limpiar filtros
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
