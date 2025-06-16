import logoHome from '../../assets/img-home.jpg';
import { NavLink } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 lg:pt-32">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 min-h-[calc(100vh-5rem)] lg:min-h-[calc(100vh-8rem)]">
          {/* Content */}
          <div className="flex-1 max-w-2xl text-center lg:text-left animate-fade-in">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold mb-4">
                Sobre Nosotros
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary-900 mb-6 leading-tight">
                Quiénes{' '}
                <span className="text-primary-600 bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
                  Somos
                </span>
              </h1>
            </div>

            <div className="space-y-6 text-lg text-secondary-600 leading-relaxed">
              <p>
                En <strong className="text-primary-600">TecnoStyle</strong>,
                somos más que una tienda de tecnología. Somos innovadores
                apasionados que creemos en el poder transformador de la
                tecnología para mejorar la vida de las personas.
              </p>

              <p>
                Desde nuestros inicios, nos hemos dedicado a seleccionar
                cuidadosamente los mejores productos tecnológicos, combinando
                funcionalidad excepcional con diseño vanguardista. Cada producto
                en nuestro catálogo es elegido por su calidad, innovación y
                capacidad de hacer la diferencia en tu día a día.
              </p>

              <p>
                Nuestro compromiso va más allá de la venta: ofrecemos una
                experiencia completa que incluye asesoramiento personalizado,
                soporte técnico especializado y garantía de satisfacción en cada
                compra.
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <NavLink to="/products">
                <button className="w-full sm:w-auto px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus-ring btn-hover">
                  Ver Productos
                </button>
              </NavLink>

              <NavLink to="/">
                <button className="w-full sm:w-auto px-8 py-4 border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white font-semibold rounded-xl transition-all duration-300 focus-ring">
                  Volver al Inicio
                </button>
              </NavLink>
            </div>
          </div>

          {/* Image */}
          <div className="flex-1 max-w-2xl w-full animate-slide-up">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-600 rounded-3xl transform rotate-3 opacity-20"></div>
              <img
                src={logoHome}
                className="relative w-full h-64 sm:h-80 lg:h-96 xl:h-[500px] object-cover rounded-3xl shadow-2xl card-hover"
                alt="TecnoStyle - Quiénes Somos"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mb-4">
              Nuestros Valores
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Los principios que guían cada decisión y nos definen como empresa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="bg-secondary-50 rounded-2xl p-8 text-center card-hover">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-secondary-900 mb-4">
                Calidad Garantizada
              </h3>
              <p className="text-secondary-600">
                Seleccionamos únicamente productos de las mejores marcas,
                garantizando durabilidad y rendimiento excepcional.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-secondary-50 rounded-2xl p-8 text-center card-hover">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-secondary-900 mb-4">
                Innovación Constante
              </h3>
              <p className="text-secondary-600">
                Estamos siempre a la vanguardia, ofreciendo las últimas
                tecnologías y tendencias del mercado.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-secondary-50 rounded-2xl p-8 text-center card-hover">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-secondary-900 mb-4">
                Atención Personalizada
              </h3>
              <p className="text-secondary-600">
                Cada cliente es único. Ofrecemos asesoramiento personalizado y
                soporte técnico especializado.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-primary-600 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Números que nos respaldan
            </h2>
            <p className="text-xl opacity-90">
              La confianza de nuestros clientes es nuestro mayor logro
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-in">
              <div className="text-4xl sm:text-5xl font-bold mb-2">500+</div>
              <div className="text-lg opacity-90">Productos</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="text-4xl sm:text-5xl font-bold mb-2">10K+</div>
              <div className="text-lg opacity-90">Clientes Felices</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl sm:text-5xl font-bold mb-2">24/7</div>
              <div className="text-lg opacity-90">Soporte</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="text-4xl sm:text-5xl font-bold mb-2">5★</div>
              <div className="text-lg opacity-90">Calificación</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-secondary-50 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mb-6">
              ¿Listo para descubrir la tecnología del futuro?
            </h2>
            <p className="text-xl text-secondary-600 mb-8">
              Únete a miles de clientes que ya confían en TecnoStyle para sus
              necesidades tecnológicas
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <NavLink to="/products">
                <button className="w-full sm:w-auto px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus-ring btn-hover">
                  Explorar Catálogo
                </button>
              </NavLink>
              <NavLink to="/cart">
                <button className="w-full sm:w-auto px-8 py-4 border-2 border-secondary-300 text-secondary-700 hover:bg-secondary-100 font-semibold rounded-xl transition-all duration-300 focus-ring">
                  Ver Carrito
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
