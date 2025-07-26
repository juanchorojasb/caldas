import { Phone, Mail, MessageCircle, MapPin, Globe, Facebook, Instagram, Clock } from 'lucide-react'

interface StoreContactProps {
  store: {
    name: string
    phone?: string | null
    email?: string | null
    whatsapp?: string | null
    address?: string | null
    city?: string | null
    website?: string | null
    facebook?: string | null
    instagram?: string | null
  }
}

export function StoreContact({ store }: StoreContactProps) {
  const hasContactInfo = store.phone || store.email || store.whatsapp || store.address || store.website || store.facebook || store.instagram

  if (!hasContactInfo) {
    return null
  }

  const formatPhoneForWhatsApp = (phone: string) => {
    return phone.replace(/[^\d]/g, '')
  }

  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 border-t py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Conecta con {store.name}
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            ¿Tienes preguntas sobre nuestros productos? ¡No dudes en contactarnos!
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Información de contacto directa */}
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h4 className="font-bold text-gray-900 mb-6 text-lg flex items-center">
              <Phone className="h-5 w-5 text-green-500 mr-2" />
              Contacto directo
            </h4>
            
            <div className="space-y-4">
              {store.phone && (
                
                  href={`tel:${store.phone}`}
                  className="flex items-center space-x-3 text-gray-600 hover:text-green-600 transition-colors p-3 rounded-lg hover:bg-green-50"
                >
                  <Phone className="h-5 w-5 text-green-500" />
                  <div>
                    <div className="font-medium">{store.phone}</div>
                    <div className="text-sm text-gray-500">Llamar ahora</div>
                  </div>
                </a>
              )}
              
              {store.email && (
                
                  href={`mailto:${store.email}`}
                  className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors p-3 rounded-lg hover:bg-blue-50"
                >
                  <Mail className="h-5 w-5 text-blue-500" />
                  <div>
                    <div className="font-medium text-sm">{store.email}</div>
                    <div className="text-sm text-gray-500">Enviar email</div>
                  </div>
                </a>
              )}
              
              {store.whatsapp && (
                
                  href={`https://wa.me/${formatPhoneForWhatsApp(store.whatsapp)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-600 hover:text-green-600 transition-colors p-3 rounded-lg hover:bg-green-50"
                >
                  <MessageCircle className="h-5 w-5 text-green-500" />
                  <div>
                    <div className="font-medium">WhatsApp</div>
                    <div className="text-sm text-gray-500">Chat directo</div>
                  </div>
                </a>
              )}
            </div>
          </div>
          
          {/* Ubicación */}
          {(store.address || store.city) && (
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h4 className="font-bold text-gray-900 mb-6 text-lg flex items-center">
                <MapPin className="h-5 w-5 text-red-500 mr-2" />
                Nuestra ubicación
              </h4>
              
              <div className="flex items-start space-x-3 text-gray-600 p-3 rounded-lg bg-gray-50">
                <MapPin className="h-5 w-5 mt-1 text-red-500 flex-shrink-0" />
                <div>
                  {store.address && <p className="font-medium mb-1">{store.address}</p>}
                  {store.city && <p className="text-sm text-gray-500">{store.city}, Caldas</p>}
                </div>
              </div>
              
              <div className="mt-4 flex items-center space-x-2 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                <span>Horarios de atención por confirmar</span>
              </div>
            </div>
          )}
          
          {/* Redes sociales y web */}
          {(store.website || store.facebook || store.instagram) && (
            <div className="bg-white rounded-xl p-6 shadow-md">
              <h4 className="font-bold text-gray-900 mb-6 text-lg flex items-center">
                <Globe className="h-5 w-5 text-blue-500 mr-2" />
                Síguenos en línea
              </h4>
              
              <div className="space-y-4">
                {store.website && (
                  
                    href={store.website.startsWith('http') ? store.website : `https://${store.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors p-3 rounded-lg hover:bg-blue-50"
                  >
                    <Globe className="h-5 w-5 text-blue-500" />
                    <div>
                      <div className="font-medium">Sitio web</div>
                      <div className="text-sm text-gray-500">Visitar página</div>
                    </div>
                  </a>
                )}
                
                {store.facebook && (
                  
                    href={store.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors p-3 rounded-lg hover:bg-blue-50"
                  >
                    <Facebook className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium">Facebook</div>
                      <div className="text-sm text-gray-500">Seguir página</div>
                    </div>
                  </a>
                )}
                
                {store.instagram && (
                  
                    href={store.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-gray-600 hover:text-pink-600 transition-colors p-3 rounded-lg hover:bg-pink-50"
                  >
                    <Instagram className="h-5 w-5 text-pink-600" />
                    <div>
                      <div className="font-medium">Instagram</div>
                      <div className="text-sm text-gray-500">Ver fotos</div>
                    </div>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Botón de contacto destacado */}
        <div className="mt-12 text-center">
          <button
            onClick={() => {
              const message = `Hola! Me interesa conocer más sobre ${store.name} y sus productos 🛍️`
              const phone = store.whatsapp || store.phone
              if (phone) {
                const whatsappUrl = `https://wa.me/${formatPhoneForWhatsApp(phone)}?text=${encodeURIComponent(message)}`
                window.open(whatsappUrl, '_blank')
              }
            }}
            className="bg-gradient-to-r from-green-600 to-green-700 text-white px-10 py-4 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 text-lg font-semibold shadow-lg mx-auto"
          >
            <MessageCircle className="h-6 w-6" />
            <span>Contactar por WhatsApp</span>
          </button>
          <p className="text-sm text-gray-500 mt-3">
            Te responderemos lo más pronto posible
          </p>
        </div>
      </div>
    </div>
  )
}
