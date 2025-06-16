import { useEffect } from 'react';
import ProductCart from '../../components/ProductCart/ProductCart';
import useShop from '../../hooks/useShop';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function CartPage() {
  const { cart, deleteAllCart } = useShop();
  const navigate = useNavigate();

  const handleCheckout = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  const totalItems = cart.reduce((sum, item) => sum + item.cantidad, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.product.price * item.cantidad,
    0
  );

  return (
    <div className="min-h-screen bg-secondary-50 pt-20 lg:pt-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {cart.length === 0 ? (
          /* Empty Cart */
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-fade-in">
            <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-lg max-w-md w-full">
              <div className="w-24 h-24 mx-auto mb-6 bg-secondary-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-secondary-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0L4 5M7 13h10m0 0v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6z"
                  />
                </svg>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-secondary-900 mb-4">
                Tu carrito está vacío
              </h1>
              <p className="text-secondary-600 mb-8">
                ¡Descubre nuestros increíbles productos y comienza a llenar tu
                carrito!
              </p>
              <NavLink to="/products">
                <button className="w-full px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 focus-ring btn-hover">
                  Explorar Productos
                </button>
              </NavLink>
            </div>
          </div>
        ) : (
          /* Cart with items */
          <div className="flex flex-col xl:flex-row gap-8">
            {/* Cart Items */}
            <div className="flex-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                  <h1 className="text-2xl sm:text-3xl font-bold text-secondary-900 mb-4 sm:mb-0">
                    Tu Carrito ({totalItems}{' '}
                    {totalItems === 1 ? 'artículo' : 'artículos'})
                  </h1>
                  <button
                    onClick={deleteAllCart}
                    className="text-red-600 hover:text-red-700 font-medium transition-colors duration-200 focus-ring rounded px-3 py-1"
                  >
                    Vaciar carrito
                  </button>
                </div>

                <div className="space-y-4">
                  {cart.map((item, index) => (
                    <div
                      key={index}
                      className="animate-slide-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <ProductCart producto={item} />
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-secondary-200">
                  <NavLink to="/products">
                    <button className="w-full sm:w-auto px-6 py-3 border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white font-semibold rounded-xl transition-all duration-300 focus-ring">
                      Continuar Comprando
                    </button>
                  </NavLink>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="xl:w-96">
              <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 sticky top-32">
                <h2 className="text-xl font-bold text-secondary-900 mb-6">
                  Resumen del Pedido
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-secondary-600">
                      Subtotal ({totalItems} artículos):
                    </span>
                    <span className="font-semibold text-secondary-900">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2">
                    <span className="text-secondary-600">Envío:</span>
                    <span className="font-semibold text-green-600">{`${
                      totalPrice.toFixed(2) > 50 ? 'Gratis' : '$5.99'
                    }`}</span>
                  </div>

                  <div className="flex justify-between items-center py-2">
                    <span className="text-secondary-600">Impuestos:</span>
                    <span className="font-semibold text-secondary-900">
                      Incluidos
                    </span>
                  </div>

                  <div className="border-t border-secondary-200 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-secondary-900">
                        Total:
                      </span>
                      <span className="text-2xl font-bold text-primary-600">
                        ${totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full px-6 py-4 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 focus-ring btn-hover shadow-lg"
                >
                  Proceder al Pago
                </button>

                <div className="mt-4 text-center">
                  <p className="text-sm text-secondary-500">
                    Envío gratis en pedidos superiores a $50
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
