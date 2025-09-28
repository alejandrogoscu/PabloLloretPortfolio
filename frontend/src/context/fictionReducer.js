export const fictionInitialState = {
  fictions: [],
  loading: false,
  error: null,
};

export function fictionReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
    case 'CREATE_START':
    case 'UPDATE_START':
    case 'DELETE_START':
      return { ...state, loading: true, error: null };

    case 'FETCH_SUCCESS':
      return { ...state, loading: false, fictions: action.payload };

    case 'CREATE_SUCCESS':
      return { ...state, loading: false, fictions: [...state.fictions, action.payload] };

    case 'UPDATE_SUCCESS':
      return {
        ...state,
        loading: false,
        fictions: state.fictions.map((fiction) => (fiction._id === action.payload._id ? action.payload : fiction)),
      };

    case 'DELETE_SUCCESS':
      return { ...state, loading: false, fictions: state.fictions.filter((fiction) => fiction._id !== action.payload) };

    case 'FETCH_ERROR':
    case 'CREATE_ERROR':
    case 'UPDATE_ERROR':
    case 'DELETE_ERROR':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}
