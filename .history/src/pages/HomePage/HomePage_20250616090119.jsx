import { NavLink } from 'react-router-dom';
import logoHome from '../../assets/img-home.jpg';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-32">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 min-h-[calc(100vh-5rem)] lg:min-h-[calc(100vh-8rem)]">
          {/* Content */}
          <main className="flex-1 max-w-2xl text-center lg:text-left animate-fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-secondary-900 mb-6 leading-tight">
              Bienvenido a{' '}
              <span className="text-primary-600 bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
                TecnoStyle
              </span>
            </h1>

            <p className="text-lg sm:text-xl lg:text-2xl text-secondary-600 mb-8 leading-relaxed px-4 lg:px-0">
              Descubre la mejor tecnología con estilo. Productos innovadores que
              transforman tu vida digital con calidad excepcional y diseño
              vanguardista.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <NavLink to="/products">
                <button className="w-full sm:w-auto px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus-ring btn-hover">
                  Explorar Productos
                </button>
              </NavLink>

              <NavLink to="/about">
                <button className="w-full sm:w-auto px-8 py-4 border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white font-semibold rounded-xl transition-all duration-300 focus-ring">
                  Conocer Más
                </button>
              </NavLink>
            </div>

            {/* Features */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center lg:text-left">
              <div className="p-4">
                <div className="text-2xl font-bold text-primary-600 mb-2">
                  500+
                </div>
                <div className="text-secondary-600">Productos</div>
              </div>
              <div className="p-4">
                <div className="text-2xl font-bold text-primary-600 mb-2">
                  24/7
                </div>
                <div className="text-secondary-600">Soporte</div>
              </div>
              <div className="p-4">
                <div className="text-2xl font-bold text-primary-600 mb-2">
                  100%
                </div>
                <div className="text-secondary-600">Garantía</div>
              </div>
            </div>
          </main>

          {/* Image */}
          <aside className="flex-1 max-w-2xl w-full animate-slide-up">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-600 rounded-3xl transform rotate-6 opacity-20"></div>
              <img
                src={logoHome}
                className="relative w-full h-64 sm:h-80 lg:h-96 xl:h-[500px] object-cover rounded-3xl shadow-2xl card-hover"
                alt="TecnoStyle Hero"
              />
            </div>
          </aside>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600 text-white py-16 mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            ¿Listo para comenzar?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Únete a miles de clientes satisfechos
          </p>
          <NavLink to="/products">
            <button className="px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl hover:bg-secondary-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Ver Catálogo Completo
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
