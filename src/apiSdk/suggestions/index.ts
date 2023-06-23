import axios from 'axios';
import queryString from 'query-string';
import { SuggestionInterface, SuggestionGetQueryInterface } from 'interfaces/suggestion';
import { GetQueryInterface } from '../../interfaces';

export const getSuggestions = async (query?: SuggestionGetQueryInterface) => {
  const response = await axios.get(`/api/suggestions${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createSuggestion = async (suggestion: SuggestionInterface) => {
  const response = await axios.post('/api/suggestions', suggestion);
  return response.data;
};

export const updateSuggestionById = async (id: string, suggestion: SuggestionInterface) => {
  const response = await axios.put(`/api/suggestions/${id}`, suggestion);
  return response.data;
};

export const getSuggestionById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/suggestions/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteSuggestionById = async (id: string) => {
  const response = await axios.delete(`/api/suggestions/${id}`);
  return response.data;
};
