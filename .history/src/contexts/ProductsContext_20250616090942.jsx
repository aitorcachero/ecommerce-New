import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { getAllProducts } from '../services/products/getAllProducts';
import getProductById from '../services/products/getProductById';

// Crear el contexto
const ProductsContext = createContext();

// Estados iniciales
const initialState = {
  products: [],
  currentProduct: null,
  loading: false,
  error: null,
  filters: {
    category: '',
    searchWords: '',
    minValue: 0,
    maxValue: 2000,
    maxPrice: 2000,
    valueRange: 2000
  }
};

// Tipos de acciones
const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_PRODUCTS: 'SET_PRODUCTS',
  SET_CURRENT_PRODUCT: 'SET_CURRENT_PRODUCT',
  SET_ERROR: 'SET_ERROR',
  SET_FILTERS: 'SET_FILTERS',
  RESET_FILTERS: 'RESET_FILTERS'
};

// Reducer para manejar el estado
function productsReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
    
    case ACTIONS.SET_PRODUCTS:
      const maxPrice = action.payload.length > 0 
        ? Math.max(...action.payload.map(p => p.price))
        : 2000;
      
      return {
        ...state,
        products: action.payload,
        loading: false,
        error: null,
        filters: {
          ...state.filters,
          maxPrice,
          maxValue: maxPrice,
          valueRange: maxPrice
        }
      };
    
    case ACTIONS.SET_CURRENT_PRODUCT:
      return {
        ...state,
        currentProduct: action.payload,
        loading: false,
        error: null
      };
    
    case ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    
    case ACTIONS.SET_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload
        }
      };
    
    case ACTIONS.RESET_FILTERS:
      return {
        ...state,
        filters: {
          ...initialState.filters,
          maxPrice: state.filters.maxPrice,
          maxValue: state.filters.maxPrice,
          valueRange: state.filters.maxPrice
        }
      };
    
    default:
      return state;
  }
}

// Provider del contexto
export function ProductsProvider({ children }) {
  const [state, dispatch] = useReducer(productsReducer, initialState);

  // Acciones
  const actions = {
    // Obtener todos los productos
    getProducts: async () => {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      try {
        const products = await getAllProducts();
        dispatch({ type: ACTIONS.SET_PRODUCTS, payload: products });
      } catch (error) {
        dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      }
    },

    // Obtener producto por ID
    getProductById: async (id) => {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true });
      try {
        const product = await getProductById(id);
        dispatch({ type: ACTIONS.SET_CURRENT_PRODUCT, payload: product });
      } catch (error) {
        dispatch({ type: ACTIONS.SET_ERROR, payload: error.message });
      }
    },

    // Actualizar filtros
    setFilters: (filters) => {
      dispatch({ type: ACTIONS.SET_FILTERS, payload: filters });
    },

    // Resetear filtros
    resetFilters: () => {
      dispatch({ type: ACTIONS.RESET_FILTERS });
    },

    // Limpiar producto actual
    clearCurrentProduct: () => {
      dispatch({ type: ACTIONS.SET_CURRENT_PRODUCT, payload: null });
    },

    // Limpiar errores
    clearError: () => {
      dispatch({ type: ACTIONS.SET_ERROR, payload: null });
    }
  };

  // Cargar productos al montar el componente
  useEffect(() => {
    if (state.products.length === 0) {
      actions.getProducts();
    }
  }, []);

  const value = {
    ...state,
    ...actions
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

// Hook personalizado para usar el contexto
export function useProducts() {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts debe ser usado dentro de ProductsProvider');
  }
  return context;
}

export default ProductsContext;