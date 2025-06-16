import { Fragment, useState } from 'react';
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react';
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from '@heroicons/react/20/solid';
import logo from '../../assets/logo.png';
import { NavLink } from 'react-router-dom';
import cartImage from '../../assets/cart.svg';
import useShop from '../../hooks/useShop';

const callsToAction = [
  { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
  { name: 'Contact sales', href: '#', icon: PhoneIcon },
];

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cart } = useShop();

  return (
    <header className="bg-white shadow-lg lg:fixed lg:w-full z-50 border-b border-secondary-200">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8"
        aria-label="Global"
      >
        {/* Logo */}
        <div className="flex lg:flex-1">
          <NavLink to="/" className="-m-1.5 p-1.5 focus-ring rounded-lg">
            <span className="sr-only">TecnoStyle</span>
            <img className="h-8 w-auto sm:h-10" src={logo} alt="TecnoStyle" />
          </NavLink>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-secondary-700 hover:bg-secondary-100 focus-ring"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Abrir menú principal</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Desktop navigation */}
        <Popover.Group className="hidden lg:flex lg:gap-x-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm font-semibold leading-6 transition-colors duration-200 hover:text-primary-600 focus-ring rounded px-3 py-2 ${
                isActive ? 'text-primary-600' : 'text-secondary-900'
              }`
            }
          >
            Inicio
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `text-sm font-semibold leading-6 transition-colors duration-200 hover:text-primary-600 focus-ring rounded px-3 py-2 ${
                isActive ? 'text-primary-600' : 'text-secondary-900'
              }`
            }
          >
            Quiénes somos
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `text-sm font-semibold leading-6 transition-colors duration-200 hover:text-primary-600 focus-ring rounded px-3 py-2 ${
                isActive ? 'text-primary-600' : 'text-secondary-900'
              }`
            }
          >
            Productos
          </NavLink>
        </Popover.Group>

        {/* Cart and Login */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          <NavLink
            to="/cart"
            className="relative p-2 text-secondary-700 hover:text-primary-600 transition-colors duration-200 focus-ring rounded-lg"
          >
            <img src={cartImage} className="h-6 w-6" alt="Carrito" />
            {cart.length > 0 && (
              <div className="absolute -top-1 -right-1 rounded-full bg-primary-600 h-5 w-5 flex justify-center items-center text-white text-xs font-bold animate-bounce-gentle">
                {cart.length}
              </div>
            )}
          </NavLink>
          <NavLink
            to="/login"
            className="text-sm font-semibold leading-6 text-secondary-900 hover:text-primary-600 transition-colors duration-200 focus-ring rounded px-3 py-2"
          >
            Iniciar sesión
          </NavLink>
        </div>
      </nav>

      {/* Mobile menu */}
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-secondary-900/10">
          <div className="flex items-center justify-between">
            <NavLink
              to="/"
              className="-m-1.5 p-1.5"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">TecnoStyle</span>
              <img className="h-8 w-auto" src={logo} alt="TecnoStyle" />
            </NavLink>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-secondary-700 hover:bg-secondary-100"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Cerrar menú</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-secondary-500/10">
              <div className="space-y-2 py-6">
                <NavLink
                  to="/"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-secondary-900 hover:bg-secondary-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Inicio
                </NavLink>
                <NavLink
                  to="/about"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-secondary-900 hover:bg-secondary-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Quiénes somos
                </NavLink>
                <NavLink
                  to="/products"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-secondary-900 hover:bg-secondary-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Productos
                </NavLink>
                <NavLink
                  to="/cart"
                  className="-mx-3 flex items-center gap-3 rounded-lg px-3 py-2 text-base font-semibold leading-7 text-secondary-900 hover:bg-secondary-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <img src={cartImage} className="h-5 w-5" alt="Carrito" />
                  Carrito
                  {cart.length > 0 && (
                    <span className="rounded-full bg-primary-600 px-2 py-1 text-xs font-bold text-white">
                      {cart.length}
                    </span>
                  )}
                </NavLink>
              </div>
              <div className="py-6">
                <NavLink
                  to="/login"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-secondary-900 hover:bg-secondary-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Iniciar sesión
                </NavLink>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
