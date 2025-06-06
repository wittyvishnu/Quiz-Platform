"use client"

// Authentication utility functions
export const setAuthToken = (token) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token)
    document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 24 * 7}` 
  }
}

export const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token")
  }
  return null
}

export const removeAuthToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT"
  }
}

export const setUser = (user) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(user))
  }
}

export const getUser = () => {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("user")
    return user ? JSON.parse(user) : null
  }
  return null
}

export const isAuthenticated = () => {
  const token = getAuthToken()
  if (!token) return false

  try {
    const payload = JSON.parse(atob(token.split(".")[1]))
    const currentTime = Date.now() / 1000
    return payload.exp > currentTime
  } catch {
    return false
  }
}

// API call helper with auth token
export const apiCall = async (url, options = {}) => {
  const token = getAuthToken()

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  }

  const response = await fetch(url, config)

  if (response.status === 401) {
    // Token expired or invalid
    removeAuthToken()
    window.location.href = "/auth/login"
    return
  }

  return response
}

// Logout function
export const logout = () => {
  removeAuthToken()
  window.location.href = "/auth/login"
}
