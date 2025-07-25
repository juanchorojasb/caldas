'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { CheckCircle, Clock, XCircle, Users, DollarSign, Eye, Check, X } from 'lucide-react'

interface UserData {
  id: string
  email: string
  name: string
  createdAt: string
  selectedPlan?: string
  paymentStatus?: string
  paymentDate?: string
  paymentMethod?: string
}

const plansInfo = {
  plan_a: { name: 'Plan Básico', price: 20000, color: 'bg-gray-100' },
  plan_b: { name: 'Plan Profesional', price: 50000, color: 'bg-blue-100' },
  plan_c: { name: 'Plan Premium', price: 120000, color: 'bg-yellow-100' }
}

export default function AdminPage() {
  const { user } = useUser()
  const [users, setUsers] = useState<UserData[]>([])
  const [stats, setStats] = useState({
    totalUsers: 0,
    pendingPayments: 0,
    approvedUsers: 0,
    totalRevenue: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSubscriptions()
  }, [])

  const fetchSubscriptions = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/subscriptions')
      const data = await response.json()
      
      if (data.success) {
        const subscriptions = data.subscriptions
        
        setUsers(subscriptions.map((sub: any) => ({
          id: sub.userId,
          email: sub.email,
          name: sub.name || 'Sin nombre',
          createdAt: sub.createdAt,
          selectedPlan: sub.selectedPlan,
          paymentStatus: sub.paymentStatus,
          paymentDate: sub.paymentDate,
          paymentMethod: sub.paymentMethod
        })))
        
        setStats({
          totalUsers: subscriptions.length,
          pendingPayments: subscriptions.filter((s: any) => s.paymentStatus === 'sent').length,
          approvedUsers: subscriptions.filter((s: any) => s.paymentStatus === 'approved').length,
          totalRevenue: subscriptions
            .filter((s: any) => s.paymentStatus === 'approved')
            .reduce((sum: number, s: any) => {
              const plan = plansInfo[s.selectedPlan as keyof typeof plansInfo]
              return sum + (plan?.price || 0)
            }, 0)
        })
      }
    } catch (error) {
      console.error('Error al cargar suscripciones:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApprovePayment = async (userId: string) => {
    try {
      const response = await fetch('/api/admin/subscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          subscriptionUserId: userId,
          action: 'approve'
        })
      })
      
      if (response.ok) {
        alert('Pago aprobado exitosamente')
        fetchSubscriptions() // Recargar datos
      } else {
        alert('Error al aprobar pago')
      }
    } catch (error) {
      alert('Error al aprobar pago')
    }
  }

  const handleRejectPayment = async (userId: string) => {
    try {
      const response = await fetch('/api/admin/subscriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          subscriptionUserId: userId,
          action: 'reject'
        })
      })
      
      if (response.ok) {
        alert('Pago rechazado')
        fetchSubscriptions() // Recargar datos
      } else {
        alert('Error al rechazar pago')
      }
    } catch (error) {
      alert('Error al rechazar pago')
    }
  }

  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'pending':
        return <span className="flex items-center gap-1 text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full text-xs">
          <Clock className="w-3 h-3" /> Pendiente
        </span>
      case 'sent':
        return <span className="flex items-center gap-1 text-blue-700 bg-blue-100 px-2 py-1 rounded-full text-xs">
          <Clock className="w-3 h-3" /> Enviado
        </span>
      case 'approved':
        return <span className="flex items-center gap-1 text-green-700 bg-green-100 px-2 py-1 rounded-full text-xs">
          <CheckCircle className="w-3 h-3" /> Aprobado
        </span>
      case 'rejected':
        return <span className="flex items-center gap-1 text-red-700 bg-red-100 px-2 py-1 rounded-full text-xs">
          <XCircle className="w-3 h-3" /> Rechazado
        </span>
      default:
        return <span className="text-gray-500 text-xs">Sin plan</span>
    }
  }

  // Verificar si el usuario es admin (simplificado para testing)
  if (false) { // Deshabilitar verificación para testing
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Acceso Denegado</h1>
          <p className="text-gray-600">No tienes permisos de administrador</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando panel de administrador...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Panel de Administrador</h1>
          <p className="text-gray-600">Gestiona usuarios, pagos y suscripciones</p>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Usuarios</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pagos Pendientes</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingPayments}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Usuarios Activos</p>
                <p className="text-2xl font-bold text-gray-900">{stats.approvedUsers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center">
              <DollarSign className="w-8 h-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Ingresos</p>
                <p className="text-2xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString('es-CO')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabla de usuarios */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Usuarios Registrados</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Usuario
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Plan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado Pago
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Método
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                      No hay usuarios registrados aún
                    </td>
                  </tr>
                ) : (
                  users.map((userData) => {
                    const plan = plansInfo[userData.selectedPlan as keyof typeof plansInfo]
                    return (
                      <tr key={userData.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{userData.name}</div>
                            <div className="text-sm text-gray-500">{userData.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {plan ? (
                            <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${plan.color}`}>
                              {plan.name} - ${plan.price.toLocaleString('es-CO')}
                            </div>
                          ) : (
                            <span className="text-gray-400 text-sm">Sin plan</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(userData.paymentStatus)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {userData.paymentMethod || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {userData.paymentDate ? new Date(userData.paymentDate).toLocaleDateString('es-CO') : '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {userData.paymentStatus === 'sent' && (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleApprovePayment(userData.id)}
                                className="bg-green-100 text-green-700 hover:bg-green-200 px-3 py-1 rounded-full text-xs flex items-center gap-1"
                              >
                                <Check className="w-3 h-3" />
                                Aprobar
                              </button>
                              <button
                                onClick={() => handleRejectPayment(userData.id)}
                                className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-1 rounded-full text-xs flex items-center gap-1"
                              >
                                <X className="w-3 h-3" />
                                Rechazar
                              </button>
                            </div>
                          )}
                          {userData.paymentStatus === 'approved' && (
                            <span className="text-green-600 text-xs">✓ Activo</span>
                          )}
                          {userData.paymentStatus === 'rejected' && (
                            <span className="text-red-600 text-xs">✗ Rechazado</span>
                          )}
                          {userData.paymentStatus === 'pending' && (
                            <span className="text-yellow-600 text-xs">⏳ Esperando</span>
                          )}
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
