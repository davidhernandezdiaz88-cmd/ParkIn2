import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import api from '../services/api'
import { BarChart3, Users, ParkingCircle, Calendar } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Dashboard(){
  const { user } = useContext(AuthContext)
  const [stats, setStats] = useState({
    parkings: 0,
    myReservations: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load(){
      try{
        const [parkingsRes, revsRes] = await Promise.all([
          api.get('/parkings'),
          api.get('/reservations/my')
        ])
        setStats({
          parkings: parkingsRes.data.length,
          myReservations: revsRes.data.length,
        })
      }catch(err){
        console.error(err)
      }finally{
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div>
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">¡Bienvenido, {user?.name}!</h1>
        <p className="text-gray-600">Aquí está tu resumen de actividad en ParkIn</p>
      </div>

      {/* Stats Grid */}
      {loading ? (
        <div className="text-center py-12 text-gray-500">Cargando...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Parkings Stat */}
            <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-t-blue-600">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold mb-1">PARKINGS</p>
                  <p className="text-4xl font-bold text-gray-900">{stats.parkings}</p>
                </div>
                <ParkingCircle className="text-blue-600" size={48} />
              </div>
            </div>

            {/* My Reservations Stat */}
            <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-t-green-600">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold mb-1">MIS RESERVAS</p>
                  <p className="text-4xl font-bold text-gray-900">{stats.myReservations}</p>
                </div>
                <Calendar className="text-green-600" size={48} />
              </div>
            </div>

            {/* User Role Stat */}
            <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-t-purple-600">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold mb-1">TIPO DE USUARIO</p>
                  <p className="text-2xl font-bold text-gray-900 capitalize">
                    {user?.role === 'admin' ? '👨‍💼 Administrador' : '👤 Residente'}
                  </p>
                </div>
                <Users className="text-purple-600" size={48} />
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Acciones Rápidas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link 
                to="/parkings"
                className="bg-white rounded-lg p-4 shadow hover:shadow-lg transition transform hover:scale-105"
              >
                <div className="flex items-center space-x-4">
                  <ParkingCircle className="text-blue-600" size={32} />
                  <div>
                    <p className="font-semibold text-gray-900">Ver Parkings</p>
                    <p className="text-sm text-gray-600">Explora espacios disponibles</p>
                  </div>
                </div>
              </Link>

              <Link 
                to="/reservations"
                className="bg-white rounded-lg p-4 shadow hover:shadow-lg transition transform hover:scale-105"
              >
                <div className="flex items-center space-x-4">
                  <Calendar className="text-green-600" size={32} />
                  <div>
                    <p className="font-semibold text-gray-900">Mis Reservas</p>
                    <p className="text-sm text-gray-600">Gestiona tus espacios</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
            <p className="text-blue-900">
              <span className="font-semibold">💡 Tip:</span> Visita la sección de Parkings para descubrir espacios disponibles y hacer tus reservas.
            </p>
          </div>
        </>
      )}
    </div>
  )
}
