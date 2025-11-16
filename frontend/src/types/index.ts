export interface User {
  id: number;
  email: string;
  nombre: string;
  rol: Role;
  rolId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Role {
  id: number;
  nombre: string;
  descripcion?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  nombre: string;
  rolId?: number;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface Cliente {
  id: number;
  nombre: string;
  telefono?: string;
  email?: string;
  fechaNacimiento?: string;
  direccion?: string;
  notas?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Servicio {
  id: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  duracion: number;
  categoriaId?: number;
  categoria?: CategoriaServicio;
  activo: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CategoriaServicio {
  id: number;
  nombre: string;
  descripcion?: string;
}

export interface Producto {
  id: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  costo?: number;
  stock: number;
  stockMinimo: number;
  categoriaId?: number;
  categoria?: CategoriaProducto;
  activo: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CategoriaProducto {
  id: number;
  nombre: string;
  descripcion?: string;
}

export interface Cita {
  id: number;
  fecha: string;
  hora: string;
  estado: 'PENDIENTE' | 'CONFIRMADA' | 'COMPLETADA' | 'CANCELADA';
  clienteId: number;
  cliente?: Cliente;
  empleadoId?: number;
  empleado?: User;
  servicios?: Servicio[];
  notas?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Venta {
  id: number;
  fecha: string;
  total: number;
  metodoPago: string;
  clienteId?: number;
  cliente?: Cliente;
  empleadoId: number;
  empleado?: User;
  detalles?: DetalleVenta[];
  createdAt: string;
  updatedAt: string;
}

export interface DetalleVenta {
  id: number;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
  productoId?: number;
  producto?: Producto;
  servicioId?: number;
  servicio?: Servicio;
}

export interface DashboardStats {
  ventasHoy: number;
  ventasMes: number;
  citasHoy: number;
  citasPendientes: number;
  clientesTotal: number;
  serviciosActivos: number;
}

export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}
