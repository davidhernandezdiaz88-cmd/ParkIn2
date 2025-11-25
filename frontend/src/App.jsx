import React, { useContext } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { ParkingCircle, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Parkings from './pages/Parkings'
import ParkingDetail from './pages/ParkingDetail'
import Reservations from './pages/Reservations'
import { AuthProvider, AuthContext } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

function Nav(){
  const { user, logout } = useContext(AuthContext)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 font-bold text-2xl text-white">
          <ParkingCircle size={28} />
          <span>ParkIn</span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-1">
          <NavLink to="/parkings" isActive={isActive('/parkings')}>Parkings</NavLink>
          {user && (
            <>
              <NavLink to="/dashboard" isActive={isActive('/dashboard')}>Dashboard</NavLink>
              <NavLink to="/reservations" isActive={isActive('/reservations')}>Reservas</NavLink>
            </>
          )}
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-white text-sm">{user.name}</span>
              <button 
                onClick={logout}
                className="flex items-center space-x-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded transition"
              >
                <LogOut size={18} />
                <span>Salir</span>
              </button>
            </>
          ) : (
            <Link to="/login" className="bg-white text-blue-600 px-4 py-2 rounded font-semibold hover:bg-gray-100 transition">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-blue-700 px-4 py-3 space-y-2">
          <MobileLink to="/parkings" onClick={() => setMobileOpen(false)}>Parkings</MobileLink>
          {user && (
            <>
              <MobileLink to="/dashboard" onClick={() => setMobileOpen(false)}>Dashboard</MobileLink>
              <MobileLink to="/reservations" onClick={() => setMobileOpen(false)}>Reservas</MobileLink>
            </>
          )}
          <div className="pt-2 border-t border-blue-600">
            {user ? (
              <button 
                onClick={() => { logout(); setMobileOpen(false); }}
                className="w-full flex items-center space-x-2 bg-red-600 text-white px-3 py-2 rounded text-left"
              >
                <LogOut size={18} />
                <span>Salir ({user.name})</span>
              </button>
            ) : (
              <Link to="/login" className="block bg-white text-blue-600 px-3 py-2 rounded font-semibold text-center">
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

function NavLink({ to, isActive, children }){
  return (
    <Link 
      to={to} 
      className={`px-3 py-2 rounded transition ${isActive ? 'bg-blue-400 text-white' : 'text-blue-100 hover:bg-blue-500 hover:text-white'}`}
    >
      {children}
    </Link>
  )
}

function MobileLink({ to, onClick, children }){
  return (
    <Link to={to} onClick={onClick} className="block text-white hover:bg-blue-600 px-3 py-2 rounded">
      {children}
    </Link>
  )
}

export default function App(){
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Nav />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/parkings" element={<Parkings />} />
            <Route path="/parkings/:id" element={<ParkingDetail />} />
            <Route path="/reservations" element={<ProtectedRoute><Reservations /></ProtectedRoute>} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  )
}

function HomePage(){
  return (
    <div className="text-center py-12">
      <ParkingCircle size={64} className="mx-auto text-blue-600 mb-4" />
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Bienvenido a ParkIn</h1>
      <p className="text-lg text-gray-600 mb-6">Gestión inteligente de parqueaderos residenciales</p>
      <div className="space-y-3 text-gray-700 max-w-2xl mx-auto">
        <p>✨ Reserva espacios de forma rápida y sencilla</p>
        <p>📍 Encuentra parkings disponibles cerca de ti</p>
        <p>🔐 Seguridad con autenticación de usuarios</p>
      </div>
      <Link to="/parkings" className="mt-8 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
        Explora Parkings
      </Link>
    </div>
  )
}
