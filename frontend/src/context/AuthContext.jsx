import React, { createContext, useState, useEffect } from 'react'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext()

export function AuthProvider({ children }){
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('parkin_token')
    const raw = localStorage.getItem('parkin_user')
    if(token && raw){
      try{
        setUser(JSON.parse(raw))
      }catch(e){
        localStorage.removeItem('parkin_user')
      }
    }
  }, [])

  async function login(email, password){
    const res = await api.post('/auth/login', { email, password })
    const { token, user } = res.data
    localStorage.setItem('parkin_token', token)
    localStorage.setItem('parkin_user', JSON.stringify(user))
    setUser(user)
    return user
  }

  function logout(){
    localStorage.removeItem('parkin_token')
    localStorage.removeItem('parkin_user')
    setUser(null)
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
