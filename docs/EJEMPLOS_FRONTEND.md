# Ejemplos para el Equipo Frontend

Esta guía proporciona ejemplos prácticos de cómo consumir la API desde el frontend.

---

## Tabla de Contenidos

1. [Configuración Inicial](#configuración-inicial)
2. [Ejemplos con Fetch API](#ejemplos-con-fetch-api)
3. [Ejemplos con Axios](#ejemplos-con-axios)
4. [Manejo de Autenticación](#manejo-de-autenticación)
5. [Interceptores](#interceptores)

---

## Configuración Inicial

### Variables de Entorno

Crea un archivo `.env` en tu proyecto frontend:

```env
REACT_APP_API_URL=http://localhost:3001/api
# o para Vue/Angular:
VUE_APP_API_URL=http://localhost:3001/api
VITE_API_URL=http://localhost:3001/api
```

---

## Ejemplos con Fetch API

### 1. Login

```javascript
const login = async (email, password) => {
  try {
    const response = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Error en el login');
    }

    const data = await response.json();

    // Guardar token en localStorage
    localStorage.setItem('token', data.access_token);
    localStorage.setItem('user', JSON.stringify(data.user));

    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// Uso
login('admin@salon.com', 'admin123')
  .then(data => console.log('Login exitoso:', data))
  .catch(error => console.error('Error en login:', error));
```

### 2. Registro

```javascript
const register = async (email, password, rolId = 3) => {
  try {
    const response = await fetch('http://localhost:3001/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, rolId }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    const data = await response.json();

    // Guardar token
    localStorage.setItem('token', data.access_token);
    localStorage.setItem('user', JSON.stringify(data.user));

    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
```

### 3. Obtener Perfil (con autenticación)

```javascript
const getProfile = async () => {
  const token = localStorage.getItem('token');

  if (!token) {
    throw new Error('No hay token de autenticación');
  }

  try {
    const response = await fetch('http://localhost:3001/api/auth/profile', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Token expirado o inválido
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        throw new Error('Sesión expirada');
      }
      throw new Error('Error al obtener perfil');
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
```

### 4. Listar Usuarios (Admin)

```javascript
const getUsuarios = async () => {
  const token = localStorage.getItem('token');

  try {
    const response = await fetch('http://localhost:3001/api/usuarios', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Error al obtener usuarios');
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
```

### 5. Crear Usuario (Admin)

```javascript
const createUsuario = async (userData) => {
  const token = localStorage.getItem('token');

  try {
    const response = await fetch('http://localhost:3001/api/usuarios', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// Uso
createUsuario({
  email: 'nuevo@usuario.com',
  password: 'password123',
  rolId: 2,
  activo: true
});
```

---

## Ejemplos con Axios

### Configuración de Axios

```javascript
import axios from 'axios';

// Crear instancia de axios
const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token a todas las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

### 1. Login con Axios

```javascript
import api from './api';

export const authService = {
  login: async (email, password) => {
    try {
      const { data } = await api.post('/auth/login', { email, password });

      localStorage.setItem('token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));

      return data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  register: async (email, password, rolId = 3) => {
    try {
      const { data } = await api.post('/auth/register', {
        email,
        password,
        rolId
      });

      localStorage.setItem('token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));

      return data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getProfile: async () => {
    try {
      const { data } = await api.get('/auth/profile');
      return data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  verifyToken: async () => {
    try {
      const { data } = await api.get('/auth/verify');
      return data.valid;
    } catch (error) {
      return false;
    }
  }
};
```

### 2. Servicio de Usuarios con Axios

```javascript
import api from './api';

export const usuariosService = {
  getAll: async () => {
    const { data } = await api.get('/usuarios');
    return data;
  },

  getById: async (id) => {
    const { data } = await api.get(`/usuarios/${id}`);
    return data;
  },

  create: async (userData) => {
    const { data } = await api.post('/usuarios', userData);
    return data;
  },

  update: async (id, userData) => {
    const { data } = await api.patch(`/usuarios/${id}`, userData);
    return data;
  },

  delete: async (id) => {
    const { data } = await api.delete(`/usuarios/${id}`);
    return data;
  }
};
```

### 3. Servicio de Roles con Axios

```javascript
import api from './api';

export const rolesService = {
  getAll: async () => {
    const { data } = await api.get('/roles');
    return data;
  },

  getById: async (id) => {
    const { data } = await api.get(`/roles/${id}`);
    return data;
  }
};
```

---

## Manejo de Autenticación

### React Context para Autenticación

```javascript
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from './services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay usuario en localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const data = await authService.login(email, password);
    setUser(data.user);
    return data;
  };

  const register = async (email, password, rolId) => {
    const data = await authService.register(email, password, rolId);
    setUser(data.user);
    return data;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.rol?.nombre === 'Administrador',
    isEmpleado: user?.rol?.nombre === 'Empleado',
    isCliente: user?.rol?.nombre === 'Cliente',
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider');
  }
  return context;
};
```

### Componente de Login (React)

```javascript
import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Iniciar Sesión</h2>

      {error && <div className="error">{error}</div>}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit">Entrar</button>
    </form>
  );
};

export default Login;
```

### Ruta Protegida (React)

```javascript
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.rol?.nombre !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;

// Uso:
// <Route path="/admin" element={
//   <ProtectedRoute requiredRole="Administrador">
//     <AdminPanel />
//   </ProtectedRoute>
// } />
```

---

## Interceptores

### Interceptor para Logging

```javascript
api.interceptors.request.use(
  (config) => {
    console.log('Request:', config.method.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log('Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('Response Error:', error.response?.status, error.config?.url);
    return Promise.reject(error);
  }
);
```

### Interceptor para Refresh Token (futuro)

```javascript
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          return api(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      // Aquí iría la lógica para refrescar el token
      // Por ahora, redirigimos al login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';

      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);
```

---

## Ejemplos de Manejo de Errores

### Manejo Global de Errores

```javascript
const handleApiError = (error) => {
  if (error.response) {
    // Error de respuesta del servidor
    const { status, data } = error.response;

    switch (status) {
      case 400:
        return {
          type: 'validation',
          message: Array.isArray(data.message)
            ? data.message.join(', ')
            : data.message
        };
      case 401:
        return {
          type: 'auth',
          message: 'No autorizado. Por favor, inicia sesión.'
        };
      case 403:
        return {
          type: 'permission',
          message: 'No tienes permisos para esta acción.'
        };
      case 404:
        return {
          type: 'notFound',
          message: 'Recurso no encontrado.'
        };
      case 409:
        return {
          type: 'conflict',
          message: data.message || 'Ya existe un registro con estos datos.'
        };
      case 500:
        return {
          type: 'server',
          message: 'Error del servidor. Intenta nuevamente.'
        };
      default:
        return {
          type: 'unknown',
          message: data.message || 'Error desconocido.'
        };
    }
  } else if (error.request) {
    // Error de red
    return {
      type: 'network',
      message: 'Error de conexión. Verifica tu internet.'
    };
  } else {
    return {
      type: 'unknown',
      message: error.message || 'Error desconocido.'
    };
  }
};

// Uso
try {
  await usuariosService.create(userData);
} catch (error) {
  const { type, message } = handleApiError(error);
  console.error(`Error (${type}):`, message);
  // Mostrar mensaje al usuario
}
```

---

## Testing

### Ejemplo con Jest y React Testing Library

```javascript
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AuthProvider } from './AuthContext';
import Login from './Login';
import { authService } from './services/authService';

jest.mock('./services/authService');

describe('Login Component', () => {
  test('debe hacer login correctamente', async () => {
    const mockLoginData = {
      access_token: 'fake-token',
      user: {
        id: 1,
        email: 'test@test.com',
        rol: { nombre: 'Cliente' }
      }
    };

    authService.login.mockResolvedValue(mockLoginData);

    render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );

    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@test.com' }
    });

    fireEvent.change(screen.getByPlaceholderText('Contraseña'), {
      target: { value: 'password123' }
    });

    fireEvent.click(screen.getByText('Entrar'));

    await waitFor(() => {
      expect(authService.login).toHaveBeenCalledWith(
        'test@test.com',
        'password123'
      );
    });
  });
});
```

---

## Consejos y Mejores Prácticas

1. **Siempre manejar errores**: Usa try-catch o .catch() en todas las peticiones
2. **Validar antes de enviar**: Valida los datos en el frontend antes de enviar
3. **Feedback al usuario**: Muestra loaders, mensajes de éxito y error
4. **Guardar token de forma segura**: Considera usar httpOnly cookies en producción
5. **Refresh token**: Implementa un sistema de refresh token para mejor UX
6. **Caché de datos**: Usa React Query o SWR para cachear datos
7. **Optimistic UI**: Actualiza la UI antes de recibir la respuesta del servidor
8. **Retry logic**: Implementa reintentos automáticos para errores de red

---

**Última actualización**: 2025-11-16
