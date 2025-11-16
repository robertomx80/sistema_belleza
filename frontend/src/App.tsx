import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import DashboardPage from './pages/dashboard/DashboardPage';
import ClientesPage from './pages/clientes/ClientesPage';
import ServiciosPage from './pages/servicios/ServiciosPage';
import ProductosPage from './pages/productos/ProductosPage';
import CitasPage from './pages/citas/CitasPage';
import VentasPage from './pages/ventas/VentasPage';
import { ROLES } from './utils/constants';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/clientes"
            element={
              <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.EMPLEADO]}>
                <ClientesPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/servicios"
            element={
              <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.EMPLEADO]}>
                <ServiciosPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/productos"
            element={
              <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.EMPLEADO]}>
                <ProductosPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/citas"
            element={
              <ProtectedRoute>
                <CitasPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/ventas"
            element={
              <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.EMPLEADO]}>
                <VentasPage />
              </ProtectedRoute>
            }
          />

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* 404 */}
          <Route
            path="*"
            element={
              <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
                  <p className="text-xl text-gray-600 mb-8">Página no encontrada</p>
                  <a href="/dashboard" className="btn btn-primary">
                    Volver al inicio
                  </a>
                </div>
              </div>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
