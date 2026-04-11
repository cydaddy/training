import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { MapPin, Calendar, Info, ArrowLeft, Sparkles, Star } from 'lucide-react';
import { HERITAGE_DATA } from '../data';

export default function Detail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const heritage = HERITAGE_DATA.find(h => h.id === id);

  if (!heritage) {
    return (
      <div className="min-h-screen flex items-center justify-center font-cute text-3xl">
        문화유산을 찾을 수 없어요! 😢
        <button onClick={() => navigate('/')} className="ml-4 memphis-button bg-memphis-yellow">
          돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen font-sans pb-20 pt-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-block mb-8">
          <button className="memphis-button bg-white hover:bg-memphis-yellow">
            <ArrowLeft className="w-6 h-6 mr-2" />
            목록으로 돌아가기
          </button>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="memphis-card relative overflow-hidden"
        >
          {/* Top decorative bar */}
          <div className={`h-6 w-full border-b-4 border-black ${heritage.color}`} />
          
          <div className="p-8 md:p-12">
            <div className="mb-8 relative">
              <span className="inline-block px-4 py-2 bg-white border-4 border-black font-cute text-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-6 rotate-[-3deg]">
                {heritage.category}
              </span>
              <h1 className="text-5xl md:text-7xl font-display text-black mb-6 leading-tight">
                {heritage.name}
              </h1>
              
              <div className="flex flex-col sm:flex-row gap-4 font-cute text-lg">
                <div className="flex items-center bg-memphis-yellow px-4 py-2 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>지정일: {heritage.designationDate}</span>
                </div>
                <div className="flex items-center bg-memphis-teal text-white px-4 py-2 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>소재지: {heritage.location}</span>
                </div>
              </div>
            </div>

            <div className="aspect-video bg-gray-100 border-4 border-black mb-12 flex items-center justify-center relative overflow-hidden">
              <img src={heritage.imageUrl} alt={heritage.name} className="w-full h-full object-cover" />
            </div>

            <div className="space-y-12">
              <section className="relative">
                <div className="absolute -left-4 -top-4 w-12 h-12 bg-memphis-blue rounded-full border-4 border-black -z-10" />
                <div className="flex items-center mb-4">
                  <Info className="w-8 h-8 mr-3 text-black" />
                  <h3 className="text-3xl font-display">어떤 곳인가요?</h3>
                </div>
                <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                  <p className="text-xl text-gray-800 leading-loose">
                    {heritage.description}
                  </p>
                </div>
              </section>

              <section className="relative">
                <div className="absolute -right-4 -top-4 w-12 h-12 bg-memphis-pink rotate-45 border-4 border-black -z-10" />
                <div className="flex items-center mb-4">
                  <Star className="w-8 h-8 mr-3 text-black" />
                  <h3 className="text-3xl font-display">특징과 가치</h3>
                </div>
                <div className="bg-memphis-bg border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                  <p className="text-xl text-gray-800 leading-loose">
                    {heritage.value}
                  </p>
                </div>
              </section>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
