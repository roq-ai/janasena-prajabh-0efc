import axios from 'axios';
import queryString from 'query-string';
import { JanasenaInterface, JanasenaGetQueryInterface } from 'interfaces/janasena';
import { GetQueryInterface } from '../../interfaces';

export const getJanasenas = async (query?: JanasenaGetQueryInterface) => {
  const response = await axios.get(`/api/janasenas${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createJanasena = async (janasena: JanasenaInterface) => {
  const response = await axios.post('/api/janasenas', janasena);
  return response.data;
};

export const updateJanasenaById = async (id: string, janasena: JanasenaInterface) => {
  const response = await axios.put(`/api/janasenas/${id}`, janasena);
  return response.data;
};

export const getJanasenaById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/janasenas/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteJanasenaById = async (id: string) => {
  const response = await axios.delete(`/api/janasenas/${id}`);
  return response.data;
};
