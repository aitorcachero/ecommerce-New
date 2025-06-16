import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import useShop from '../../hooks/useShop';
import getProductById from '../../services/products/getProductById';
import {
  ArrowLeftIcon,
  HeartIcon,
  ShareIcon,
  ShoppingCartIcon,
  CheckIcon,
  TruckIcon,
  ShieldCheckIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

export default function SingleProductPage() {
  const params = useParams().id;
  const navigate = useNavigate();
  const [product, setProduct] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const { loader, setLoader, handleAddCart } = useShop();

  useEffect(() => {
    const getData = async () => {
      try {
        setLoader(true);
        const data = await getProductById(params);
        setProduct(data);
        setSelectedImage(data.thumbnail);
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(false);
      }
    };
    getData();
  }, [params]);

  const handleImageSelect = (image, index) => {
    setSelectedImage(image);
    setSelectedImageIndex(index);
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      handleAddCart(product);
    }
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  const handleQuantityChange = (type) => {
    if (type === 'increase') {
      setQuantity((prev) => Math.min(prev + 1, product.stock));
    } else {
      setQuantity((prev) => Math.max(prev - 1, 1));
    }
  };

  const calculateDiscount = () => {
    if (product.discountPercentage) {
      const originalPrice =
        product.price / (1 - product.discountPercentage / 100);
      return originalPrice.toFixed(2);
    }
    return null;
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: product.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Enlace copiado al portapapeles');
    }
  };

  if (loader) {
    return <Loader />;
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Producto no encontrado
          </h2>
          <button
            onClick={() => navigate('/products')}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Volver a productos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Botón de volver prominente en la parte superior */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/products')}
              className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-blue-600 border border-transparent rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              <ArrowLeftIcon className="h-5 w-5 mr-2" />← Volver a productos
            </button>
            <div className="text-right">
              <h1 className="text-2xl font-bold text-gray-900">
                {product?.title}
              </h1>
              <p className="text-sm text-gray-600">{product?.category}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12">
          {/* Galería de imágenes */}
          <div className="mb-8 lg:mb-0">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Imagen principal */}
              <div className="aspect-square relative group">
                <img
                  src={selectedImage}
                  alt={product.title}
                  className="w-full h-full object-cover cursor-zoom-in transition-transform duration-300 group-hover:scale-105"
                  onClick={() => setShowImageModal(true)}
                />
                {product.discountPercentage > 0 && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    -{Math.round(product.discountPercentage)}%
                  </div>
                )}
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  {isFavorite ? (
                    <HeartSolidIcon className="h-6 w-6 text-red-500" />
                  ) : (
                    <HeartIcon className="h-6 w-6 text-gray-600" />
                  )}
                </button>
              </div>

              {/* Miniaturas */}
              <div className="p-4">
                <div className="flex space-x-2 overflow-x-auto">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => handleImageSelect(image, index)}
                      className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        selectedImageIndex === index
                          ? 'border-blue-500 ring-2 ring-blue-200'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Información del producto */}
          <div className="space-y-6">
            {/* Header del producto */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {product.title}
                  </h1>
                  <p className="text-lg text-gray-600 mb-4">
                    {product.category}
                  </p>
                </div>
                <button
                  onClick={handleShare}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                >
                  <ShareIcon className="h-6 w-6" />
                </button>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center">
                  <Stack spacing={1}>
                    <Rating
                      name="product-rating"
                      value={product.rating}
                      precision={0.1}
                      readOnly
                      size="small"
                    />
                  </Stack>
                  <span className="ml-2 text-sm text-gray-600">
                    {product.rating}/5
                  </span>
                </div>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-600">
                  {product.stock > 0
                    ? `${product.stock} disponibles`
                    : 'Sin stock'}
                </span>
              </div>
            </div>

            {/* Precio */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-baseline space-x-3 mb-4">
                <span className="text-3xl font-bold text-gray-900">
                  ${product.price}
                </span>
                {calculateDiscount() && (
                  <span className="text-lg text-gray-500 line-through">
                    ${calculateDiscount()}
                  </span>
                )}
              </div>

              {/* Selector de cantidad */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-sm font-medium text-gray-700">
                  Cantidad:
                </span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange('decrease')}
                    disabled={quantity <= 1}
                    className="px-3 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300 min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange('increase')}
                    disabled={quantity >= product.stock}
                    className="px-3 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Botón de agregar al carrito */}
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0 || isAddedToCart}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 flex items-center justify-center space-x-2 ${
                  product.stock === 0
                    ? 'bg-gray-400 cursor-not-allowed'
                    : isAddedToCart
                    ? 'bg-green-500'
                    : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5'
                }`}
              >
                {isAddedToCart ? (
                  <>
                    <CheckIcon className="h-5 w-5" />
                    <span>¡Agregado al carrito!</span>
                  </>
                ) : (
                  <>
                    <ShoppingCartIcon className="h-5 w-5" />
                    <span>
                      {product.stock === 0
                        ? 'Sin stock'
                        : `Agregar al carrito - $${(
                            product.price * quantity
                          ).toFixed(2)}`}
                    </span>
                  </>
                )}
              </button>
            </div>

            {/* Información adicional */}
            <div className="bg-white rounded-xl p-6 shadow-lg space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Información del producto
              </h3>

              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <TruckIcon className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-700">
                    Envío gratis en pedidos superiores a $50
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <ShieldCheckIcon className="h-5 w-5 text-blue-600" />
                  <span className="text-sm text-gray-700">
                    Garantía de 1 año
                  </span>
                </div>
                {product.brand && (
                  <div className="pt-2 border-t border-gray-200">
                    <span className="text-sm text-gray-600">Marca: </span>
                    <span className="text-sm font-semibold text-gray-900">
                      {product.brand.toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Descripción */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Descripción
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de imagen */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setShowImageModal(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <svg
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <img
              src={selectedImage}
              alt={product.title}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}
