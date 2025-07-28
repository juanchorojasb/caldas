import Image from 'next/image'
import { MapPin, Globe, Phone, Mail, Shield } from 'lucide-react'

interface StoreHeaderProps {
  store: {
    name: string
    description?: string | null
    logo?: string | null
    banner?: string | null
    city?: string | null
    department?: string | null
    website?: string | null
    phone?: string | null
    email?: string | null
    isVerified?: boolean
    user: {
      firstName?: string | null
      lastName?: string | null
    }
  }
}

export function StoreHeader({ store }: StoreHeaderProps) {
  return (
    <div className="bg-white shadow-sm border-b">
      {/* Banner de la tienda */}
      {store.banner && (
        <div className="h-48 md:h-64 relative overflow-hidden">
          <Image
            src={store.banner}
            alt={`Banner de ${store.name}`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-20" />
        </div>
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6">
          <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
            {/* Logo de la tienda */}
            <div className="flex-shrink-0 mb-4 md:mb-0 relative">
              {store.logo ? (
                <div className="relative">
                  <Image
                    src={store.logo}
                    alt={`Logo de ${store.name}`}
                    width={120}
                    height={120}
                    className="rounded-full border-4 border-white shadow-lg"
                  />
                  {store.isVerified && (
                    <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2">
                      <Shield className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
              ) : (
                <div className="relative">
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white text-2xl md:text-3xl font-bold shadow-lg">
                    {store.name.charAt(0).toUpperCase()}
                  </div>
                  {store.isVerified && (
                    <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2">
                      <Shield className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Información de la tienda */}
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {store.name}
                </h1>
                {store.isVerified && (
                  <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                    <Shield className="h-4 w-4" />
                    <span>Verificado</span>
                  </div>
                )}
              </div>
              
              {store.description && (
                <p className="text-lg text-gray-600 mb-4 leading-relaxed">
                  {store.description}
                </p>
              )}
              
              {/* Información de contacto y ubicación */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-500">
                <div className="space-y-2">
                  {store.city && (
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-green-500" />
                      <span>{store.city}, {store.department}</span>
                    </div>
                  )}
                  
                  {store.website && (
                    <div className="flex items-center space-x-2">
                      <Globe className="h-4 w-4 text-blue-500" />
                      <a 
                        href={store.website.startsWith('http') ? store.website : `https://${store.website}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        Sitio web
                      </a>
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  {store.phone && (
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-green-500" />
                      <a 
                        href={`tel:${store.phone}`}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        {store.phone}
                      </a>
                    </div>
                  )}
                  
                  {store.email && (
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-blue-500" />
                      <a 
                        href={`mailto:${store.email}`}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        Contactar por email
                      </a>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Propietario */}
              {(store.user.firstName || store.user.lastName) && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    <span className="font-medium text-gray-700">Propietario:</span>{' '}
                    {store.user.firstName} {store.user.lastName}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
