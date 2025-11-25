import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../services/api'
import { AuthContext } from '../context/AuthContext'
import { ArrowLeft, Check, X, AlertCircle, CheckCircle } from 'lucide-react'

export default function ParkingDetail(){
  const { id } = useParams()
  const navigate = useNavigate()
  const [parking, setParking] = useState(null)
  const [loading, setLoading] = useState(true)
  const [reserving, setReserving] = useState(null)
  const [message, setMessage] = useState({ type: '', text: '' })
  const { user } = useContext(AuthContext)

  useEffect(() => {
    async function load(){
      try{
        setMessage({ type: '', text: '' })
        const res = await api.get(`/parkings/${id}`)
        setParking(res.data)
      }catch(err){
        console.error(err)
        setMessage({ type: 'error', text: 'Error cargando parking' })
      }finally{ 
        setLoading(false) 
      }
    }
    load()
  }, [id])

  async function reserve(spotId){
    if(!user){
      navigate('/login')
      return
    }
    
    setReserving(spotId)
    const from = new Date()
    const to = new Date()
    to.setHours(to.getHours() + 2)
    
    try{
      await api.post('/reservations', { spot: spotId, from, to })
      setMessage({ type: 'success', text: '✓ Reservado correctamente' })
      // refresh
      const res = await api.get(`/parkings/${id}`)
      setParking(res.data)
      setTimeout(() => setMessage({ type: '', text: '' }), 3000)
    }catch(err){
      console.error(err)
      setMessage({ type: 'error', text: err.response?.data?.msg || 'Error reservando' })
    }finally{
      setReserving(null)
    }
  }

  if(loading) return (
    <div className="text-center py-12">
      <div className="animate-pulse text-gray-400">Cargando...</div>
    </div>
  )
  
  if(!parking) return (
    <div className="text-center py-12 text-red-600">
      <AlertCircle size={48} className="mx-auto mb-4" />
      <p>Parking no encontrado</p>
    </div>
  )

  const stats = {
    available: parking.spots?.filter(s => s.status === 'available').length || 0,
    reserved: parking.spots?.filter(s => s.status === 'reserved').length || 0,
    occupied: parking.spots?.filter(s => s.status === 'occupied').length || 0,
  }

  return (
    <div>
      {/* Header */}
      <button 
        onClick={() => navigate('/parkings')}
        className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft size={20} />
        <span>Volver</span>
      </button>

      {/* Title */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl p-8 mb-8">
        <h1 className="text-4xl font-bold mb-2">{parking.name}</h1>
        <p className="text-blue-100">{parking.address}</p>
        <p className="text-blue-100 mt-2">{parking.description}</p>
      </div>

      {/* Message */}
      {message.text && (
        <div className={`mb-6 p-4 rounded-lg flex items-start space-x-3 ${
          message.type === 'success' 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-red-50 border border-red-200'
        }`}>
          {message.type === 'success' ? (
            <CheckCircle className="text-green-600 flex-shrink-0" size={20} />
          ) : (
            <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
          )}
          <p className={message.type === 'success' ? 'text-green-800' : 'text-red-800'}>
            {message.text}
          </p>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-green-600">{stats.available}</div>
          <div className="text-sm text-green-700 font-semibold">Disponibles</div>
        </div>
        <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-yellow-600">{stats.reserved}</div>
          <div className="text-sm text-yellow-700 font-semibold">Reservadas</div>
        </div>
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 text-center">
          <div className="text-3xl font-bold text-red-600">{stats.occupied}</div>
          <div className="text-sm text-red-700 font-semibold">Ocupadas</div>
        </div>
      </div>

      {/* Spots Grid */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Espacios de Parqueo</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {parking.spots.map(s => (
          <div 
            key={s._id} 
            className={`p-4 rounded-lg border-2 transition transform hover:scale-105 ${
              s.status === 'available' 
                ? 'border-green-400 bg-green-50 cursor-pointer hover:bg-green-100'
                : s.status === 'reserved'
                ? 'border-yellow-400 bg-yellow-50'
                : 'border-red-400 bg-red-50'
            }`}
          >
            <div className="text-center">
              <div className="font-bold text-lg text-gray-900 mb-2">{s.identifier}</div>
              <div className="text-xs text-gray-600 mb-3 capitalize">{s.type === 'car' ? '🚗 Auto' : '🏍️ Moto'}</div>
              
              {s.status === 'available' ? (
                <button 
                  onClick={() => reserve(s._id)}
                  disabled={reserving === s._id}
                  className="w-full bg-green-600 text-white py-1 rounded text-xs font-semibold hover:bg-green-700 transition disabled:bg-gray-400"
                >
                  {reserving === s._id ? '...' : 'Reservar'}
                </button>
              ) : (
                <div className="text-xs font-semibold py-1">
                  {s.status === 'reserved' ? '⏰ Reservada' : '❌ Ocupada'}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {parking.spots.length === 0 && (
        <div className="text-center py-12 text-gray-600">
          <p>No hay espacios en este parking</p>
        </div>
      )}
    </div>
  )
}
