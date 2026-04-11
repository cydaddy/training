/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, MapPin, Calendar, Info, ChevronRight, X, Sparkles } from 'lucide-react';

interface Heritage {
  id: string;
  name: string;
  category: string;
  designationDate: string;
  location: string;
  description: string;
  value: string;
}

const HERITAGE_DATA: Heritage[] = [
  {
    id: '1',
    name: '경복궁',
    category: '사적',
    designationDate: '1963년 1월 21일',
    location: '서울특별시 종로구 사직로 161',
    description: '경복궁은 조선 시대에 가장 먼저 지어진 커다란 궁궐이에요. 태조 이성계가 조선을 세우고 나서 한양을 수도로 정한 뒤에 만든 곳이지요. "새 왕조가 큰 복을 누려 번영할 것"이라는 아주 멋진 뜻을 담고 있답니다. 임진왜란 때 불에 타서 오랫동안 비어 있었지만, 나중에 고종 임금님 때 다시 멋지게 지어졌어요.',
    value: '경복궁은 조선의 으뜸가는 궁궐로서 우리 조상들의 뛰어난 건축 기술과 아름다움을 잘 보여주는 곳이에요. 근정전이나 경회루 같은 건물들은 오늘날에도 많은 사람이 감탄할 만큼 웅장하고 아름답답니다. 우리 역사의 중심지로서 아주 소중한 가치를 지니고 있어요.'
  },
  {
    id: '2',
    name: '숭례문',
    category: '국보',
    designationDate: '1962년 12월 20일',
    location: '서울특별시 중구 세종대로 40',
    description: '숭례문은 조선 시대 한양 도성을 둘러싸고 있던 성곽의 정문이에요. 흔히 "남대문"이라고도 부르지요. 조선 시대 사람들은 이 문을 통해 도성 안팎을 드나들었답니다. 우리나라에서 가장 규모가 큰 성문으로, 돌로 쌓은 기둥 위에 2층으로 된 멋진 나무 건물이 올려져 있는 모습이 특징이에요.',
    value: '숭례문은 우리나라 국보 제1호로 지정될 만큼 역사적으로 매우 중요한 문이에요. 조선 전기 건축 양식을 잘 간직하고 있으며, 서울의 상징과도 같은 존재랍니다. 비록 불이 나서 아픈 역사를 겪기도 했지만, 정성껏 복구하여 우리 곁을 지키고 있는 소중한 문화유산이에요.'
  },
  {
    id: '3',
    name: '종묘',
    category: '사적 / 유네스코 세계유산',
    designationDate: '1963년 1월 18일',
    location: '서울특별시 종로구 종로 157',
    description: '종묘는 조선 시대의 역대 임금님과 왕비님의 신주를 모시고 제사를 지내는 아주 경건한 곳이에요. 유교를 중요하게 생각했던 조선 시대에 가장 신성한 장소 중 하나였지요. 건물이 옆으로 아주 길게 뻗어 있는 독특한 모습을 하고 있는데, 이는 시간이 흐르며 모셔야 할 분들이 늘어날 때마다 건물을 옆으로 덧붙여 지었기 때문이에요.',
    value: '종묘는 그 가치를 인정받아 유네스코 세계유산으로도 지정되었어요. 이곳에서 열리는 "종묘제례"와 그에 맞춰 연주되는 "종묘제례악"도 함께 세계적인 문화유산으로 보호받고 있답니다. 조상을 공경하는 마음과 정갈한 건축미가 어우러진 세계적으로 보기 드문 소중한 곳이에요.'
  },
  {
    id: '4',
    name: '창덕궁',
    category: '사적 / 유네스코 세계유산',
    designationDate: '1963년 1월 18일',
    location: '서울특별시 종로구 율곡로 99',
    description: '창덕궁은 경복궁 다음으로 지어진 궁궐이지만, 조선의 임금님들이 가장 오랫동안 머물며 사랑했던 곳이에요. 다른 궁궐들이 규칙적으로 지어진 것과 달리, 창덕궁은 주변의 산과 지형을 그대로 살려 자연스럽게 배치되었답니다. 특히 임금님의 휴식 공간인 "후원"은 아름다운 정원과 연못이 어우러져 한 폭의 그림 같아요.',
    value: '창덕궁은 자연과 건축이 얼마나 잘 어우러질 수 있는지를 보여주는 최고의 본보기예요. 인공적인 아름다움보다는 자연의 조화를 중요하게 생각했던 우리 조상들의 지혜를 엿볼 수 있지요. 이러한 독창적인 아름다움 덕분에 유네스코 세계유산으로 지정되어 전 세계 사람들의 사랑을 받고 있어요.'
  },
  {
    id: '5',
    name: '서울 한양도성',
    category: '사적',
    designationDate: '1963년 1월 18일',
    location: '서울특별시 종로구, 중구, 성북구, 서대문구 일대',
    description: '한양도성은 조선의 수도인 한양을 보호하기 위해 산의 능선을 따라 쌓은 성곽이에요. 전체 길이가 약 18.6km나 되는데, 세계적으로도 이렇게 오랫동안 도성의 역할을 한 성곽은 드물다고 해요. 성곽을 따라 걷다 보면 조선 시대부터 지금까지 서울이 어떻게 변해왔는지 한눈에 느낄 수 있답니다.',
    value: '한양도성은 우리 조상들이 수도를 지키기 위해 얼마나 정성을 들였는지 보여주는 유산이에요. 성벽에 쓰인 돌의 모양을 보면 어느 시대에 쌓았는지 알 수 있어 역사 공부에도 큰 도움이 된답니다. 오늘날에는 서울 시민들이 자연을 느끼며 산책할 수 있는 소중한 역사 공원의 역할도 하고 있어요.'
  }
];

export default function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHeritage = HERITAGE_DATA.filter(h => 
    h.name.includes(searchTerm) || h.location.includes(searchTerm)
  );

  const selectedHeritage = HERITAGE_DATA.find(h => h.id === selectedId);

  return (
    <div className="relative min-h-screen font-sans">
      <div className="scanline" />
      
      {/* Header */}
      <header className="pt-12 pb-8 px-4 text-center relative overflow-hidden">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter mb-2">
            <span className="vapor-gradient-text drop-shadow-[0_0_10px_rgba(255,113,206,0.5)]">
              SEOUL HERITAGE
            </span>
          </h1>
          <p className="text-vapor-cyan font-mono text-sm md:text-base tracking-[0.3em] uppercase">
            서울 문화유산 탐험대 v1.0
          </p>
        </motion.div>
        
        <div className="mt-8 max-w-md mx-auto relative px-4">
          <Search className="absolute left-7 top-1/2 -translate-y-1/2 text-vapor-pink w-5 h-5" />
          <input
            type="text"
            placeholder="문화유산 이름을 검색해보세요..."
            className="w-full bg-vapor-dark/40 border-2 border-vapor-pink py-3 pl-12 pr-4 text-white focus:outline-none focus:shadow-[0_0_15px_rgba(255,113,206,0.5)] transition-all placeholder:text-vapor-pink/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHeritage.map((heritage, index) => (
            <motion.div
              key={heritage.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, rotate: index % 2 === 0 ? 1 : -1 }}
              className="vapor-card p-6 cursor-pointer group"
              onClick={() => setSelectedId(heritage.id)}
            >
              <div className="aspect-video bg-vapor-purple/20 border-2 border-dashed border-vapor-purple/40 mb-4 flex items-center justify-center relative overflow-hidden">
                <Sparkles className="text-vapor-purple/30 w-12 h-12" />
                <span className="absolute bottom-2 right-2 text-[10px] font-mono text-vapor-purple/60 uppercase">
                  Image Placeholder
                </span>
                {/* Future image will go here */}
              </div>
              
              <h2 className="text-2xl font-bold text-vapor-cyan mb-2 group-hover:text-vapor-yellow transition-colors">
                {heritage.name}
              </h2>
              <div className="flex items-center text-xs text-vapor-pink/80 mb-4 font-mono">
                <MapPin className="w-3 h-3 mr-1" />
                {heritage.location.split(' ').slice(0, 2).join(' ')}
              </div>
              
              <p className="text-sm text-gray-300 line-clamp-3 mb-6 leading-relaxed">
                {heritage.description}
              </p>
              
              <button className="vapor-button w-full flex items-center justify-center text-sm">
                자세히 보기 <ChevronRight className="ml-1 w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedId && selectedHeritage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-vapor-dark/90 backdrop-blur-md"
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="vapor-card max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 text-vapor-pink hover:text-vapor-cyan transition-colors"
              >
                <X className="w-8 h-8" />
              </button>

              <div className="mb-8">
                <span className="inline-block px-3 py-1 bg-vapor-purple/20 border border-vapor-purple text-vapor-purple text-xs font-bold uppercase tracking-widest mb-4">
                  {selectedHeritage.category}
                </span>
                <h2 className="text-4xl md:text-5xl font-black italic text-vapor-cyan mb-4">
                  {selectedHeritage.name}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-sm font-mono">
                  <div className="flex items-center text-vapor-pink">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="text-gray-400 mr-2">지정일:</span>
                    {selectedHeritage.designationDate}
                  </div>
                  <div className="flex items-center text-vapor-pink">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-gray-400 mr-2">소재지:</span>
                    {selectedHeritage.location}
                  </div>
                </div>
              </div>

              <div className="aspect-video bg-vapor-purple/10 border-2 border-dashed border-vapor-purple/30 mb-8 flex items-center justify-center relative">
                <div className="text-center">
                  <Sparkles className="text-vapor-purple/20 w-16 h-16 mx-auto mb-2" />
                  <p className="text-vapor-purple/40 font-mono text-sm uppercase tracking-widest">
                    [ {selectedHeritage.name} 사진 자리 ]
                  </p>
                  <p className="text-vapor-purple/30 text-xs mt-2">
                    /public/assets/images/ 폴더에 이미지를 넣어주세요
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                <section>
                  <div className="flex items-center text-vapor-yellow mb-3">
                    <Info className="w-5 h-5 mr-2" />
                    <h3 className="text-xl font-bold uppercase tracking-wider">어떤 곳인가요?</h3>
                  </div>
                  <p className="text-lg text-gray-200 leading-relaxed">
                    {selectedHeritage.description}
                  </p>
                </section>

                <section className="p-6 bg-vapor-blue/5 border-l-4 border-vapor-blue">
                  <div className="flex items-center text-vapor-blue mb-3">
                    <Sparkles className="w-5 h-5 mr-2" />
                    <h3 className="text-xl font-bold uppercase tracking-wider">특징과 가치</h3>
                  </div>
                  <p className="text-lg text-gray-200 leading-relaxed italic">
                    {selectedHeritage.value}
                  </p>
                </section>
              </div>

              <div className="mt-12 pt-8 border-t border-vapor-pink/20 text-center">
                <button
                  onClick={() => setSelectedId(null)}
                  className="vapor-button"
                >
                  목록으로 돌아가기
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="py-12 px-4 text-center border-t border-vapor-pink/20 mt-20">
        <p className="text-vapor-pink/60 font-mono text-xs tracking-widest uppercase">
          &copy; 2026 SEOUL CULTURAL HERITAGE EXPLORER // EST. 1392
        </p>
      </footer>
    </div>
  );
}
