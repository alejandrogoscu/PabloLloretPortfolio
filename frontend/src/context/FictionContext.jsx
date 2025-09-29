import { createContext, useReducer, useContext } from 'react';
import axios from 'axios';
import { fictionReducer, fictionInitialState } from './fictionReducer.js';

const FictionContext = createContext();
const API_URL = import.meta.env.VITE_API_URL;

export function FictionProvider({ children }) {
  const [state, dispatch] = useReducer(fictionReducer, fictionInitialState);

  const fetchFictions = async () => {
    dispatch({ type: 'FETCH_START' });
    try {
      const res = await axios.get(`${API_URL}/fiction`);
      dispatch({ type: 'FETCH_SUCCESS', payload: res.data });
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', payload: error.message });
    }
  };

  const getFictionById = async (id) => {
    dispatch({ type: 'GET_ONE_START' });
    try {
      const res = await axios.get(`${API_URL}/fiction/${id}`);
      dispatch({ type: 'GET_ONE_SUCCESS', payload: res.data });
    } catch (error) {
      dispatch({ type: 'GET_ONE_ERROR', payload: error.message });
    }
  };

  const createFiction = async (newFiction) => {
    dispatch({ type: 'CREATE_START' });
    try {
      const res = await axios.post(`${API_URL}/fiction`, newFiction);
      dispatch({ type: 'CREATE_SUCCESS', payload: res.data });
    } catch (error) {
      dispatch({ type: 'CREATE_ERROR', payload: error.message });
    }
  };

  const updateFiction = async (id, updatedFiction) => {
    dispatch({ type: 'UPDATE_START' });
    try {
      const res = await axios.put(`${API_URL}/fiction/${id}`, updatedFiction);
      dispatch({ type: 'UPDATE_SUCCESS', payload: res.data });
    } catch (error) {
      dispatch({ type: 'UPDATE_ERROR', payload: error.message });
    }
  };

  const deleteFiction = async (id) => {
    dispatch({ type: 'DELETE_START' });
    try {
      await axios.delete(`${API_URL}/fiction/${id}`);
      dispatch({ type: 'DELETE_SUCCESS', payload: id });
    } catch (error) {
      dispatch({ type: 'DELETE_ERROR', payload: error.message });
    }
  };

  return (
    <FictionContext.Provider
      value={{
        ...state,
        fetchFictions,
        getFictionById,
        createFiction,
        updateFiction,
        deleteFiction,
      }}
    >
      {children}
    </FictionContext.Provider>
  );
}

export function useFiction() {
  return useContext(FictionContext);
}
