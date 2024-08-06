import { HttpAdapter } from './http'

const baseURL = 'http://localhost:3000' // Ajuste conforme necessário
export const useFetch = new HttpAdapter(baseURL)
export default useFetchHttpAdapter