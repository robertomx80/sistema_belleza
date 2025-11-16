# Documentación de API - Sistema de Salón de Belleza

## Información General

- **Base URL**: `http://localhost:3001/api`
- **Autenticación**: Bearer Token (JWT)
- **Formato de Respuesta**: JSON

---

## Tabla de Contenidos

1. [Autenticación](#autenticación)
2. [Usuarios](#usuarios)
3. [Roles](#roles)
4. [Códigos de Estado](#códigos-de-estado)
5. [Manejo de Errores](#manejo-de-errores)

---

## Autenticación

Todos los endpoints requieren autenticación mediante JWT, excepto los marcados como `[Público]`.

### Headers Requeridos

```
Authorization: Bearer {token}
Content-Type: application/json
```

---

## 1. Autenticación

### 1.1 Iniciar Sesión [Público]

**Endpoint**: `POST /auth/login`

**Descripción**: Autentica un usuario y devuelve un token JWT.

**Request Body**:
```json
{
  "email": "admin@salon.com",
  "password": "admin123"
}
```

**Response**: `200 OK`
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "admin@salon.com",
    "rol": {
      "id": 1,
      "nombre": "Administrador",
      "descripcion": "Acceso completo al sistema"
    },
    "empleado": null,
    "cliente": null
  }
}
```

**Errores**:
- `401 Unauthorized`: Credenciales inválidas
- `401 Unauthorized`: Usuario inactivo

---

### 1.2 Registrar Usuario [Público]

**Endpoint**: `POST /auth/register`

**Descripción**: Registra un nuevo usuario en el sistema.

**Request Body**:
```json
{
  "email": "nuevo@usuario.com",
  "password": "password123",
  "rolId": 3
}
```

**Response**: `201 Created`
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 2,
    "email": "nuevo@usuario.com",
    "rol": {
      "id": 3,
      "nombre": "Cliente",
      "descripcion": "Acceso limitado para ver citas y servicios"
    }
  }
}
```

**Validaciones**:
- `email`: Debe ser un email válido
- `password`: Mínimo 6 caracteres
- `rolId`: Debe ser un ID de rol válido

**Errores**:
- `409 Conflict`: El email ya está registrado
- `409 Conflict`: El rol especificado no existe

---

### 1.3 Obtener Perfil

**Endpoint**: `GET /auth/profile`

**Descripción**: Obtiene el perfil del usuario autenticado.

**Headers**: `Authorization: Bearer {token}`

**Response**: `200 OK`
```json
{
  "id": 1,
  "email": "admin@salon.com",
  "rolId": 1,
  "activo": true,
  "ultimoAcceso": "2025-11-16T10:30:00.000Z",
  "creadoEn": "2025-11-15T08:00:00.000Z",
  "actualizadoEn": "2025-11-16T10:30:00.000Z",
  "rol": {
    "id": 1,
    "nombre": "Administrador",
    "descripcion": "Acceso completo al sistema"
  },
  "empleado": null,
  "cliente": null
}
```

**Errores**:
- `401 Unauthorized`: Token inválido o expirado

---

### 1.4 Verificar Token

**Endpoint**: `GET /auth/verify`

**Descripción**: Verifica si el token JWT es válido.

**Headers**: `Authorization: Bearer {token}`

**Response**: `200 OK`
```json
{
  "valid": true,
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

**Errores**:
- `401 Unauthorized`: Token inválido o expirado

---

## 2. Usuarios

**Permisos**: Todos los endpoints requieren rol de **Administrador**

### 2.1 Crear Usuario

**Endpoint**: `POST /usuarios`

**Descripción**: Crea un nuevo usuario en el sistema.

**Request Body**:
```json
{
  "email": "empleado@salon.com",
  "password": "password123",
  "rolId": 2,
  "activo": true
}
```

**Response**: `201 Created`
```json
{
  "id": 3,
  "email": "empleado@salon.com",
  "rolId": 2,
  "activo": true,
  "ultimoAcceso": null,
  "creadoEn": "2025-11-16T11:00:00.000Z",
  "actualizadoEn": "2025-11-16T11:00:00.000Z",
  "rol": {
    "id": 2,
    "nombre": "Empleado",
    "descripcion": "Puede gestionar citas y ventas"
  }
}
```

**Validaciones**:
- `email`: Requerido, debe ser válido
- `password`: Requerido, mínimo 6 caracteres
- `rolId`: Requerido, debe existir
- `activo`: Opcional, booleano (default: true)

**Errores**:
- `409 Conflict`: El email ya está registrado
- `403 Forbidden`: Usuario no tiene permisos de Administrador

---

### 2.2 Listar Usuarios

**Endpoint**: `GET /usuarios`

**Descripción**: Obtiene la lista de todos los usuarios.

**Response**: `200 OK`
```json
[
  {
    "id": 1,
    "email": "admin@salon.com",
    "rolId": 1,
    "activo": true,
    "ultimoAcceso": "2025-11-16T10:30:00.000Z",
    "creadoEn": "2025-11-15T08:00:00.000Z",
    "actualizadoEn": "2025-11-16T10:30:00.000Z",
    "rol": {
      "id": 1,
      "nombre": "Administrador",
      "descripcion": "Acceso completo al sistema"
    },
    "empleado": null,
    "cliente": null
  },
  {
    "id": 2,
    "email": "cliente@ejemplo.com",
    "rolId": 3,
    "activo": true,
    "ultimoAcceso": null,
    "creadoEn": "2025-11-16T09:00:00.000Z",
    "actualizadoEn": "2025-11-16T09:00:00.000Z",
    "rol": {
      "id": 3,
      "nombre": "Cliente",
      "descripcion": "Acceso limitado para ver citas y servicios"
    },
    "empleado": null,
    "cliente": {
      "id": 1,
      "nombre": "Juan",
      "apellido": "Pérez"
    }
  }
]
```

---

### 2.3 Obtener Usuario por ID

**Endpoint**: `GET /usuarios/:id`

**Descripción**: Obtiene un usuario específico por su ID.

**Parámetros**:
- `id` (path): ID del usuario

**Response**: `200 OK`
```json
{
  "id": 1,
  "email": "admin@salon.com",
  "rolId": 1,
  "activo": true,
  "ultimoAcceso": "2025-11-16T10:30:00.000Z",
  "creadoEn": "2025-11-15T08:00:00.000Z",
  "actualizadoEn": "2025-11-16T10:30:00.000Z",
  "rol": {
    "id": 1,
    "nombre": "Administrador",
    "descripcion": "Acceso completo al sistema"
  },
  "empleado": null,
  "cliente": null
}
```

**Errores**:
- `404 Not Found`: Usuario no encontrado

---

### 2.4 Actualizar Usuario

**Endpoint**: `PATCH /usuarios/:id`

**Descripción**: Actualiza un usuario existente.

**Parámetros**:
- `id` (path): ID del usuario

**Request Body** (todos los campos son opcionales):
```json
{
  "email": "nuevo@email.com",
  "password": "nuevapassword123",
  "rolId": 2,
  "activo": false
}
```

**Response**: `200 OK`
```json
{
  "id": 1,
  "email": "nuevo@email.com",
  "rolId": 2,
  "activo": false,
  "ultimoAcceso": "2025-11-16T10:30:00.000Z",
  "creadoEn": "2025-11-15T08:00:00.000Z",
  "actualizadoEn": "2025-11-16T11:30:00.000Z",
  "rol": {
    "id": 2,
    "nombre": "Empleado",
    "descripcion": "Puede gestionar citas y ventas"
  }
}
```

**Errores**:
- `404 Not Found`: Usuario no encontrado

---

### 2.5 Desactivar Usuario

**Endpoint**: `DELETE /usuarios/:id`

**Descripción**: Desactiva un usuario (soft delete).

**Parámetros**:
- `id` (path): ID del usuario

**Response**: `200 OK`
```json
{
  "id": 1,
  "email": "admin@salon.com",
  "rolId": 1,
  "activo": false,
  "ultimoAcceso": "2025-11-16T10:30:00.000Z",
  "creadoEn": "2025-11-15T08:00:00.000Z",
  "actualizadoEn": "2025-11-16T11:45:00.000Z"
}
```

**Errores**:
- `404 Not Found`: Usuario no encontrado

---

## 3. Roles

### 3.1 Listar Roles

**Endpoint**: `GET /roles`

**Descripción**: Obtiene la lista de todos los roles disponibles.

**Response**: `200 OK`
```json
[
  {
    "id": 1,
    "nombre": "Administrador",
    "descripcion": "Acceso completo al sistema",
    "creadoEn": "2025-11-15T08:00:00.000Z",
    "actualizadoEn": "2025-11-15T08:00:00.000Z",
    "_count": {
      "usuarios": 1
    }
  },
  {
    "id": 2,
    "nombre": "Empleado",
    "descripcion": "Puede gestionar citas y ventas",
    "creadoEn": "2025-11-15T08:00:00.000Z",
    "actualizadoEn": "2025-11-15T08:00:00.000Z",
    "_count": {
      "usuarios": 3
    }
  },
  {
    "id": 3,
    "nombre": "Cliente",
    "descripcion": "Acceso limitado para ver citas y servicios",
    "creadoEn": "2025-11-15T08:00:00.000Z",
    "actualizadoEn": "2025-11-15T08:00:00.000Z",
    "_count": {
      "usuarios": 15
    }
  }
]
```

---

### 3.2 Obtener Rol por ID

**Endpoint**: `GET /roles/:id`

**Descripción**: Obtiene un rol específico por su ID.

**Parámetros**:
- `id` (path): ID del rol

**Response**: `200 OK`
```json
{
  "id": 1,
  "nombre": "Administrador",
  "descripcion": "Acceso completo al sistema",
  "creadoEn": "2025-11-15T08:00:00.000Z",
  "actualizadoEn": "2025-11-15T08:00:00.000Z",
  "usuarios": [
    {
      "id": 1,
      "email": "admin@salon.com",
      "activo": true
    }
  ]
}
```

**Errores**:
- `404 Not Found`: Rol no encontrado

---

## Códigos de Estado

| Código | Descripción |
|--------|-------------|
| 200 | OK - Solicitud exitosa |
| 201 | Created - Recurso creado exitosamente |
| 400 | Bad Request - Datos de entrada inválidos |
| 401 | Unauthorized - No autenticado o token inválido |
| 403 | Forbidden - No tiene permisos para esta acción |
| 404 | Not Found - Recurso no encontrado |
| 409 | Conflict - Conflicto con el estado actual (ej: email duplicado) |
| 500 | Internal Server Error - Error del servidor |

---

## Manejo de Errores

Todos los errores siguen el siguiente formato:

```json
{
  "statusCode": 400,
  "message": "Descripción del error",
  "error": "Bad Request"
}
```

### Ejemplos de Errores de Validación

```json
{
  "statusCode": 400,
  "message": [
    "El email debe ser válido",
    "La contraseña debe tener al menos 6 caracteres"
  ],
  "error": "Bad Request"
}
```

---

## Información Adicional

### Tipos de Roles

1. **Administrador** (ID: 1)
   - Acceso completo al sistema
   - Puede gestionar usuarios, empleados, clientes, servicios, productos, etc.

2. **Empleado** (ID: 2)
   - Puede gestionar citas y ventas
   - Puede ver su horario y sus servicios asignados

3. **Cliente** (ID: 3)
   - Puede ver y gestionar sus propias citas
   - Puede ver el catálogo de servicios

### Notas de Seguridad

- Las contraseñas se hashean usando bcrypt antes de almacenarse
- Los tokens JWT expiran según la configuración (por defecto: 7 días)
- Los usuarios inactivos no pueden autenticarse
- El sistema usa soft delete para usuarios (marca como inactivo en lugar de eliminar)

### Próximos Módulos (En Desarrollo)

Los siguientes módulos estarán disponibles en futuras versiones:

- **Clientes**: Gestión completa de clientes
- **Empleados**: Gestión de empleados y sus horarios
- **Servicios**: Catálogo de servicios y categorías
- **Productos**: Inventario y gestión de productos
- **Citas**: Sistema de reservas y agendamiento
- **Ventas**: Punto de venta y facturación
- **Reportes**: Estadísticas y reportes del negocio

---

## Contacto y Soporte

Para reportar problemas o solicitar nuevas funcionalidades, contacta al equipo de desarrollo.

**Versión de la API**: 1.0.0
**Última actualización**: 2025-11-16
