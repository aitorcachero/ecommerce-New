import useShop from '../../hooks/useShop';
import { TrashIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';

export default function ProductCart({ producto }) {
  const { sumItemCart, substractItemCart, deleteItemCart } = useShop();
  const { product, cantidad } = producto;

  const totalPrice = (product.price * cantidad).toFixed(2);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 overflow-hidden">
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          {/* Imagen del producto */}
          <div className="flex-shrink-0 mx-auto sm:mx-0">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden bg-gray-50">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>

          {/* Información del producto */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-2">
                  {product.title}
                </h3>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <span className="text-xl font-bold text-blue-600">
                    ${product.price}
                  </span>
                  <span className="text-sm text-gray-500">Precio unitario</span>
                </div>
              </div>

              {/* Botón eliminar - Desktop */}
              <button
                onClick={() => deleteItemCart(product.id)}
                className="hidden sm:flex items-center justify-center w-10 h-10 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
                title="Eliminar producto"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Controles de cantidad y precio total */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Control de cantidad */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700 min-w-0">
                Cantidad:
              </span>
              <div className="flex items-center bg-gray-50 rounded-lg border border-gray-200">
                <button
                  onClick={() => substractItemCart(product.id)}
                  disabled={cantidad <= 1}
                  className="flex items-center justify-center w-10 h-10 text-gray-600 hover:text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 rounded-l-lg"
                >
                  <MinusIcon className="w-4 h-4" />
                </button>
                <span className="flex items-center justify-center min-w-[3rem] h-10 text-lg font-semibold text-gray-900 bg-white border-x border-gray-200">
                  {cantidad}
                </span>
                <button
                  onClick={() => sumItemCart(product.id)}
                  className="flex items-center justify-center w-10 h-10 text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition-all duration-200 rounded-r-lg"
                >
                  <PlusIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Precio total */}
            <div className="flex items-center justify-between sm:justify-end gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-500 mb-1">Total</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${totalPrice}
                </p>
              </div>

              {/* Botón eliminar - Mobile */}
              <button
                onClick={() => deleteItemCart(product.id)}
                className="sm:hidden flex items-center justify-center w-12 h-12 text-white bg-red-500 hover:bg-red-600 rounded-lg transition-all duration-200 shadow-sm"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
