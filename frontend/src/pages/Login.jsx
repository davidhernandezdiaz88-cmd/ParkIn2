import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { Mail, Lock, AlertCircle, CheckCircle } from 'lucide-react'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  async function handleSubmit(e){
    e.preventDefault()
    setError('')
    setSuccess('')
    
    if(!email || !password){
      setError('Por favor completa todos los campos')
      return
    }
    
    setLoading(true)
    try{
      await login(email, password)
      setSuccess('¡Iniciando sesión...')
      setTimeout(() => navigate('/dashboard'), 500)
    }catch(err){
      setError(err.response?.data?.msg || 'Error autenticando. Verifica tus credenciales.')
    }finally{ 
      setLoading(false) 
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">ParkIn</h1>
          <p className="text-center text-gray-600 mb-8">Inicia sesión o regístrate</p>

          {/* Error Alert */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
              <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          {/* Success Alert */}
          {success && (
            <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start space-x-3">
              <CheckCircle className="text-green-600 flex-shrink-0" size={20} />
              <p className="text-green-800 text-sm">{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
                <input 
                  value={email} 
                  onChange={e => setEmail(e.target.value)}
                  type="email"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                <input 
                  value={password} 
                  onChange={e => setPassword(e.target.value)}
                  type="password"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Submit */}
            <button 
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center mb-3 font-semibold">Credenciales de Demo:</p>
            <div className="space-y-2 text-sm text-gray-700 bg-gray-50 p-3 rounded">
              <div>
                <p className="font-semibold">Admin:</p>
                <p>📧 admin@parkin.local</p>
                <p>🔑 admin123</p>
              </div>
              <div className="pt-2 border-t border-gray-200">
                <p className="font-semibold">Usuario:</p>
                <p>📧 user@parkin.local</p>
                <p>🔑 user123</p>
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-gray-600 mt-6">
            ¿No tienes cuenta? 
            <button 
              onClick={() => alert('Registra un nuevo usuario con el formulario anterior')}
              className="text-blue-600 hover:underline font-semibold"
            >
              {' '}Contacta al admin
            </button>
          </p>
        </div>

        {/* Info Box */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
          <p className="font-semibold">💡 Tip:</p>
          <p>Usa las credenciales de demo para probar la app. Si necesitas crear un usuario, usa el formulario de login.</p>
        </div>
      </div>
    </div>
  )
}
