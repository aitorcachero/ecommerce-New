import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useImageWithRetry } from '../../hooks/useImageWithRetry';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { imageSrc, isLoading, hasError } = useImageWithRetry(product.thumbnail);

  const handleClick = (e) => {
    navigate(`/product/${product.id}`);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  // Imagen de fallback local
  const fallbackImage = '/src/assets/img-home.jpg'; // o una imagen placeholder

  return (
    <article className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden card-hover animate-fade-in">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-secondary-50">
        {isLoading ? (
          <div className="w-full h-48 sm:h-56 lg:h-64 bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="text-gray-400">Cargando...</div>
          </div>
        ) : hasError ? (
          <div className="w-full h-48 sm:h-56 lg:h-64 bg-gray-100 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
              <p className="text-sm">Imagen no disponible</p>
            </div>
          </div>
        ) : (
          <img
            src={imageSrc}
            className="w-full h-48 sm:h-56 lg:h-64 object-cover cursor-pointer transition-transform duration-300 group-hover:scale-110"
            onClick={handleClick}
            alt={product.title}
            loading="lazy"
          />
        )}

        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 cursor-pointer"
          onClick={handleClick}
        ></div>

        {/* Quick view button */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={handleClick}
            className="bg-white text-secondary-700 p-2 rounded-full shadow-lg hover:bg-secondary-50 transition-colors duration-200 focus-ring"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h4 className="text-sm sm:text-base font-semibold text-secondary-900 line-clamp-2 group-hover:text-primary-600 transition-colors duration-200 truncate">
            {product.title}
          </h4>
          <div className="flex items-center gap-2">
            <span className="text-lg sm:text-xl font-bold text-primary-600">
              ${product.price}
            </span>
          </div>
        </div>

        {/* Rating if available */}
        {product.rating && (
          <div className="flex items-center gap-1 mt-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? 'fill-current'
                      : 'text-secondary-300'
                  }`}
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-secondary-500">
              ({product.rating})
            </span>
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={handleClick}
          className="w-full mt-4 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors duration-200 focus-ring btn-hover"
        >
          Ver Detalles
        </button>
      </div>
    </article>
  );
}
