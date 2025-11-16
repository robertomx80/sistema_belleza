# Sistema de Salón de Belleza 💅

Sistema completo de gestión para salones de belleza con backend en NestJS y frontend en React.

## 🏗️ Estructura del Proyecto

```
sistema_belleza/
├── backend/                    # Backend NestJS + Prisma
│   ├── src/                   # Código fuente del backend
│   ├── prisma/                # Esquemas y migraciones de DB
│   ├── docs/                  # Documentación del backend
│   └── README.md              # Documentación específica del backend
├── frontend/                   # Frontend React + Vite
│   ├── src/                   # Código fuente del frontend
│   ├── public/                # Archivos públicos
│   └── README.md              # Documentación específica del frontend
└── README.md                  # Este archivo
```

## 🚀 Inicio Rápido

### Requisitos Previos

- Node.js >= 18
- npm o yarn
- Docker y Docker Compose (recomendado)
- PostgreSQL 16 (si no usas Docker)

### Instalación

#### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd sistema_belleza
```

#### 2. Configurar Backend

```bash
cd backend

# Copiar variables de entorno
cp .env.example .env

# Iniciar PostgreSQL con Docker
docker-compose -f docker-compose.dev.yml up -d

# Instalar dependencias
npm install

# Generar cliente de Prisma
npm run prisma:generate

# Ejecutar migraciones
npx prisma migrate dev --name init

# Poblar la base de datos
npm run prisma:seed

# Iniciar servidor
npm run start:dev
```

El backend estará disponible en `http://localhost:3001`

#### 3. Configurar Frontend

```bash
cd ../frontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El frontend estará disponible en `http://localhost:5173`

## 📚 Documentación

- **Backend**: Ver [backend/README.md](backend/README.md)
- **Frontend**: Ver [frontend/README.md](frontend/README.md)
- **API Endpoints**: Ver [backend/docs/API_ENDPOINTS.md](backend/docs/API_ENDPOINTS.md)

## 🔐 Credenciales por Defecto

Después de ejecutar el seed del backend, puedes acceder con:

- **Email**: `admin@salon.com`
- **Password**: `admin123`

⚠️ **Importante**: Cambia estas credenciales en producción.

## 🛠️ Tecnologías

### Backend
- [NestJS](https://nestjs.com/) - Framework de Node.js
- [Prisma](https://www.prisma.io/) - ORM para PostgreSQL
- [PostgreSQL](https://www.postgresql.org/) - Base de datos
- [JWT](https://jwt.io/) - Autenticación
- [TypeScript](https://www.typescriptlang.org/) - Lenguaje

### Frontend
- [React](https://react.dev/) - Librería UI
- [Vite](https://vitejs.dev/) - Build tool
- [TailwindCSS](https://tailwindcss.com/) - Framework CSS
- [React Router](https://reactrouter.com/) - Enrutamiento
- [TypeScript](https://www.typescriptlang.org/) - Lenguaje

## 🎯 Características

- ✅ Autenticación JWT completa
- ✅ Sistema de roles y permisos
- ✅ Gestión de usuarios, empleados y clientes
- ✅ Catálogo de servicios y productos
- ✅ Sistema de citas y reservas
- ✅ Gestión de inventario
- ✅ Ventas y facturación
- ✅ Dashboard con reportes
- ✅ Interfaz moderna y responsive
- ✅ Dark mode

## 📝 Scripts Útiles

### Backend

```bash
cd backend

# Desarrollo
npm run start:dev          # Iniciar con hot-reload
npm run start:debug        # Iniciar en modo debug

# Prisma
npm run prisma:studio      # Abrir interfaz visual de DB
npm run prisma:migrate     # Ejecutar migraciones
npm run prisma:seed        # Poblar base de datos

# Producción
npm run build              # Construir aplicación
npm run start:prod         # Iniciar en producción
```

### Frontend

```bash
cd frontend

# Desarrollo
npm run dev                # Iniciar servidor de desarrollo
npm run build              # Construir para producción
npm run preview            # Previsualizar build de producción
npm run lint               # Ejecutar linter
```

## 🐳 Docker

### Desarrollo (Solo PostgreSQL)

```bash
cd backend
docker-compose -f docker-compose.dev.yml up -d
```

### Producción (Backend + PostgreSQL)

```bash
cd backend
docker-compose up -d
```

## 🧪 Testing

### Backend

```bash
cd backend
npm run test               # Unit tests
npm run test:e2e          # E2E tests
npm run test:cov          # Coverage
```

### Frontend

```bash
cd frontend
npm run test              # Unit tests
```

## 📦 Despliegue

### Backend

1. Construir imagen Docker:
   ```bash
   cd backend
   docker build -t sistema-belleza-backend .
   ```

2. O desplegar en servicios como:
   - Railway
   - Render
   - DigitalOcean App Platform
   - AWS EC2/ECS
   - Heroku

### Frontend

1. Construir para producción:
   ```bash
   cd frontend
   npm run build
   ```

2. Desplegar la carpeta `dist/` en:
   - Vercel
   - Netlify
   - Cloudflare Pages
   - AWS S3 + CloudFront
   - GitHub Pages

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia ISC.

## 🆘 Soporte

Para reportar problemas o solicitar nuevas funcionalidades, abre un issue en el repositorio.

---

**Versión**: 1.0.0
**Última actualización**: 2025-11-16
