# Sistema de Salón de Belleza - Backend

Backend completo desarrollado con NestJS y Prisma para la gestión de un salón de belleza.

## Características

- ✅ **Autenticación JWT**: Sistema completo de autenticación y autorización
- ✅ **Base de datos PostgreSQL**: Con Prisma ORM
- ✅ **Docker**: Configuración completa con Docker Compose
- ✅ **Roles y Permisos**: Sistema de control de acceso basado en roles
- ✅ **Documentación**: API completamente documentada
- ✅ **TypeScript**: Totalmente tipado
- ✅ **Validaciones**: Usando class-validator

## Tecnologías

- [NestJS](https://nestjs.com/) - Framework de Node.js
- [Prisma](https://www.prisma.io/) - ORM para PostgreSQL
- [PostgreSQL](https://www.postgresql.org/) - Base de datos
- [JWT](https://jwt.io/) - Autenticación
- [Docker](https://www.docker.com/) - Contenedorización
- [TypeScript](https://www.typescriptlang.org/) - Lenguaje

## Estructura del Proyecto

```
sistema_belleza/
├── src/
│   ├── auth/                    # Módulo de autenticación
│   │   ├── dto/                 # DTOs de autenticación
│   │   ├── strategies/          # Estrategias Passport (JWT, Local)
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   └── auth.module.ts
│   ├── common/                  # Recursos compartidos
│   │   ├── decorators/          # Decoradores personalizados
│   │   ├── guards/              # Guards de autenticación y roles
│   │   └── dto/
│   ├── prisma/                  # Servicio de Prisma
│   │   ├── prisma.service.ts
│   │   └── prisma.module.ts
│   ├── usuarios/                # Módulo de usuarios
│   │   ├── dto/
│   │   ├── usuarios.controller.ts
│   │   ├── usuarios.service.ts
│   │   └── usuarios.module.ts
│   ├── roles/                   # Módulo de roles
│   │   ├── roles.controller.ts
│   │   ├── roles.service.ts
│   │   └── roles.module.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   └── main.ts
├── prisma/
│   ├── schema.prisma            # Esquema de base de datos
│   └── seed.ts                  # Datos iniciales
├── database/
│   ├── schema.sql               # Esquema SQL de referencia
│   └── README.md
├── docs/
│   ├── API_ENDPOINTS.md         # Documentación de endpoints
│   └── EJEMPLOS_FRONTEND.md     # Ejemplos para frontend
├── docker-compose.yml           # Docker Compose producción
├── docker-compose.dev.yml       # Docker Compose desarrollo
├── Dockerfile
├── .env                         # Variables de entorno
├── .env.example                 # Ejemplo de variables de entorno
└── README.md
```

## Requisitos Previos

- Node.js >= 18
- npm o yarn
- Docker y Docker Compose (opcional pero recomendado)
- PostgreSQL 16 (si no usas Docker)

## Instalación

### Opción 1: Con Docker (Recomendado)

1. **Clonar el repositorio**:
   ```bash
   git clone <url-del-repositorio>
   cd sistema_belleza
   ```

2. **Copiar el archivo de entorno**:
   ```bash
   cp .env.example .env
   ```

3. **Iniciar PostgreSQL con Docker**:
   ```bash
   docker-compose -f docker-compose.dev.yml up -d
   ```

   Esto iniciará solo la base de datos PostgreSQL en el puerto 5432.

4. **Instalar dependencias**:
   ```bash
   npm install
   ```

5. **Generar el cliente de Prisma**:
   ```bash
   npm run prisma:generate
   ```

6. **Ejecutar migraciones**:
   ```bash
   npx prisma migrate dev --name init
   ```

7. **Poblar la base de datos con datos iniciales**:
   ```bash
   npm run prisma:seed
   ```

   Esto creará:
   - 3 roles (Administrador, Empleado, Cliente)
   - Usuario administrador (admin@salon.com / admin123)
   - Categorías de servicios y productos
   - Configuración inicial

8. **Iniciar el servidor en modo desarrollo**:
   ```bash
   npm run start:dev
   ```

   El servidor estará disponible en `http://localhost:3001`

### Opción 2: Sin Docker

1. **Instalar PostgreSQL**:
   Descarga e instala PostgreSQL desde [postgresql.org](https://www.postgresql.org/download/)

2. **Crear base de datos**:
   ```sql
   CREATE DATABASE sistema_database;
   ```

3. **Seguir pasos 1, 2, 4-8 de la Opción 1**

### Opción 3: Docker Completo (Producción)

Para ejecutar toda la aplicación en Docker:

```bash
docker-compose up -d
```

Esto iniciará:
- PostgreSQL en el puerto 5432
- Backend NestJS en el puerto 3001

## Scripts Disponibles

### Desarrollo

```bash
# Iniciar en modo desarrollo (con hot-reload)
npm run start:dev

# Iniciar en modo debug
npm run start:debug
```

### Producción

```bash
# Construir la aplicación
npm run build

# Iniciar en modo producción
npm run start:prod
```

### Prisma

```bash
# Generar cliente de Prisma
npm run prisma:generate

# Crear y ejecutar migración
npm run prisma:migrate

# Abrir Prisma Studio (interfaz visual de DB)
npm run prisma:studio

# Poblar base de datos
npm run prisma:seed
```

### Docker

```bash
# Iniciar solo PostgreSQL (desarrollo)
docker-compose -f docker-compose.dev.yml up -d

# Iniciar toda la aplicación (producción)
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down

# Detener y eliminar volúmenes (¡cuidado! borra los datos)
docker-compose down -v
```

## Variables de Entorno

Crea un archivo `.env` basado en `.env.example`:

```env
# Database
DATABASE_URL="postgresql://postgres:postgres123@localhost:5432/sistema_database?schema=public"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRATION="7d"

# Application
PORT=3001
NODE_ENV=development

# CORS
FRONTEND_URL="http://localhost:3000"
```

⚠️ **Importante**: Cambia `JWT_SECRET` en producción por una clave segura.

## Uso de la API

### 1. Healthcheck

```bash
curl http://localhost:3001/api
```

### 2. Login

```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@salon.com",
    "password": "admin123"
  }'
```

Respuesta:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "admin@salon.com",
    "rol": {
      "id": 1,
      "nombre": "Administrador"
    }
  }
}
```

### 3. Obtener Perfil (con token)

```bash
curl http://localhost:3001/api/auth/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### 4. Listar Usuarios (Admin)

```bash
curl http://localhost:3001/api/usuarios \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Documentación

- **API Endpoints**: Ver [docs/API_ENDPOINTS.md](docs/API_ENDPOINTS.md)
- **Ejemplos Frontend**: Ver [docs/EJEMPLOS_FRONTEND.md](docs/EJEMPLOS_FRONTEND.md)
- **Esquema de Base de Datos**: Ver [database/README.md](database/README.md)

## Roles del Sistema

El sistema cuenta con 3 roles predefinidos:

1. **Administrador** (ID: 1)
   - Acceso completo al sistema
   - Puede gestionar usuarios, empleados, clientes, etc.

2. **Empleado** (ID: 2)
   - Puede gestionar citas y ventas
   - Acceso a su horario y servicios

3. **Cliente** (ID: 3)
   - Puede ver y gestionar sus citas
   - Acceso al catálogo de servicios

## Usuario Administrador por Defecto

Después de ejecutar el seed, tendrás acceso con:

- **Email**: `admin@salon.com`
- **Password**: `admin123`

⚠️ **Importante**: Cambia esta contraseña en producción.

## Prisma Studio

Para visualizar y editar los datos de la base de datos:

```bash
npm run prisma:studio
```

Abrirá una interfaz web en `http://localhost:5555`

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Problemas Comunes

### Error: "Can't reach database server"

**Solución**: Asegúrate de que PostgreSQL esté corriendo:
```bash
docker-compose -f docker-compose.dev.yml up -d
```

### Error: "Port 3001 already in use"

**Solución**: Cambia el puerto en el archivo `.env`:
```env
PORT=3002
```

### Error: "JWT must be provided"

**Solución**: Asegúrate de enviar el token en el header:
```
Authorization: Bearer YOUR_TOKEN
```

### Error de migraciones

**Solución**: Resetea la base de datos:
```bash
npx prisma migrate reset
npm run prisma:seed
```

## Próximas Funcionalidades

- [ ] Módulo de Clientes completo
- [ ] Módulo de Empleados
- [ ] Módulo de Servicios y Categorías
- [ ] Módulo de Productos e Inventario
- [ ] Sistema de Citas y Reservas
- [ ] Sistema de Ventas y Facturación
- [ ] Dashboard y Reportes
- [ ] Notificaciones por email
- [ ] Recordatorios de citas
- [ ] Sistema de horarios y disponibilidad

## Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia ISC.

## Soporte

Para reportar problemas o solicitar nuevas funcionalidades, contacta al equipo de desarrollo.

---

**Versión**: 1.0.0
**Última actualización**: 2025-11-16
