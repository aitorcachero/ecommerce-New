import React, { Fragment, useEffect, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import {
  CheckIcon,
  ChevronUpDownIcon,
  FunnelIcon,
  XMarkIcon,
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/20/solid';
import { useProducts } from '../../contexts/ProductsContext';
import ProductCard from '../../components/ProductCard/ProductCard';
import Loader from '../../components/Loader/Loader';
import MultiRangeSlider from '../../components/MultiRangeSlider/MultiRangeSlider';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ProductsPage() {
  // Usar el contexto en lugar de Redux
  const { products, loading, getProducts } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Todas las categorías');
  const [selectedOrder, setSelectedOrder] = useState('Ordenar por');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

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
    'lighting'
  ];

  const order = [
    'Ordenar por',
    'Precio: Menor a Mayor',
    'Precio: Mayor a Menor',
    'Nombre: A-Z',
    'Nombre: Z-A',
    'Rating: Mayor a Menor'
  ];

  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 2000,
    minValue: 0,
    maxValue: 2000
  });

  useEffect(() => {
    if (!products.length) {
      getProducts();
    }
  }, [products.length, getProducts]);

  useEffect(() => {
    let filtered = [...products];

    // Filter by category
    if (selectedCategory !== 'Todas las categorías') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      product => product.price >= filters.minValue && product.price <= filters.maxValue
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

  if (loading) {
    return <Loader />;
  }

  return filteredProducts ? (
    <div className="h-screen  flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center lg:justify-start lg:items-center h-full mt-72 lg:w-3/4  lg:flex-row">
        <aside className="w-1/4 mt-48 lg:min-h-full lg:mt-6 flex flex-col items-center justify-start lg:fixed lg:items-start">
          <div className="w-92 lg:w-2/4 mt-48 lg:mt-0 ">
            <input
              type="text"
              className="w-92 lg:w-full h-10 border rounded outline-none bg-slate-200 text-center"
              placeholder="Buscar..."
              onChange={(e) => setFilters(handleSearch(e, filters))}
            />
          </div>
          <div className="mt-6 w-92 lg:w-2/4">
            <h5 className="font-extrabold text-2xl mb-2 text-center text-slate-600">
              Categoria
            </h5>
            <div className="flex flex-col gap-2">
              <Listbox value={selected}>
                {({ open }) => (
                  <>
                    <div className="relative mt-2">
                      <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                        <span className="flex items-center">
                          <span className="ml-3 block truncate">
                            {selected.name}
                          </span>
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                          <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>

                      <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {categorys.map((category, i) => (
                            <Listbox.Option
                              key={i}
                              className={({ active }) =>
                                classNames(
                                  active
                                    ? 'bg-indigo-600 text-white'
                                    : 'text-gray-900',
                                  'relative cursor-default select-none py-2 pl-3 pr-9'
                                )
                              }
                              value={category.value}
                              onClick={(e) => handleCategory(e, i)}
                            >
                              {({ selected, active }) => (
                                <>
                                  <div className="flex items-center w-full">
                                    <span
                                      className={classNames(
                                        selected
                                          ? 'font-semibold'
                                          : 'font-normal',
                                        'ml-3 block truncate'
                                      )}
                                      value={category.value}
                                    >
                                      {category.name}
                                    </span>
                                  </div>

                                  {selected ? (
                                    <span
                                      className={classNames(
                                        active
                                          ? 'text-white'
                                          : 'text-indigo-600',
                                        'absolute inset-y-0 right-0 flex items-center pr-4'
                                      )}
                                    >
                                      <CheckIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
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
          </div>
          <div className="mt-6 w-92 lg:w-2/4">
            <h5 className="font-extrabold text-2xl mb-2 text-center text-slate-600">
              Ordenar
            </h5>
            <div className="flex flex-col gap-2">
              <Listbox value={selectedOrder}>
                {({ open }) => (
                  <>
                    <div className="relative mt-2">
                      <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                        <span className="flex items-center">
                          <span className="ml-3 block truncate">
                            {selectedOrder}
                          </span>
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                          <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>

                      <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                          {order.map((category, i) => (
                            <Listbox.Option
                              key={i}
                              className={({ active }) =>
                                classNames(
                                  active
                                    ? 'bg-indigo-600 text-white'
                                    : 'text-gray-900',
                                  'relative cursor-default select-none py-2 pl-3 pr-9'
                                )
                              }
                              value={category}
                              onClick={(e) => handleOrderCategory(e, i)}
                            >
                              {({ selected, active }) => (
                                <>
                                  <div className="flex items-center w-full">
                                    <span
                                      className={classNames(
                                        selected
                                          ? 'font-semibold'
                                          : 'font-normal',
                                        'ml-3 block truncate'
                                      )}
                                      value={category}
                                    >
                                      {category}
                                    </span>
                                  </div>

                                  {selected ? (
                                    <span
                                      className={classNames(
                                        active
                                          ? 'text-white'
                                          : 'text-indigo-600',
                                        'absolute inset-y-0 right-0 flex items-center pr-4'
                                      )}
                                    >
                                      <CheckIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </span>
                                  ) : null}
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
          </div>
          <div className="flex flex-col gap-2 w-4/4 mb-4 mt-4">
            <h2 className="font-extrabold text-2xl  text-center text-slate-600">
              Precio
            </h2>
            <div className="flex flex-row justify-center items-center gap-4 m-4 mb-2">
              <input
                className="w-20 h-10 border rounded border-black flex justify-center items-center text-center font-bold "
                disabled
                value={`$${filters?.minValue}`}
              />
              -
              <input
                className="w-20 h-10 border rounded border-black flex justify-center items-center text-center font-bold "
                disabled
                value={`$${filters?.maxValue}`}
              ></input>
            </div>
            <div className="flex justify-center items-center w-full">
              <MultiRangeSlider
                min={0}
                max={filters.maxPrice}
                step={1}
                minValue={filters.minValue}
                maxValue={filters.maxValue}
                onChange={handleInput}
              />
            </div>
          </div>
          <button
            className="w-44 w h-14 border bg-orange-900 opacity-80 rounded hover:bg-orange-700 text-zinc-100 lg:w-2/4"
            onClick={handleReset}
          >
            Reiniciar filtros
          </button>
        </aside>
        <main className="gril grid-cols-1 h-full gap-10 mt-20 lg:grid lg:w-3/4 lg:grid-cols-3 lg:ml-96 lg:mt-6">
          {filteredProducts &&
            filteredProducts.map((producto) => {
              return <ProductCard product={producto} key={producto.id} />;
            })}
          {filteredProducts && filteredProducts.length < 1 && (
            <h1 className="text-xl text-center w-full">Sin resultados</h1>
          )}
        </main>
      </div>
    </div>
  ) : (
    <Loader />
  );
}
