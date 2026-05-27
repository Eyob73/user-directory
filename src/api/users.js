import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE_URL

export const fetchUsers = () => axios.get(`${API_BASE}/users`)

export const fetchUserById = (id) => axios.get(`${API_BASE}/users/${id}`)
