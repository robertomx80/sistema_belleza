# Base de Datos - Sistema de Salón de Belleza

## Descripción General

Esta base de datos está diseñada para gestionar todas las operaciones de un salón de belleza, incluyendo:
- Gestión de clientes y empleados
- Programación de citas
- Catálogo de servicios
- Inventario de productos
- Ventas y facturación
- Horarios laborales

## Estructura de la Base de Datos

### Tablas Principales

#### 1. **roles**
Roles de usuario en el sistema (Administrador, Empleado, Cliente)

#### 2. **usuarios**
Credenciales de acceso al sistema vinculadas a roles

#### 3. **clientes**
Información de los clientes del salón
- Datos personales
- Contacto
- Historial
- Opcionalmente vinculado a un usuario para acceso al sistema

#### 4. **empleados**
Información del personal del salón
- Datos personales y laborales
- Especialidades
- Comisiones y salario
- Vinculado obligatoriamente a un usuario

#### 5. **categorias_servicios**
Categorías para organizar servicios (Cabello, Uñas, Facial, etc.)

#### 6. **servicios**
Catálogo de servicios ofrecidos
- Precio
- Duración
- Descripción

#### 7. **empleados_servicios**
Relación muchos a muchos: qué empleado puede realizar qué servicio

#### 8. **citas**
Reservas de los clientes
- Fecha y hora
- Cliente asignado
- Empleado asignado
- Estados: pendiente, confirmada, en_proceso, completada, cancelada, no_asistio

#### 9. **citas_servicios**
Servicios incluidos en cada cita (una cita puede tener múltiples servicios)

#### 10. **categorias_productos**
Categorías para organizar productos del inventario

#### 11. **productos**
Inventario de productos
- Precios de compra y venta
- Control de stock
- Códigos de barras

#### 12. **movimientos_inventario**
Registro de entradas/salidas de inventario
- Tipos: entrada, salida, ajuste
- Trazabilidad completa

#### 13. **ventas**
Registro de ventas realizadas
- Puede estar vinculada a una cita
- Métodos de pago
- Estados: pendiente, pagada, cancelada

#### 14. **ventas_detalles**
Detalles de cada venta (productos y servicios vendidos)

#### 15. **horarios_empleados**
Horario laboral semanal de cada empleado

#### 16. **dias_no_laborables**
Días festivos, vacaciones o ausencias
- Puede ser para todo el salón o para un empleado específico

#### 17. **configuracion**
Parámetros generales del sistema (clave-valor)

## Relaciones Principales

```
usuarios (1) -> (N) empleados
usuarios (1) -> (0..N) clientes
roles (1) -> (N) usuarios

clientes (1) -> (N) citas
empleados (1) -> (N) citas
empleados (N) <-> (N) servicios [a través de empleados_servicios]

citas (1) -> (N) citas_servicios
servicios (1) -> (N) citas_servicios

categorias_servicios (1) -> (N) servicios
categorias_productos (1) -> (N) productos

ventas (1) -> (N) ventas_detalles
ventas (0..1) -> (1) citas
clientes (1) -> (N) ventas
empleados (1) -> (N) ventas

productos (1) -> (N) movimientos_inventario
productos (1) -> (N) ventas_detalles
servicios (1) -> (N) ventas_detalles

empleados (1) -> (N) horarios_empleados
empleados (1) -> (N) dias_no_laborables
```

## Instalación

### MySQL/MariaDB

```bash
mysql -u root -p < schema.sql
```

### PostgreSQL (requiere adaptaciones)

El esquema actual está optimizado para MySQL. Para PostgreSQL necesitarás:
- Cambiar `AUTO_INCREMENT` por `SERIAL`
- Cambiar `ENUM` por `CHECK` constraints
- Ajustar tipos de datos específicos

## Datos Iniciales

El script incluye datos iniciales:
- 3 roles predefinidos (Administrador, Empleado, Cliente)
- 5 categorías de servicios
- 6 categorías de productos
- Configuración básica del sistema

## Características de Seguridad

- Passwords hasheados en la tabla usuarios
- Control de acceso basado en roles
- Soft delete mediante campo `activo` en tablas principales
- Integridad referencial con claves foráneas

## Índices

Se han creado índices en campos frecuentemente consultados:
- Búsqueda de clientes (teléfono, email)
- Filtrado de citas (fecha, estado)
- Búsqueda de productos (código de barras)
- Consultas de ventas (fecha, estado)

## Próximos Pasos

1. Crear un usuario administrador inicial
2. Configurar los parámetros del salón en la tabla `configuracion`
3. Agregar servicios al catálogo
4. Registrar empleados y sus horarios
5. Comenzar a registrar clientes y citas

## Notas Técnicas

- Todas las tablas usan timestamps para auditoría
- Los precios se almacenan con 2 decimales
- Las fechas y horas están separadas para facilitar consultas
- El sistema soporta múltiples métodos de pago
- Las citas pueden tener múltiples servicios
- Las ventas pueden ser independientes o estar vinculadas a citas
