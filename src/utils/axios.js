import axios from 'axios';

const { VUE_APP_BASE_URI } = process.env;

/**
 * TODO: request cancelation
 *
 * TODO: request type specific headers
 */
const instance = axios.create({
  baseURL: VUE_APP_BASE_URI,
  headers: {
    'accept-language': 'it',
    'content-type': 'application/json',
    'x-musement-currency': 'EUR',
    'x-musement-version': '3.4.0',
  },
});

export default instance;
