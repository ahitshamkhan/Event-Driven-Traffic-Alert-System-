import API from "./api";

/**
 * Register a new user
 * @param {Object} userData - { name, email, password, role }
 */
export const register = async (userData) => {
  const response = await API.post("/auth/register", userData);
  return response.data;
};

/**
 * Login a user
 * @param {Object} credentials - { email, password }
 * @returns {{ token, user }} token and user object
 */
export const login = async (credentials) => {
  const response = await API.post("/auth/login", credentials);
  // Backend returns: { success: true, data: { id, name, email, role, token } }
  const { token, id, name, email, role } = response.data.data;
  const user = { id, name, email, role };

  // Persist to localStorage so api.js interceptor can attach it
  if (token) {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  }

  return { token, user };
};

/**
 * Logout — clears localStorage
 */
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

/**
 * Get the currently stored user object (parsed JSON)
 */
export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

/**
 * Get the stored JWT token
 */
export const getToken = () => {
  return localStorage.getItem("token");
};

/**
 * Check if a user is currently authenticated
 */
export const isAuthenticated = () => {
  return !!getToken();
};
