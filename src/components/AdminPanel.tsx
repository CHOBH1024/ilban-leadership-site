import { Activity, ArrowLeft, BarChart3, TrendingUp, Users } from 'lucide-react';

export const AdminPanel = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="max-w-7xl mx-auto py-8 md:py-12 px-4 sm:px-6 min-h-screen text-slate-800 dark:text-slate-200">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 md:mb-12 gap-4">
        <div className="flex items-center gap-4 md:gap-6">
          <button onClick={onBack} className="p-2 md:p-3 bg-white dark:bg-slate-800 rounded-full shadow-md hover:scale-105 transition-transform text-slate-600 dark:text-slate-300">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2 md:gap-3">
              <Activity className="text-rose-500 w-6 h-6 md:w-8 md:h-8" /> 조직 진단 어드민 패널
            </h1>
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">HR 담당자 전용: 전사 Mirror Insight 현황</p>
          </div>
        </div>
        <div className="w-full sm:w-auto bg-white dark:bg-slate-800 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-xs md:text-sm shadow-sm text-center sm:text-left">
          업데이트: 2026-05-29 09:00 AM
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          { title: '전체 임직원 진단율', value: '82%', desc: '1,240 / 1,500 명 완료', icon: Users, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' },
          { title: '조직 평균 신뢰도 (Reliability)', value: '94점', desc: '전월 대비 +2점 상승', icon: Activity, color: 'text-emerald-500', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
          { title: '최다 보유 Mirror', value: 'A-Mirror', desc: '성취 및 실행력 (34%)', icon: TrendingUp, color: 'text-amber-500', bg: 'bg-amber-100 dark:bg-amber-900/30' },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-4">
            <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color}`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-bold mb-1">{stat.title}</p>
              <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-1">{stat.value}</h3>
              <p className="text-xs text-slate-400 dark:text-slate-500">{stat.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="text-slate-400" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">본부별 컬처 핏 (Culture Fit)</h2>
          </div>
          <div className="space-y-6">
            {[
              { name: '글로벌 사업본부', score: 92 },
              { name: 'R&D 센터', score: 88 },
              { name: '마케팅 본부', score: 85 },
              { name: '경영지원 본부', score: 76 },
            ].map((dept, i) => (
              <div key={i}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-bold text-slate-700 dark:text-slate-300">{dept.name}</span>
                  <span className="text-slate-500">{dept.score}점</span>
                </div>
                <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${dept.score}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">최근 진단 리스크 알림</h2>
          <div className="space-y-4">
            {[
              { time: '10분 전', text: '경영지원본부 A팀의 시너지 맵에서 [공감능력] 결핍 경고가 감지되었습니다.' },
              { time: '1시간 전', text: '마케팅본부 특정 직군의 리더십 적합도 점수가 평균 이하로 나타났습니다.' },
              { time: '2시간 전', text: 'R&D센터 신규 입사자 15명의 진단이 모두 완료되었습니다.' },
            ].map((alert, i) => (
              <div key={i} className="flex gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                <div className="text-xs font-bold text-slate-400 whitespace-nowrap pt-1">{alert.time}</div>
                <div className="text-sm text-slate-700 dark:text-slate-300">{alert.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
