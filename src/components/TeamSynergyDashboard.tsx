import { Users, ArrowLeft } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

export const TeamSynergyDashboard = ({ onBack }: { onBack: () => void }) => {
  const teamData = [
    { subject: '구조화사고', TeamAverage: 85, Ideal: 90 },
    { subject: '비전수립', TeamAverage: 65, Ideal: 80 },
    { subject: '실행력', TeamAverage: 90, Ideal: 85 },
    { subject: '공감능력', TeamAverage: 55, Ideal: 75 },
    { subject: '스트레스내성', TeamAverage: 70, Ideal: 80 },
    { subject: '전문성', TeamAverage: 88, Ideal: 85 },
  ];

  return (
    <div className="max-w-6xl mx-auto py-8 md:py-12 px-4 sm:px-6 min-h-screen text-slate-800 dark:text-slate-200">
      <button onClick={onBack} className="text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white flex items-center gap-2 mb-6 md:mb-8 transition-colors">
        <ArrowLeft size={16} /> 대시보드로 돌아가기
      </button>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8 md:mb-12">
        <div className="p-3 md:p-4 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl md:rounded-2xl">
          <Users size={28} className="md:w-8 md:h-8" />
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-2">팀 시너지 맵 (Team Synergy Map)</h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-slate-400">알파팀 5명의 종합 역량 분석 및 시너지 대시보드</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-4 md:p-8 rounded-2xl md:rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-xl">
          <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6 text-slate-900 dark:text-white">팀 종합 역량 밸런스</h2>
          <div className="h-[300px] md:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={teamData}>
                <PolarGrid stroke="#94a3b8" className="opacity-50 dark:opacity-30" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'currentColor', fontSize: 13, fontWeight: 'bold' }} className="text-slate-600 dark:text-slate-400" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar name="팀 평균" dataKey="TeamAverage" stroke="#6366f1" fill="#6366f1" fillOpacity={0.5} strokeWidth={3} />
                <Radar name="조직 권장 (Ideal)" dataKey="Ideal" stroke="#cbd5e1" fill="transparent" strokeDasharray="5 5" strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-6 justify-center mt-4">
            <div className="flex items-center gap-2"><div className="w-4 h-4 bg-indigo-500 rounded-sm"></div> 팀 평균</div>
            <div className="flex items-center gap-2"><div className="w-4 h-0 border-t-2 border-dashed border-slate-400"></div> 권장 기준</div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-emerald-50 dark:bg-emerald-950/30 p-6 rounded-3xl border border-emerald-200 dark:border-emerald-900/50">
            <h3 className="font-black text-emerald-600 dark:text-emerald-400 mb-2">팀 강점 (Strengths)</h3>
            <p className="text-emerald-800 dark:text-emerald-100 text-sm leading-relaxed">
              알파팀은 <strong>실행력</strong>과 <strong>전문성</strong>이 매우 뛰어납니다. 목표가 주어지면 빠르게 돌파하는 특공대 역할을 수행할 수 있습니다.
            </p>
          </div>
          
          <div className="bg-rose-50 dark:bg-rose-950/30 p-6 rounded-3xl border border-rose-200 dark:border-rose-900/50">
            <h3 className="font-black text-rose-600 dark:text-rose-400 mb-2">팀 보완점 (Gaps)</h3>
            <p className="text-rose-800 dark:text-rose-100 text-sm leading-relaxed">
              <strong>공감능력</strong>과 <strong>비전수립</strong> 영역이 권장 기준보다 낮습니다. 장기적 비전을 조율하고 팀워크를 다지는 워크샵이 필요합니다.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">팀 구성원 (5명)</h3>
            <ul className="space-y-3">
              {['김팀장 (A-Mirror)', '이수석 (T-Mirror)', '박책임 (C-Mirror)', '최선임 (S-Mirror)', '정사원 (G-Mirror)'].map((member, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                  <div className="w-8 h-8 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center font-bold text-xs">{member[0]}</div>
                  {member}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
