import Layout from '../../components/layout/Layout';
import { Calendar, Plus, Search } from 'lucide-react';

export default function CitasPage() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Citas</h1>
            <p className="text-gray-600">Administra las citas del salón</p>
          </div>
          <button className="btn btn-primary flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Nueva Cita
          </button>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar citas..."
              className="input pl-10"
            />
          </div>
        </div>

        {/* Calendar View Placeholder */}
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Vista de calendario</p>
          <p className="text-sm text-gray-500 mt-1">Aquí se mostrará el calendario de citas</p>
        </div>
      </div>
    </Layout>
  );
}
