import Layout from '../../components/layout/Layout';
import { Scissors, Plus, Search } from 'lucide-react';

export default function ServiciosPage() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Servicios</h1>
            <p className="text-gray-600">Administra los servicios del salón</p>
          </div>
          <button className="btn btn-primary flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Nuevo Servicio
          </button>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar servicios..."
              className="input pl-10"
            />
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Empty State */}
          <div className="col-span-full bg-white rounded-xl shadow-md p-12 text-center">
            <Scissors className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">No hay servicios registrados</p>
            <p className="text-sm text-gray-500 mt-1">Comienza agregando tus servicios</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
