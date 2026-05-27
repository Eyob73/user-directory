import axios from 'axios'

const API_BASE = 'https://jsonplaceholder.typicode.comr'

export const fetchUsers = () => axios.get(`${API_BASE}/users`)

export const fetchUserById = (id) => axios.get(`${API_BASE}/users/${id}`)
