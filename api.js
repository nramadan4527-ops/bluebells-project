// Backend API Configuration
const BACKEND_LOCAL_IP = "192.168.1.102";
// Public backend tunnel (created when running localtunnel for port 5000)
const LOCAL_TUNNEL_BACKEND = "https://eager-owls-vanish.loca.lt";
const API_BASE_URL = window.location.hostname.endsWith("loca.lt")
  ? `${LOCAL_TUNNEL_BACKEND}/api`
  : window.location.protocol.startsWith("http")
    ? `${window.location.protocol}//${window.location.hostname}:5000/api`
    : `http://${BACKEND_LOCAL_IP}:5000/api`;

// Product API
const ProductAPI = {
  getAll: () => fetch(`${API_BASE_URL}/products`).then(r => r.json()),
  getById: (id) => fetch(`${API_BASE_URL}/products/${id}`).then(r => r.json()),
  search: (query) => fetch(`${API_BASE_URL}/products/search?query=${query}`).then(r => r.json()),
  create: (data, token) => fetch(`${API_BASE_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data)
  }).then(r => r.json()),
  update: (id, data, token) => fetch(`${API_BASE_URL}/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data)
  }).then(r => r.json()),
  delete: (id, token) => fetch(`${API_BASE_URL}/products/${id}`, {
    method: "DELETE",
    headers: { "Authorization": `Bearer ${token}` }
  }).then(r => r.json())
};

// Order API
const OrderAPI = {
  create: (data) => fetch(`${API_BASE_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(r => r.json()),
  getById: (id) => fetch(`${API_BASE_URL}/orders/${id}`).then(r => r.json()),
  getByPhone: (phone) => fetch(`${API_BASE_URL}/orders/search?phone=${phone}`).then(r => r.json()),
  getAll: (token) => fetch(`${API_BASE_URL}/orders`, {
    headers: { "Authorization": `Bearer ${token}` }
  }).then(r => r.json()),
  updateStatus: (id, status, token) => fetch(`${API_BASE_URL}/orders/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ status })
  }).then(r => r.json()),
  cancel: (id, token) => fetch(`${API_BASE_URL}/orders/${id}`, {
    method: "DELETE",
    headers: { "Authorization": `Bearer ${token}` }
  }).then(r => r.json())
};

// Auth API
const AuthAPI = {
  login: (username, password) => fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  }).then(r => r.json()),
  register: (username, email, password, token) => fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ username, email, password })
  }).then(r => r.json()),
  verify: (token) => fetch(`${API_BASE_URL}/auth/verify`, {
    headers: { "Authorization": `Bearer ${token}` }
  }).then(r => r.json())
};
