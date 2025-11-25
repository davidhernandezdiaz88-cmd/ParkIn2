import React, { useEffect, useState } from 'react'
import api from '../services/api'
import { Link } from 'react-router-dom'
import { MapPin, ChevronRight, Loader } from 'lucide-react'

export default function Parkings(){
  const [parkings, setParkings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load(){
      try{
        setError('')
        const res = await api.get('/parkings')
        setParkings(res.data)
      }catch(err){
        console.error(err)
        setError('Error cargando parkings')
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
    <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg text-center">
      {error}
    </div>
  )

  if(parkings.length === 0) return (
    <div className="text-center py-12 text-gray-600">
      <MapPin size={48} className="mx-auto mb-4 text-gray-400" />
      <p className="text-lg">No hay parkings disponibles</p>
    </div>
  )

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Parkings Disponibles</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {parkings.map(p => (
          <Link 
            key={p._id} 
            to={`/parkings/${p._id}`}
            className="bg-white rounded-xl shadow hover:shadow-lg transition transform hover:scale-105 overflow-hidden"
          >
            {/* Card Header */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-24 flex items-center px-6">
              <div>
                <h3 className="text-2xl font-bold text-white">{p.name}</h3>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6">
              <div className="flex items-start space-x-2 mb-3 text-gray-700">
                <MapPin size={18} className="flex-shrink-0 mt-1 text-blue-600" />
                <div>
                  <p className="text-sm font-semibold">Ubicación</p>
                  <p className="text-sm">{p.address || 'No especificada'}</p>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {p.description || 'Sin descripción'}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <span className="text-sm font-semibold text-blue-600">Ver detalles</span>
                <ChevronRight size={20} className="text-gray-400" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
