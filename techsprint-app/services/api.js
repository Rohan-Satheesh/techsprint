import axios from 'axios';
import { getIdToken } from './auth';

const BASE = 'http://localhost:4000'; // replace with backend URL or mock server

const api = axios.create({ baseURL: BASE, timeout: 10000 });

// Attach auth token if available
api.interceptors.request.use(async (config) => {
	try {
		const token = await getIdToken();
		if (token) config.headers.Authorization = `Bearer ${token}`;
	} catch (e) {
		// ignore if no token
	}
	return config;
});

export const getMarkers = () => api.get('/safety/markers');
export const postReport = (payload) => api.post('/safety/report', payload);
export const postSOS = (payload) => api.post('/sos', payload);
export const requestAssistance = (payload) => api.post('/assistance/request', payload);

// Route safety scoring endpoint
export const postRoutesScore = (payload) => api.post('/routes/score', payload);

export default api;
