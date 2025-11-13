import { createContext, useReducer, useContext } from 'react';
import axios from 'axios';
import { adsReducer, adsInitialState } from './spotsReducer.js';

const AdsContext = createContext();
const API_URL = import.meta.env.VITE_API_URL;

export function AdsProvider({ children }) {
  const [state, dispatch] = useReducer(adsReducer, adsInitialState);

  const fetchAds = async () => {
    dispatch({ type: 'FETCH_START' });
    try {
      const res = await axios.get(`${API_URL}/spot`);
      dispatch({ type: 'FETCH_SUCCESS', payload: res.data });
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', payload: error.message });
    }
  };

  const getAdById = async (id) => {
    dispatch({ type: 'GET_ONE_START' });
    try {
      const res = await axios.get(`${API_URL}/spot/${id}`);
      dispatch({ type: 'GET_ONE_SUCCESS', payload: res.data });
    } catch (error) {
      dispatch({ type: 'GET_ONE_ERROR', payload: error.message });
    }
  };

  const createAd = async (newAd) => {
    dispatch({ type: 'CREATE_START' });
    try {
      const res = await axios.post(`${API_URL}/spot`, newAd);
      dispatch({ type: 'CREATE_SUCCESS', payload: res.data });
    } catch (error) {
      dispatch({ type: 'CREATE_ERROR', payload: error.message });
    }
  };

  const updateAd = async (id, updatedAd) => {
    dispatch({ type: 'UPDATE_START' });
    try {
      const res = await axios.put(`${API_URL}/spot/${id}`, updatedAd);
      dispatch({ type: 'UPDATE_SUCCESS', payload: res.data });
    } catch (error) {
      dispatch({ type: 'UPDATE_ERROR', payload: error.message });
    }
  };

  const deletedAd = async (id) => {
    dispatch({ type: 'DELETE_START' });
    try {
      await axios.delete(`${API_URL}/spot/${id}`);
      dispatch({ type: 'DELETE_SUCCESS', payload: id });
    } catch (error) {
      dispatch({ type: 'DELETE_ERROR', payload: error.message });
    }
  };

  return (
    <AdsContext.Provider value={{ ...state, fetchAds, getAdById, createAd, updateAd, deletedAd }}>
      {children}
    </AdsContext.Provider>
  );
}

export function useAds() {
  return useContext(AdsContext);
}
