import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { MapPin, ChevronRight, Sparkles } from 'lucide-react';
import { HERITAGE_DATA } from '../data';

export default function Home() {
  return (
    <div className="relative min-h-screen font-sans pb-20">
      {/* Decorative Memphis Shapes */}
      <div className="fixed top-20 left-10 w-16 h-16 bg-memphis-yellow border-4 border-black rounded-full -z-10" />
      <div className="fixed top-40 right-20 w-20 h-20 bg-memphis-pink border-4 border-black rotate-45 -z-10" />
      <div className="fixed bottom-20 left-20 w-24 h-24 bg-memphis-teal border-4 border-black rounded-tl-full -z-10" />
      
      {/* Header */}
      <header className="pt-16 pb-12 px-4 text-center relative">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring", bounce: 0.5 }}
        >
          <h1 className="text-5xl md:text-7xl mb-4 memphis-title inline-block relative">
            서울 문화유산 탐험대
            <Sparkles className="absolute -top-6 -right-8 w-12 h-12 text-memphis-yellow drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]" />
          </h1>
          <p className="font-cute text-2xl md:text-3xl text-black mt-4 bg-white inline-block px-6 py-2 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-[-2deg]">
            우리가 몰랐던 서울의 보물찾기!
          </p>
        </motion.div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {HERITAGE_DATA.map((heritage, index) => (
            <motion.div
              key={heritage.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/heritage/${heritage.id}`} className="block h-full">
                <div className="memphis-card h-full flex flex-col relative overflow-hidden group">
                  {/* Card Header Color Bar */}
                  <div className={`h-4 w-full border-b-4 border-black ${heritage.color}`} />
                  
                  <div className="p-6 flex-grow flex flex-col">
                    <div className="aspect-video bg-gray-100 border-4 border-black mb-4 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '15px 15px' }} />
                      <span className="font-cute text-xl text-gray-400 z-10 bg-white px-3 py-1 border-2 border-black">
                        사진을 넣어주세요
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-start mb-2">
                      <h2 className="text-3xl font-display text-black">
                        {heritage.name}
                      </h2>
                      <span className="inline-block px-3 py-1 bg-white border-2 border-black font-cute text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        {heritage.category}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-sm font-bold mb-4 bg-memphis-yellow/30 inline-flex px-2 py-1 border-2 border-black w-fit">
                      <MapPin className="w-4 h-4 mr-1" />
                      {heritage.location.split(' ').slice(0, 2).join(' ')}
                    </div>
                    
                    <p className="text-base text-gray-700 line-clamp-3 mb-6 leading-relaxed flex-grow">
                      {heritage.description}
                    </p>
                    
                    <div className="mt-auto">
                      <button className="memphis-button w-full bg-memphis-teal text-white group-hover:bg-memphis-pink">
                        자세히 보기 <ChevronRight className="ml-1 w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
