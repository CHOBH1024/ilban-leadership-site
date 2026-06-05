import { useState } from 'react';
import { ShieldCheck, Mic, ScanFace, Compass, Users, Headphones, Sparkles, Coffee, Star, Brain, MessageCircle, Crown, Zap, Shield, TrendingUp, Briefcase, Heart, Eye, CheckCircle, ChevronRight, FileText, BarChart3, Search } from 'lucide-react';
import { SurveyConfig } from '../types';
import { surveys } from '../data/surveys';
import { seoBio, seoPosts, diagnosticDeepDives, mirrorIntros } from '../data/seoContent';
import { motion, AnimatePresence } from 'motion/react';

interface DashboardProps {
  onSelectSurvey: (config: SurveyConfig) => void;
  onNavigate?: (route: 'team' | 'admin' | 'columns') => void;
}

import { personaDirectoryData } from '../data/personaData';

const tabKeywords: Record<string, string[]> = {
  'thinking': ['#논리적추론', '#데이터해석', '#인지편향탐지', '#구조화사고', '#가설검증', '#리스크관리'],
  'interaction': ['#사회적공감', '#비언어적소통', '#전략적네트워킹', '#갈등해소', '#정서적에너지', '#설득과영향력'],
  'leadership': ['#비전수립', '#권한위임', '#심리적안전감', '#위기돌파', '#팀워크빌딩', '#조직문화'],
  'achievement': ['#목표지향', '#자원최적화', '#회복탄력성', '#우선순위설정', '#실행프로세스', '#품질관리'],
  'stability': ['#스트레스내성', '#평정심유지', '#실패수용력', '#정서적안정', '#객관성확보', '#에너지복구'],
  'growth': ['#학습민첩성', '#자기주도적', '#유연한사고', '#언러닝', '#신기술적응', '#패러다임전환'],
  'competency': ['#직무전문성', '#업무숙련도', '#신뢰구축', '#윤리적판단', '#지식전파', '#조직헌신도'],
  'passion': ['#내적동기', '#소명의식', '#몰입상태', '#가치관일치', '#번아웃방어', '#소속감'],
  'vision': ['#거시적트렌드', '#패턴인식', '#시나리오설계', '#창의적융합', '#장기전략', '#미래예측'],
};

export const Dashboard = ({ onSelectSurvey, onNavigate }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState<string>('thinking');

  const triggerHaptic = (pattern: number | number[]) => {
    if (navigator.vibrate) navigator.vibrate(pattern);
  };

  const handleSelectSurvey = (id: string, mode: 'standard' | 'master' | 'column') => {
    triggerHaptic(20);
    const survey = surveys.find(s => s.id === id);
    if (survey && mode !== 'column') {
      onSelectSurvey(survey);
    } else {
      if (onNavigate) onNavigate('columns');
    }
  };

  return (
    <div className="bg-slate-50 min-h-[100dvh] pb-20 font-sans text-slate-900 selection:bg-blue-200">
      
      {/* ── 상단 네비게이션 ── */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200 px-6 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm font-bold text-slate-600">
          <span className="text-slate-900 flex items-center gap-1.5 text-base">
            144 Persona Directory <CheckCircle size={16} className="text-blue-500" />
          </span>
          <div className="flex gap-6">
            <a href="#about" className="hover:text-blue-600 transition-colors">About</a>
            <a href="#contact" className="hover:text-blue-600 transition-colors">Contact</a>
          </div>
        </div>
      </header>

      {/* PC에서는 max-w-7xl로 확장, 모바일에서는 적절한 패딩 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">
        
        {/* ── 1. Hero Section (전체 설명) ── */}
        <section className="text-center space-y-6 pt-8 pb-12">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 flex flex-col md:flex-row items-center justify-center gap-4">
            <span className="text-6xl md:text-8xl">🪞</span> Mirror Inside
          </h1>
          <p className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto word-keep font-medium">
            {seoBio}
          </p>
        </section>

        {/* ── 2. 9 Mirrors Grid (진단 도구 창) ── */}
        <section className="space-y-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-slate-900 inline-block relative">
              9 Dimensions of Career DNA
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-12 h-1 bg-blue-500 rounded-full"></div>
            </h2>
          </div>
          
          {/* PC에서는 3열, 태블릿 2열, 모바일 1열 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {mirrorIntros.map((mirror) => (
              <article key={mirror.id} className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-slate-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
                <div className="flex flex-col items-center text-center mb-6">
                  <span className="text-5xl bg-slate-50 p-4 rounded-3xl mb-4 shadow-inner">{mirror.emoji}</span>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">{mirror.title}</h2>
                </div>

                <div className="bg-slate-50 rounded-2xl p-5 mb-8 border border-slate-100 flex-grow">
                  <ul className="space-y-4 text-[13px] text-slate-600 list-none font-medium">
                    {mirror.shortDesc?.map((desc, idx) => (
                      <li key={idx} className="flex gap-2 items-start">
                        <span className="word-keep leading-relaxed">{desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap justify-center gap-2 mb-8">
                  {mirror.tags.map(tag => (
                    <span key={tag} className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-100">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => handleSelectSurvey(mirror.id, 'standard')}
                    className="bg-slate-900 text-white font-bold py-3.5 px-2 rounded-xl text-sm flex flex-col items-center justify-center gap-1 hover:bg-slate-800 transition-colors shadow-md shadow-slate-900/10"
                  >
                    <span className="flex items-center gap-1.5">Standard <FileText size={16} /></span>
                    <span className="text-[10px] text-slate-300">30문항</span>
                  </button>
                  <button 
                    onClick={() => handleSelectSurvey(mirror.id, 'master')}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-3.5 px-2 rounded-xl text-sm flex flex-col items-center justify-center gap-1 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all hover:-translate-y-0.5"
                  >
                    <span className="flex items-center gap-1.5">Master <Sparkles size={16} /></span>
                    <span className="text-[10px] text-blue-100">70문항</span>
                  </button>
                  <button 
                    onClick={() => handleSelectSurvey(mirror.id, 'column')}
                    className="col-span-2 bg-white text-slate-700 font-bold py-3.5 px-4 rounded-xl text-sm flex items-center justify-center gap-2 border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors"
                  >
                    지식 칼럼 읽기 <BarChart3 size={18} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── 3. Persona Directory 탭 (신규 기능) ── */}
        <section className="bg-white rounded-3xl p-6 lg:p-10 shadow-sm border border-slate-200">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-slate-900 mb-4">144 Persona Directory</h2>
            <p className="text-slate-500">각 진단 도구별로 도출되는 144가지 페르소나 전체를 미리 확인해보세요.</p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* 탭 네비게이션 (PC: 세로, 모바일: 가로 스크롤) */}
            <div className="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-4 lg:pb-0 hide-scrollbar lg:w-64 shrink-0">
              {mirrorIntros.map((mirror) => (
                <button
                  key={mirror.id}
                  onClick={() => setActiveTab(mirror.id)}
                  className={`flex items-center gap-3 px-5 py-4 rounded-2xl text-left whitespace-nowrap lg:whitespace-normal font-bold transition-all ${
                    activeTab === mirror.id 
                      ? 'bg-slate-900 text-white shadow-md' 
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-xl">{mirror.emoji}</span>
                  <span>{mirror.title.split(' ')[0]}</span>
                </button>
              ))}
            </div>

            {/* 탭 콘텐츠 영역 */}
            <div className="flex-1 min-h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-6"
                >
                  <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-5 mb-2">
                    <p className="text-sm font-bold text-blue-800 mb-3 flex items-center gap-2">
                      <Sparkles size={16} /> 이 거울이 진단하는 핵심 키워드
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {tabKeywords[activeTab]?.map((kw, i) => (
                        <span key={i} className="text-xs font-bold text-blue-600 bg-white border border-blue-200 px-3 py-1.5 rounded-lg shadow-sm">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {personaDirectoryData[activeTab]?.map((persona, idx) => (
                      <div key={idx} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
                        <h3 className="text-lg font-black text-slate-900 mb-2">{persona.name}</h3>
                        <p className="text-slate-600 text-sm mb-4 word-keep leading-relaxed min-h-[40px]">{persona.desc}</p>
                        <div className="flex flex-wrap gap-2">
                          {persona.tags.map(tag => (
                            <span key={tag} className="text-[11px] font-bold text-slate-500 bg-white px-2 py-1 rounded-md border border-slate-200">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* ── 4. 나의 최근 진단 기록 ── */}
        <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl">🕒</div>
            <div>
              <h2 className="text-xl font-black text-slate-900 mb-1">나의 최근 진단 기록</h2>
              <p className="text-slate-500 text-sm">과거의 진단 결과를 다시 확인하고 비교해보세요.</p>
            </div>
          </div>
          <button className="w-full md:w-auto bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl p-4 flex items-center justify-between md:min-w-[300px] transition-colors group">
            <div className="flex items-center gap-4 text-left">
              <span className="text-3xl">💡</span>
              <div>
                <p className="text-xs font-bold text-blue-500 mb-0.5">기존 진단 완료</p>
                <p className="font-black text-slate-900">직관적 통찰 해결사</p>
                <p className="text-xs text-slate-400 mt-1">사용자 | 2026. 5. 13.</p>
              </div>
            </div>
            <ChevronRight className="text-slate-400 group-hover:text-slate-900 transition-colors" />
          </button>
        </section>

        {/* ── 5. The Science Behind Mirror Insight (애드센스 통과 및 신뢰도 확보용 학술 섹션) ── */}
        <section className="space-y-8 pb-10">
          <div className="bg-slate-900 text-white rounded-3xl p-10 md:p-16 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-black mb-4 md:text-center tracking-tight">
                The Science Behind Mirror Insight
              </h2>
              <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto word-keep">
                Mirror Insight는 단순한 심리 테스트가 아닙니다. 현대 심계측학(Psychometrics)과 데이터 사이언스를 결합하여, 당신의 숨겨진 커리어 DNA를 가장 과학적인 방식으로 도출합니다.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-left">
                <div className="space-y-3">
                  <h3 className="font-bold text-xl flex items-center gap-2 text-blue-300">🧬 Big Five Factor Model</h3>
                  <p className="text-slate-300 text-sm leading-relaxed word-keep">
                    현대 심리학에서 가장 신뢰받는 5요인 성격 모형(Big Five)을 베이스로, 직무 환경에 특화된 문항 알고리즘을 설계했습니다. 외향성, 신경증, 개방성, 친화성, 성실성의 다차원적인 스펙트럼을 통해 당신의 업무 퍼포먼스 예측력을 극대화합니다.
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="font-bold text-xl flex items-center gap-2 text-indigo-300">🧠 Jungian Cognitive Functions</h3>
                  <p className="text-slate-300 text-sm leading-relaxed word-keep">
                    칼 융(Carl Jung)의 인지 기능 이론을 현대 비즈니스 프레임워크로 재해석했습니다. 당신이 정보를 수집(Perceiving)하고 의사를 결정(Judging)하는 근본적인 뇌의 패턴을 추적하여, 가장 시너지가 높은 업무 환경을 매칭합니다.
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="font-bold text-xl flex items-center gap-2 text-purple-300">⚡ Latency Consistency Engine</h3>
                  <p className="text-slate-300 text-sm leading-relaxed word-keep">
                    베이지안 추론(Bayesian Inference) 알고리즘을 적용한 응답 반응 속도(Latency) 추적 엔진이 탑재되어 있습니다. 유저가 무의식적으로 선택하는 패턴의 일관성을 밀리초(ms) 단위로 교차 검증하여, 자기 보고식 설문의 치명적 한계인 '사회적 바람직성 편향'을 완벽에 가깝게 필터링합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 8. 푸터 ── */}
        <footer className="pt-16 pb-8 text-center border-t border-slate-200">
          <nav className="flex flex-wrap justify-center gap-6 text-sm font-bold text-slate-500 mb-6">
            <a href="#about" className="hover:text-slate-900 transition-colors">About Us</a>
            <a href="#contact" className="hover:text-slate-900 transition-colors">Contact</a>
            <a href="/privacy.html" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-slate-900 transition-colors">Terms of Service</a>
          </nav>
          <p className="text-xs text-slate-400">
            © 2026 Mirror Insight System. All rights reserved.
          </p>
        </footer>

      </main>
    </div>
  );
};
