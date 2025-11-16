export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const ROLES = {
  ADMIN: 1,
  EMPLEADO: 2,
  CLIENTE: 3,
} as const;

export const ROLE_NAMES = {
  1: 'Administrador',
  2: 'Empleado',
  3: 'Cliente',
} as const;

export const ESTADOS_CITA = {
  PENDIENTE: 'PENDIENTE',
  CONFIRMADA: 'CONFIRMADA',
  COMPLETADA: 'COMPLETADA',
  CANCELADA: 'CANCELADA',
} as const;

export const METODOS_PAGO = [
  'Efectivo',
  'Tarjeta',
  'Transferencia',
  'PayPal',
] as const;

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  CLIENTES: '/clientes',
  SERVICIOS: '/servicios',
  PRODUCTOS: '/productos',
  CITAS: '/citas',
  VENTAS: '/ventas',
  USUARIOS: '/usuarios',
  PERFIL: '/perfil',
} as const;
