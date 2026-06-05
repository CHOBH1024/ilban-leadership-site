import { ArrowLeft, BookOpen, Search } from 'lucide-react';
import { seoPosts, diagnosticDeepDives } from '../data/seoContent';

interface ColumnLoungeProps {
  onBack: () => void;
}

export const ColumnLounge = ({ onBack }: ColumnLoungeProps) => {
  return (
    <div className="bg-slate-50 min-h-[100dvh] pb-24 font-sans text-slate-900 selection:bg-blue-200">
      
      {/* ── 헤더 ── */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200 px-6 py-4 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600"
          >
            <ArrowLeft size={20} />
          </button>
          <span className="font-black text-slate-900 flex items-center gap-2">
            <BookOpen size={18} className="text-blue-500" /> Column Lounge
          </span>
        </div>
        <div className="flex gap-4 text-sm font-bold text-slate-600">
          <a href="#magazine" className="hover:text-blue-600 transition-colors hidden sm:block">Magazine</a>
          <a href="#deepdives" className="hover:text-blue-600 transition-colors hidden sm:block">Deep-Dives</a>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-24">
        
        {/* ── 히어로 섹션 ── */}
        <section className="text-center pt-8 pb-4">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            커리어 성장의 모든 지식,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Mirror Insight Lounge</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto word-keep leading-relaxed">
            심계측학, 데이터 사이언스, 그리고 조직 심리학이 결합된 전문적인 통찰을 제공합니다. 당신의 숨겨진 잠재력을 발견하고 커리어를 가속화할 지식들을 만나보세요.
          </p>
        </section>

        {/* ── 1. Career Insight Magazine ── */}
        <section id="magazine" className="scroll-mt-24">
          <div className="flex items-center gap-3 mb-10 border-b border-slate-200 pb-4">
            <Search className="text-blue-500" size={24} />
            <h2 className="text-2xl md:text-3xl font-black text-slate-900">
              Career Insight Magazine
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {seoPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-black text-blue-600 mb-6 leading-tight">{post.title}</h3>
                <div className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap word-keep">
                  {post.content}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── 2. Diagnostic Deep-Dives ── */}
        <section id="deepdives" className="scroll-mt-24">
          <div className="flex items-center gap-3 mb-10 border-b border-slate-200 pb-4">
            <BookOpen className="text-indigo-500" size={24} />
            <h2 className="text-2xl md:text-3xl font-black text-slate-900">
              Diagnostic Deep-Dives
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {diagnosticDeepDives.map((deepdive, idx) => (
              <article key={idx} className="bg-slate-50 rounded-3xl p-8 border border-slate-200 hover:border-slate-300 transition-colors">
                <h3 className="text-xl font-black text-slate-900 mb-4">{deepdive.title}</h3>
                <div className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap word-keep">
                  {deepdive.content}
                </div>
              </article>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
};
