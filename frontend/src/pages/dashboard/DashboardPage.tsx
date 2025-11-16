import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  DollarSign,
  Calendar,
  Users,
  Scissors,
  TrendingUp,
  Clock
} from 'lucide-react';
import Layout from '../../components/layout/Layout';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  trend?: string;
  color: string;
}

function StatCard({ title, value, icon: Icon, trend, color }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
            <TrendingUp className="w-4 h-4" />
            <span>{trend}</span>
          </div>
        )}
      </div>
      <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    ventasHoy: 0,
    ventasMes: 0,
    citasHoy: 0,
    citasPendientes: 0,
    clientesTotal: 0,
    serviciosActivos: 0,
  });

  useEffect(() => {
    // Aquí harías la llamada al API para obtener las estadísticas
    // Por ahora usamos datos de ejemplo
    setStats({
      ventasHoy: 1250.50,
      ventasMes: 28500.00,
      citasHoy: 8,
      citasPendientes: 12,
      clientesTotal: 145,
      serviciosActivos: 24,
    });
  }, []);

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            ¡Bienvenido, {user?.nombre}! 👋
          </h1>
          <p className="text-gray-600">
            Aquí está el resumen de tu salón de belleza
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            title="Ventas de Hoy"
            value={`$${stats.ventasHoy.toFixed(2)}`}
            icon={DollarSign}
            trend="+12%"
            color="bg-gradient-to-br from-green-500 to-green-600"
          />
          <StatCard
            title="Ventas del Mes"
            value={`$${stats.ventasMes.toFixed(2)}`}
            icon={TrendingUp}
            trend="+8%"
            color="bg-gradient-to-br from-blue-500 to-blue-600"
          />
          <StatCard
            title="Citas Hoy"
            value={stats.citasHoy}
            icon={Calendar}
            color="bg-gradient-to-br from-purple-500 to-purple-600"
          />
          <StatCard
            title="Citas Pendientes"
            value={stats.citasPendientes}
            icon={Clock}
            color="bg-gradient-to-br from-orange-500 to-orange-600"
          />
          <StatCard
            title="Total Clientes"
            value={stats.clientesTotal}
            icon={Users}
            trend="+5%"
            color="bg-gradient-to-br from-pink-500 to-pink-600"
          />
          <StatCard
            title="Servicios Activos"
            value={stats.serviciosActivos}
            icon={Scissors}
            color="bg-gradient-to-br from-indigo-500 to-indigo-600"
          />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Acciones Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center gap-3 p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-primary-500 hover:bg-primary-50 transition-all">
              <Calendar className="w-6 h-6 text-primary-600" />
              <div className="text-left">
                <p className="font-semibold text-gray-900">Nueva Cita</p>
                <p className="text-sm text-gray-600">Agendar una cita</p>
              </div>
            </button>
            <button className="flex items-center gap-3 p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-primary-500 hover:bg-primary-50 transition-all">
              <Users className="w-6 h-6 text-primary-600" />
              <div className="text-left">
                <p className="font-semibold text-gray-900">Nuevo Cliente</p>
                <p className="text-sm text-gray-600">Registrar cliente</p>
              </div>
            </button>
            <button className="flex items-center gap-3 p-4 rounded-lg border-2 border-dashed border-gray-300 hover:border-primary-500 hover:bg-primary-50 transition-all">
              <DollarSign className="w-6 h-6 text-primary-600" />
              <div className="text-left">
                <p className="font-semibold text-gray-900">Nueva Venta</p>
                <p className="text-sm text-gray-600">Registrar venta</p>
              </div>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Actividad Reciente</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-primary-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Nueva cita agendada</p>
                  <p className="text-sm text-gray-600">María García - Corte y peinado</p>
                </div>
                <span className="text-sm text-gray-500">Hace 10 min</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
