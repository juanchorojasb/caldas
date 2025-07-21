import React from 'react';
import { Heart, MessageCircle, Share2, Bookmark, Search, MapPin, Users, BookOpen, ShoppingBag, Play, ArrowRight } from 'lucide-react';

const HomePage = () => {
  const feedPosts = [
    {
      id: 1,
      vendor: {
        name: "Café del Ruiz",
        avatar: "/api/placeholder/40/40",
        location: "Neira, Caldas",
        verified: true
      },
      images: ["/api/placeholder/400/400"],
      description: "☕ Café especial 100% caldense de altura. Tostado artesanal con notas a chocolate y caramelo. ¡El sabor auténtico de nuestras montañas! 🌄 #CaféCaldense",
      price: "25.000",
      originalPrice: "30.000",
      likes: 445,
      comments: 28,
      category: "Agricultura y Café",
      categoryIcon: "☕",
      timeAgo: "2h",
      isService: false
    },
    {
      id: 2,
      vendor: {
        name: "Artesanías Manizales",
        avatar: "/api/placeholder/40/40",
        location: "Manizales, Caldas", 
        verified: true
      },
      images: ["/api/placeholder/400/400"],
      description: "🧶 Hermosos tejidos en lana virgen hechos a mano por artesanas caldenses. Perfectos para el clima de nuestra bella región. Cada pieza es única y cuenta una historia ❄️",
      price: "85.000",
      likes: 234,
      comments: 12,
      category: "Accesorios y Artesanías",
      categoryIcon: "🎨",
      timeAgo: "4h",
      isService: false
    },
    {
      id: 3,
      vendor: {
        name: "TechCaldas",
        avatar: "/api/placeholder/40/40",
        location: "Manizales, Caldas",
        verified: false
      },
      images: ["/api/placeholder/400/400"],
      description: "💻 Reparación y mantenimiento de equipos. Servicio técnico especializado con garantía. ¡Tu tecnología en las mejores manos! Domicilios sin costo en Manizales 🔧",
      price: "Desde 35.000",
      likes: 67,
      comments: 5,
      category: "Servicios Técnicos",
      categoryIcon: "🔧",
      timeAgo: "6h",
      isService: true
    }
  ];

  const categories = [
    { name: "Agricultura y Café", icon: "☕", count: 45, color: "bg-amber-100 text-amber-700" },
    { name: "Artesanías", icon: "🎨", count: 32, color: "bg-red-100 text-red-700" },
    { name: "Alimentos", icon: "🍯", count: 28, color: "bg-orange-100 text-orange-700" },
    { name: "Servicios Técnicos", icon: "🔧", count: 24, color: "bg-blue-100 text-blue-700" },
    { name: "Restaurantes", icon: "🍽️", count: 19, color: "bg-yellow-100 text-yellow-700" },
    { name: "Hoteles", icon: "🏨", count: 15, color: "bg-green-100 text-green-700" },
    { name: "Salud y Belleza", icon: "💄", count: 21, color: "bg-purple-100 text-purple-700" },
    { name: "Transporte", icon: "🚛", count: 12, color: "bg-indigo-100 text-indigo-700" }
  ];

  const stats = [
    { label: "Vendedores Activos", value: "150+", icon: Users },
    { label: "Productos y Servicios", value: "800+", icon: ShoppingBag },
    { label: "Estudiantes Academia", value: "200+", icon: BookOpen }
  ];

  const FeedPost = ({ post }: { post: typeof feedPosts[0] }) => (
    <div className="bg-white border border-gray-200 rounded-xl mb-6 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center p-4">
        <img src={post.vendor.avatar} alt={post.vendor.name} className="w-12 h-12 rounded-full mr-3 object-cover" />
        <div className="flex-1">
          <div className="flex items-center">
            <h3 className="font-semibold text-sm text-gray-900">{post.vendor.name}</h3>
            {post.vendor.verified && <span className="text-blue-500 ml-1">✓</span>}
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <MapPin className="w-3 h-3 mr-1" />
            {post.vendor.location}
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs text-gray-400">{post.timeAgo}</span>
          <div className={`text-xs px-2 py-1 rounded-full ${
            post.category.includes('Café') ? 'bg-amber-100 text-amber-700' :
            post.category.includes('Artesanías') ? 'bg-red-100 text-red-700' :
            post.category.includes('Técnicos') ? 'bg-blue-100 text-blue-700' :
            'bg-orange-100 text-orange-700'
          } mt-1`}>
            {post.categoryIcon} {post.category}
          </div>
        </div>
      </div>

      <div className="relative">
        <img src={post.images[0]} alt="Producto" className="w-full h-80 object-cover" />
        <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-4 py-2 rounded-full">
          <div className="text-sm font-bold">
            ${post.price}
            {post.originalPrice && (
              <span className="text-xs line-through ml-2 opacity-75">${post.originalPrice}</span>
            )}
          </div>
        </div>
        {post.isService && (
          <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
            Servicio
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1 text-gray-600 hover:text-red-500 transition-colors">
              <Heart className="w-5 h-5" />
              <span className="text-sm font-medium">{post.likes}</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 transition-colors">
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm font-medium">{post.comments}</span>
            </button>
            <button className="text-gray-600 hover:text-green-500 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
          <button className="text-gray-600 hover:text-yellow-500 transition-colors">
            <Bookmark className="w-5 h-5" />
          </button>
        </div>
        
        <p className="text-sm text-gray-800 mb-4 leading-relaxed">{post.description}</p>
        
        <div className="flex space-x-3">
          <button className="flex-1 bg-green-600 text-white py-2.5 rounded-lg font-medium hover:bg-green-700 transition-colors">
            {post.isService ? 'Solicitar Servicio' : 'Ver Producto'}
          </button>
          <button className="px-4 py-2.5 border border-green-600 text-green-600 rounded-lg font-medium hover:bg-green-50 transition-colors">
            Chat
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  MercadoLocal
                </h1>
                <p className="text-sm text-gray-500">Caldas, Colombia</p>
              </div>
            </div>
            
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Buscar productos, servicios, tiendas..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <a href="/marketplace" className="text-gray-600 hover:text-green-600 font-medium">
                Marketplace
              </a>
              <a href="/dashboard" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <BookOpen className="w-4 h-4" />
                <span>Academia IA</span>
              </a>
              <a href="/vendedor" className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
                Vender
              </a>
            </div>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-br from-green-600 via-blue-600 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            El Marketplace Oficial de <span className="text-yellow-300">Caldas</span>
          </h2>
          <p className="text-xl mb-8 text-green-100 max-w-3xl mx-auto">
            Descubre productos únicos, servicios locales y aprende con IA. 
            Una plataforma que conecta emprendedores caldenses con el mundo.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-sm">
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-yellow-300" />
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-green-100">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/marketplace" className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 mr-2" />
              Explorar Marketplace
            </a>
            <a href="/dashboard" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors inline-flex items-center justify-center">
              <Play className="w-5 h-5 mr-2" />
              Academia de IA
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <section className="mb-10">
          <h3 className="text-2xl font-bold mb-6 text-gray-900">Categorías Populares</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {categories.map((category, index) => (
              <div 
                key={index}
                className={`${category.color} p-4 rounded-xl text-center hover:scale-105 transition-transform cursor-pointer`}
              >
                <div className="text-2xl mb-2">{category.icon}</div>
                <div className="text-xs font-medium leading-tight">{category.name}</div>
                <div className="text-xs opacity-75 mt-1">{category.count} items</div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Descubre lo Mejor de Caldas</h3>
            <div className="flex items-center space-x-2">
              <a href="/marketplace" className="text-green-600 hover:text-green-700 font-medium flex items-center space-x-1">
                <span>Ver todo</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {feedPosts.map(post => (
              <FeedPost key={post.id} post={post} />
            ))}
          </div>
        </section>

        <section className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-3xl font-bold mb-4">¿Quieres Potenciar tu Negocio con IA?</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Únete a nuestra Academia de Inteligencia Artificial y aprende a transformar tu emprendimiento. 
            Más de 200 estudiantes ya están aplicando IA en sus negocios.
          </p>
          <a href="/dashboard" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center">
            <BookOpen className="w-5 h-5 mr-2" />
            Acceder a la Academia
            <ArrowRight className="w-5 h-5 ml-2" />
          </a>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
