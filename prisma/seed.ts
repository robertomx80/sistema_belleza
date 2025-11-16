import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...');

  // Limpiar datos existentes (opcional, comentar si no deseas limpiar)
  // await prisma.$executeRaw`TRUNCATE TABLE roles CASCADE`;

  // Crear roles
  console.log('📝 Creando roles...');
  const adminRole = await prisma.rol.upsert({
    where: { nombre: 'Administrador' },
    update: {},
    create: {
      nombre: 'Administrador',
      descripcion: 'Acceso completo al sistema',
    },
  });

  const empleadoRole = await prisma.rol.upsert({
    where: { nombre: 'Empleado' },
    update: {},
    create: {
      nombre: 'Empleado',
      descripcion: 'Puede gestionar citas y ventas',
    },
  });

  const clienteRole = await prisma.rol.upsert({
    where: { nombre: 'Cliente' },
    update: {},
    create: {
      nombre: 'Cliente',
      descripcion: 'Acceso limitado para ver citas y servicios',
    },
  });

  console.log('✅ Roles creados');

  // Crear usuario administrador por defecto
  console.log('👤 Creando usuario administrador...');
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const adminUser = await prisma.usuario.upsert({
    where: { email: 'admin@salon.com' },
    update: {},
    create: {
      email: 'admin@salon.com',
      passwordHash: hashedPassword,
      rolId: adminRole.id,
      activo: true,
    },
  });

  console.log('✅ Usuario administrador creado (email: admin@salon.com, password: admin123)');

  // Crear categorías de servicios
  console.log('🏷️ Creando categorías de servicios...');
  const categorias = await Promise.all([
    prisma.categoriaServicio.upsert({
      where: { id: 1 },
      update: {},
      create: {
        nombre: 'Cabello',
        descripcion: 'Servicios relacionados con el cabello',
        icono: 'scissors',
      },
    }),
    prisma.categoriaServicio.upsert({
      where: { id: 2 },
      update: {},
      create: {
        nombre: 'Uñas',
        descripcion: 'Manicure y pedicure',
        icono: 'hand',
      },
    }),
    prisma.categoriaServicio.upsert({
      where: { id: 3 },
      update: {},
      create: {
        nombre: 'Facial',
        descripcion: 'Tratamientos faciales',
        icono: 'face',
      },
    }),
    prisma.categoriaServicio.upsert({
      where: { id: 4 },
      update: {},
      create: {
        nombre: 'Masajes',
        descripcion: 'Servicios de masajes y relajación',
        icono: 'spa',
      },
    }),
    prisma.categoriaServicio.upsert({
      where: { id: 5 },
      update: {},
      create: {
        nombre: 'Maquillaje',
        descripcion: 'Servicios de maquillaje profesional',
        icono: 'makeup',
      },
    }),
  ]);

  console.log('✅ Categorías de servicios creadas');

  // Crear categorías de productos
  console.log('📦 Creando categorías de productos...');
  await Promise.all([
    prisma.categoriaProducto.upsert({
      where: { id: 1 },
      update: {},
      create: {
        nombre: 'Shampoos',
        descripcion: 'Productos para lavado de cabello',
      },
    }),
    prisma.categoriaProducto.upsert({
      where: { id: 2 },
      update: {},
      create: {
        nombre: 'Tintes',
        descripcion: 'Productos para coloración',
      },
    }),
    prisma.categoriaProducto.upsert({
      where: { id: 3 },
      update: {},
      create: {
        nombre: 'Tratamientos',
        descripcion: 'Tratamientos capilares',
      },
    }),
    prisma.categoriaProducto.upsert({
      where: { id: 4 },
      update: {},
      create: {
        nombre: 'Esmaltes',
        descripcion: 'Esmaltes para uñas',
      },
    }),
    prisma.categoriaProducto.upsert({
      where: { id: 5 },
      update: {},
      create: {
        nombre: 'Herramientas',
        descripcion: 'Herramientas y accesorios',
      },
    }),
    prisma.categoriaProducto.upsert({
      where: { id: 6 },
      update: {},
      create: {
        nombre: 'Cosméticos',
        descripcion: 'Productos de belleza y maquillaje',
      },
    }),
  ]);

  console.log('✅ Categorías de productos creadas');

  // Crear configuración inicial
  console.log('⚙️ Creando configuración inicial...');
  await Promise.all([
    prisma.configuracion.upsert({
      where: { clave: 'nombre_salon' },
      update: {},
      create: {
        clave: 'nombre_salon',
        valor: 'Mi Salón de Belleza',
        descripcion: 'Nombre del salón',
      },
    }),
    prisma.configuracion.upsert({
      where: { clave: 'telefono' },
      update: {},
      create: {
        clave: 'telefono',
        valor: '',
        descripcion: 'Teléfono de contacto',
      },
    }),
    prisma.configuracion.upsert({
      where: { clave: 'direccion' },
      update: {},
      create: {
        clave: 'direccion',
        valor: '',
        descripcion: 'Dirección del salón',
      },
    }),
    prisma.configuracion.upsert({
      where: { clave: 'email' },
      update: {},
      create: {
        clave: 'email',
        valor: '',
        descripcion: 'Email de contacto',
      },
    }),
    prisma.configuracion.upsert({
      where: { clave: 'moneda' },
      update: {},
      create: {
        clave: 'moneda',
        valor: 'USD',
        descripcion: 'Moneda utilizada',
      },
    }),
    prisma.configuracion.upsert({
      where: { clave: 'impuesto_porcentaje' },
      update: {},
      create: {
        clave: 'impuesto_porcentaje',
        valor: '0',
        descripcion: 'Porcentaje de impuesto aplicado',
      },
    }),
    prisma.configuracion.upsert({
      where: { clave: 'duracion_cita_default' },
      update: {},
      create: {
        clave: 'duracion_cita_default',
        valor: '30',
        descripcion: 'Duración por defecto de citas en minutos',
      },
    }),
    prisma.configuracion.upsert({
      where: { clave: 'hora_apertura' },
      update: {},
      create: {
        clave: 'hora_apertura',
        valor: '09:00',
        descripcion: 'Hora de apertura',
      },
    }),
    prisma.configuracion.upsert({
      where: { clave: 'hora_cierre' },
      update: {},
      create: {
        clave: 'hora_cierre',
        valor: '19:00',
        descripcion: 'Hora de cierre',
      },
    }),
  ]);

  console.log('✅ Configuración inicial creada');
  console.log('');
  console.log('🎉 Seed completado exitosamente!');
  console.log('');
  console.log('📋 Resumen:');
  console.log('   - Roles: 3 (Administrador, Empleado, Cliente)');
  console.log('   - Usuario Admin: admin@salon.com / admin123');
  console.log('   - Categorías de Servicios: 5');
  console.log('   - Categorías de Productos: 6');
  console.log('   - Configuración: 9 parámetros');
}

main()
  .catch((e) => {
    console.error('❌ Error durante el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
