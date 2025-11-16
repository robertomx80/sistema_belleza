# Sistema de Salón de Belleza - Frontend

Frontend moderno desarrollado con React, TypeScript, Vite y TailwindCSS.

## 🚀 Tecnologías

- **React 19** - Librería UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool ultrarrápido
- **TailwindCSS** - Framework CSS utility-first
- **React Router** - Enrutamiento
- **Axios** - Cliente HTTP
- **Lucide React** - Iconos modernos

## 📋 Requisitos

- Node.js >= 18
- npm o yarn
- Backend corriendo en `http://localhost:3001`

## 🛠️ Instalación

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Configurar variables de entorno**:
   ```bash
   cp .env.example .env
   ```

   Edita `.env` si el backend está en otra URL:
   ```env
   VITE_API_URL=http://localhost:3001/api
   ```

3. **Iniciar servidor de desarrollo**:
   ```bash
   npm run dev
   ```

   La aplicación estará disponible en `http://localhost:5173`

## 📁 Estructura del Proyecto

```
frontend/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── auth/           # Componentes de autenticación
│   │   ├── common/         # Componentes comunes (ProtectedRoute, etc.)
│   │   └── layout/         # Layout y navegación
│   ├── contexts/           # Contextos de React (Auth, etc.)
│   ├── hooks/              # Custom hooks
│   ├── pages/              # Páginas de la aplicación
│   │   ├── auth/          # Login, Register
│   │   ├── dashboard/     # Dashboard principal
│   │   ├── clientes/      # Gestión de clientes
│   │   ├── servicios/     # Gestión de servicios
│   │   ├── productos/     # Gestión de productos
│   │   ├── citas/         # Gestión de citas
│   │   └── ventas/        # Gestión de ventas
│   ├── services/           # Servicios de API
│   ├── types/              # Tipos TypeScript
│   ├── utils/              # Utilidades y constantes
│   ├── App.tsx            # Componente principal con rutas
│   ├── main.tsx           # Punto de entrada
│   └── index.css          # Estilos globales con Tailwind
├── public/                 # Archivos públicos
├── .env                    # Variables de entorno
├── .env.example           # Ejemplo de variables de entorno
├── package.json           # Dependencias
├── tailwind.config.js     # Configuración de Tailwind
├── tsconfig.json          # Configuración de TypeScript
└── vite.config.ts         # Configuración de Vite
```

## 🎨 Características

### ✅ Autenticación
- Login con email y contraseña
- Registro de nuevos usuarios
- Gestión de sesión con JWT
- Protección de rutas por roles

### ✅ Dashboard
- Estadísticas en tiempo real
- Gráficos de ventas
- Citas del día
- Acciones rápidas

### ✅ Módulos
- **Clientes**: Gestión completa de clientes
- **Servicios**: Catálogo de servicios del salón
- **Productos**: Inventario de productos
- **Citas**: Sistema de agendamiento
- **Ventas**: Registro y facturación

### ✅ UI/UX
- Diseño moderno y elegante
- Totalmente responsive
- Navegación intuitiva
- Modo claro (dark mode próximamente)
- Iconos con Lucide React
- Animaciones suaves

## 🔐 Roles y Permisos

El sistema maneja 3 roles:

1. **Administrador** (ID: 1)
   - Acceso completo a todos los módulos
   - Puede gestionar usuarios

2. **Empleado** (ID: 2)
   - Acceso a clientes, servicios, productos, citas y ventas
   - No puede gestionar usuarios

3. **Cliente** (ID: 3)
   - Solo puede ver y gestionar sus citas

## 📝 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Iniciar servidor de desarrollo

# Producción
npm run build        # Construir para producción
npm run preview      # Previsualizar build de producción

# Calidad de código
npm run lint         # Ejecutar ESLint
```

## 🔌 API Integration

El frontend se comunica con el backend a través de Axios. La configuración se encuentra en:

- **API Client**: `src/services/api.ts`
- **Auth Service**: `src/services/auth.service.ts`

### Interceptores

El cliente HTTP incluye interceptores para:
- Agregar automáticamente el token JWT a las peticiones
- Manejar errores de autenticación (401)
- Redirigir al login cuando el token expira

### Ejemplo de uso

```typescript
import api from './services/api';

// GET request
const clientes = await api.get('/clientes');

// POST request
const nuevoCliente = await api.post('/clientes', {
  nombre: 'Juan Pérez',
  email: 'juan@example.com',
});
```

## 🎯 Rutas

| Ruta | Componente | Roles permitidos |
|------|-----------|-----------------|
| `/login` | LoginPage | Público |
| `/register` | RegisterPage | Público |
| `/dashboard` | DashboardPage | Todos autenticados |
| `/clientes` | ClientesPage | Admin, Empleado |
| `/servicios` | ServiciosPage | Admin, Empleado |
| `/productos` | ProductosPage | Admin, Empleado |
| `/citas` | CitasPage | Todos autenticados |
| `/ventas` | VentasPage | Admin, Empleado |
| `/usuarios` | UsuariosPage | Solo Admin |

## 🎨 Personalización

### Colores

Los colores primarios se configuran en `tailwind.config.js`:

```javascript
colors: {
  primary: {
    50: '#fdf2f8',
    // ... más tonos
    900: '#831843',
  },
}
```

### Estilos Globales

Los estilos globales y clases personalizadas están en `src/index.css`:

- `.btn` - Botón base
- `.btn-primary` - Botón primario
- `.btn-secondary` - Botón secundario
- `.input` - Input de formulario
- `.card` - Tarjeta de contenido

## 📦 Despliegue

### Vercel (Recomendado)

1. Instala Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Despliega:
   ```bash
   npm run build
   vercel --prod
   ```

### Netlify

1. Construye el proyecto:
   ```bash
   npm run build
   ```

2. Arrastra la carpeta `dist/` a [Netlify Drop](https://app.netlify.com/drop)

### Variables de Entorno en Producción

Asegúrate de configurar `VITE_API_URL` apuntando a tu backend en producción:

```env
VITE_API_URL=https://tu-backend.com/api
```

## 🐛 Problemas Comunes

### Error: "Cannot connect to backend"

**Solución**: Verifica que el backend esté corriendo en `http://localhost:3001`

### Error: "Module not found"

**Solución**: Reinstala las dependencias:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Los estilos de Tailwind no se aplican

**Solución**: Verifica que `index.css` esté importado en `main.tsx`

## 🚧 Próximas Funcionalidades

- [ ] Dark mode
- [ ] Notificaciones en tiempo real
- [ ] Sistema de chat
- [ ] Reportes avanzados
- [ ] PWA (Progressive Web App)
- [ ] Internacionalización (i18n)
- [ ] Tests unitarios con Vitest
- [ ] Tests E2E con Playwright

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia ISC.

---

**Versión**: 1.0.0
**Última actualización**: 2025-11-16
