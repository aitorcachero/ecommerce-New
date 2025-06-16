import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Listbox, Transition } from '@headlessui/react';
import {
  CheckIcon,
  ChevronUpDownIcon,
  FunnelIcon,
  XMarkIcon,
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/20/solid';
import { getProducts } from '../../redux/actions';
import ProductCard from '../../components/ProductCard/ProductCard';
import Loader from '../../components/Loader/Loader';
import MultiRangeSlider from '../../components/MultiRangeSlider/MultiRangeSlider';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ProductsPage() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    'Todas las categorías'
  );
  const [selectedOrder, setSelectedOrder] = useState('Ordenar por');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

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

  const order = [
    'Ordenar por',
    'Precio: Menor a Mayor',
    'Precio: Mayor a Menor',
    'Nombre: A-Z',
    'Nombre: Z-A',
    'Rating: Mayor a Menor',
  ];

  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 2000,
    minValue: 0,
    maxValue: 2000,
  });

  useEffect(() => {
    if (!products.length) {
      dispatch(getProducts());
    }
    setIsLoading(false);
  }, [dispatch, products.length]);

  useEffect(() => {
    let filtered = [...products];

    // Filter by category
    if (selectedCategory !== 'Todas las categorías') {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      (product) =>
        product.price >= filters.minValue && product.price <= filters.maxValue
    );

    // Sort products
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
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, selectedOrder, filters, searchTerm]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleOrderChange = (orderType) => {
    setSelectedOrder(orderType);
  };

  const handleInput = ({ min, max }) => {
    setFilters((prev) => ({
      ...prev,
      minValue: min,
      maxValue: max,
    }));
  };

  const handleReset = () => {
    setSelectedCategory('Todas las categorías');
    setSelectedOrder('Ordenar por');
    setSearchTerm('');
    setFilters({
      minPrice: 0,
      maxPrice: 2000,
      minValue: 0,
      maxValue: 2000,
    });
  };

  const activeFiltersCount = [
    selectedCategory !== 'Todas las categorías',
    selectedOrder !== 'Ordenar por',
    filters.minValue > 0 || filters.maxValue < 2000,
    searchTerm.length > 0,
  ].filter(Boolean).length;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Section */}
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

          {/* Search Bar */}
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
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
              />
            </div>
          </div>

          {/* Mobile Filter Toggle */}
          <div className="mt-6 lg:hidden flex justify-center">
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200"
            >
              <FunnelIcon className="h-5 w-5 mr-2" />
              Filtros
              {activeFiltersCount > 0 && (
                <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-primary-500 rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Filters Sidebar */}
          <aside
            className={`lg:col-span-1 ${
              showMobileFilters ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              {/* Filter Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <AdjustmentsHorizontalIcon className="h-6 w-6 mr-2 text-primary-500" />
                  Filtros
                </h2>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={handleReset}
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
                  >
                    Limpiar todo
                  </button>
                )}
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="lg:hidden p-1 text-gray-400 hover:text-gray-500"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>

              {/* Category Filter */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Categoría
                </h3>
                <Listbox
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  {({ open }) => (
                    <div className="relative">
                      <Listbox.Button className="relative w-full cursor-pointer rounded-xl bg-gray-50 py-3 pl-4 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 hover:bg-gray-100 transition-all duration-200">
                        <span className="block truncate font-medium">
                          {selectedCategory}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                          <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
                        </span>
                      </Listbox.Button>

                      <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 text-base shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {categories.map((category) => (
                            <Listbox.Option
                              key={category}
                              className={({ active }) =>
                                classNames(
                                  active
                                    ? 'bg-primary-50 text-primary-900'
                                    : 'text-gray-900',
                                  'relative cursor-pointer select-none py-3 pl-4 pr-9 hover:bg-primary-50 transition-colors duration-150'
                                )
                              }
                              value={category}
                            >
                              {({ selected, active }) => (
                                <>
                                  <span
                                    className={classNames(
                                      selected
                                        ? 'font-semibold text-primary-600'
                                        : 'font-normal',
                                      'block truncate'
                                    )}
                                  >
                                    {category}
                                  </span>
                                  {selected && (
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                                      <CheckIcon className="h-5 w-5 text-primary-600" />
                                    </span>
                                  )}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  )}
                </Listbox>
              </div>

              {/* Sort Filter */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Ordenar por
                </h3>
                <Listbox value={selectedOrder} onChange={handleOrderChange}>
                  {({ open }) => (
                    <div className="relative">
                      <Listbox.Button className="relative w-full cursor-pointer rounded-xl bg-gray-50 py-3 pl-4 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 hover:bg-gray-100 transition-all duration-200">
                        <span className="block truncate font-medium">
                          {selectedOrder}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                          <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
                        </span>
                      </Listbox.Button>

                      <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 text-base shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {order.map((orderType) => (
                            <Listbox.Option
                              key={orderType}
                              className={({ active }) =>
                                classNames(
                                  active
                                    ? 'bg-primary-50 text-primary-900'
                                    : 'text-gray-900',
                                  'relative cursor-pointer select-none py-3 pl-4 pr-9 hover:bg-primary-50 transition-colors duration-150'
                                )
                              }
                              value={orderType}
                            >
                              {({ selected, active }) => (
                                <>
                                  <span
                                    className={classNames(
                                      selected
                                        ? 'font-semibold text-primary-600'
                                        : 'font-normal',
                                      'block truncate'
                                    )}
                                  >
                                    {orderType}
                                  </span>
                                  {selected && (
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                                      <CheckIcon className="h-5 w-5 text-primary-600" />
                                    </span>
                                  )}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </Transition>
                    </div>
                  )}
                </Listbox>
              </div>

              {/* Price Range Filter */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Rango de Precio
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>${filters.minValue}</span>
                    <span>${filters.maxValue}</span>
                  </div>
                  <div className="px-2">
                    <MultiRangeSlider
                      min={0}
                      max={filters.maxPrice}
                      step={1}
                      minValue={filters.minValue}
                      maxValue={filters.maxValue}
                      onChange={handleInput}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Mínimo
                      </label>
                      <input
                        type="number"
                        value={filters.minValue}
                        onChange={(e) =>
                          handleInput({
                            min: parseInt(e.target.value) || 0,
                            max: filters.maxValue,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Máximo
                      </label>
                      <input
                        type="number"
                        value={filters.maxValue}
                        onChange={(e) =>
                          handleInput({
                            min: filters.minValue,
                            max: parseInt(e.target.value) || 2000,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Reset Button */}
              <button
                onClick={handleReset}
                className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3 px-4 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                Reiniciar Filtros
              </button>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="lg:col-span-3 mt-8 lg:mt-0">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {filteredProducts.length} Productos
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

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="transform hover:scale-105 transition-transform duration-200"
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
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors duration-200"
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
