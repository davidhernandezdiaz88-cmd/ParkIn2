import React, { useEffect, useState } from 'react'
import api from '../services/api'
import { Calendar, MapPin, Clock, AlertCircle, Loader } from 'lucide-react'

export default function Reservations(){
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load(){
      try{
        setError('')
        const res = await api.get('/reservations/my')
        setList(res.data)
      }catch(err){
        console.error(err)
        setError('Error cargando reservas')
      }finally{ 
        setLoading(false) 
      }
    }
    load()
  }, [])

  if(loading) return (
    <div className="flex justify-center items-center py-12">
      <Loader className="animate-spin text-blue-600" size={32} />
    </div>
  )

  if(error) return (
    <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg">
      <AlertCircle className="inline mr-2" size={20} />
      {error}
    </div>
  )

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Mis Reservas</h1>

      {list.length === 0 ? (
        <div className="text-center py-12">
          <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-lg text-gray-600">No tienes reservas aún</p>
          <p className="text-sm text-gray-500">Dirígete a Parkings para hacer una reserva</p>
        </div>
      ) : (
        <div className="space-y-4">
          {list.map(r => (
            <div 
              key={r._id} 
              className={`bg-white rounded-xl shadow-md p-6 border-l-4 ${
                r.status === 'active' 
                  ? 'border-l-green-600' 
                  : r.status === 'completed'
                  ? 'border-l-blue-600'
                  : 'border-l-red-600'
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Spot Info */}
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Espacio</p>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-bold text-gray-900">{r.spot?.identifier}</span>
                    <span className="text-sm text-gray-600">
                      {r.spot?.type === 'car' ? '🚗' : '🏍️'}
                    </span>
                  </div>
                </div>

                {/* Date Info */}
                <div className="md:col-span-1">
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Desde</p>
                      <div className="flex items-center space-x-2 text-gray-900">
                        <Calendar size={16} />
                        <span className="font-medium">
                          {new Date(r.from).toLocaleDateString('es-ES', { 
                            month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                          })}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase mb-1">Hasta</p>
                      <div className="flex items-center space-x-2 text-gray-900">
                        <Clock size={16} />
                        <span className="font-medium">
                          {new Date(r.to).toLocaleDateString('es-ES', { 
                            month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center justify-between md:justify-end">
                  <div className="text-right">
                    <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Estado</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                      r.status === 'active' 
                        ? 'bg-green-100 text-green-800'
                        : r.status === 'completed'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {r.status === 'active' ? '✓ Activa' : r.status === 'completed' ? '✔ Completada' : '✕ Cancelada'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
