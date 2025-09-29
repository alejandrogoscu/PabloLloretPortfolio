export const adsInitialState = {
  ads: [],
  selectedAd: null,
  loading: false,
  error: null,
};

export function adsReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
    case 'GET_ONE_START':
    case 'CREATE_START':
    case 'UPDATE_START':
    case 'DELETE_START':
      return { ...state, loading: true, error: null };

    case 'FETCH_SUCCESS':
      return { ...state, loading: false, ads: action.payload };

    case 'GET_ONE_SUCCESS':
      return { ...state, loading: false, selectedAd: action.payload };

    case 'CREATE_SUCCESS':
      return { ...state, loading: false, ads: [...state.ads, action.payload] };

    case 'UPDATE_SUCCESS':
      return {
        ...state,
        loading: false,
        ads: state.ads.map((ad) => (ad._id === action.payload._id ? action.payload : ad)),
      };

    case 'DELETE_SUCCESS':
      return { ...state, loading: false, ads: state.ads.filter((ad) => ad._id !== action.payload) };

    case 'FETCH_ERROR':
    case 'GET_ONE_ERROR':
    case 'CREATE_ERROR':
    case 'UPDATE_ERROR':
    case 'DELETE_ERROR':
      return { ...state, loading: false, error: action.payload, selectedAd: null };

    default:
      return state;
  }
}
