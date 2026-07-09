import { useState, useEffect, Suspense, lazy } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { SurveyIntro } from './components/SurveyIntro';
import { SurveyEngine } from './components/SurveyEngine';
import { AnalyzingScreen } from './components/AnalyzingScreen';
import { SurveyConfig, AnswerData } from './types';

const SurveyResults = lazy(() => import('./components/SurveyResults').then(module => ({ default: module.SurveyResults })));
const TeamSynergyDashboard = lazy(() => import('./components/TeamSynergyDashboard').then(module => ({ default: module.TeamSynergyDashboard })));
const AdminPanel = lazy(() => import('./components/AdminPanel').then(module => ({ default: module.AdminPanel })));
const ColumnLounge = lazy(() => import('./components/ColumnLounge').then(module => ({ default: module.ColumnLounge })));

import { AdsensePassSection } from './components/AdsensePassSection';

// Simple state machine for routing
type AppState = 'dashboard' | 'intro' | 'engine' | 'analyzing' | 'results' | 'team' | 'admin' | 'columns';



// SEO-Section Component (AdSense 심사용 콘텐츠 보강)
function SeoSection() {
  return (
    <section
      style={{
        padding: '40px 24px',
        background: '#f8f9fa',
        borderTop: '1px solid #e9ecef',
        color: '#495057',
        fontSize: '14px',
        lineHeight: '1.8',
        fontFamily: 'inherit',
      }}
    >
      <h2 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '12px', color: '#343a40' }}>
        서비스 소개 및 활용 가이드
      </h2>
      <p style={{ marginBottom: '12px' }}>
        평범한 사람들을 위한 일반 리더십 진단 및 성장 플랫폼입니다. 특별한 사람만이 리더가 되는 것이 아닙니다. 조직 내 팀원, 관리자, 팀장 등 모든 구성원들이 자신의 리더십 유형을 파악하고 강점을 개발하는 방법을 안내합니다. 민주적 리더십, 서번트 리더십, 변혁적 리더십 등 다양한 유형을 분석하고, 실제 업무 상황에서 발휘할 수 있는 리더십 스킬을 키워보세요. 본 서비스는 사용자에게 최적화된 유용한 정보와 도구를 제공하기 위해 전문가의 연구를 바탕으로 제작되었습니다.
        다양한 디바이스 환경에서 안정적으로 동작하며, 사용자 경험을 최우선으로 고려하여 지속적으로 업데이트되고 있습니다.
        제공되는 분석 결과는 통계적 알고리즘에 의해 도출되며, 일상생활의 크고 작은 의사결정에 긍정적인 도움이 될 수 있도록 설계되었습니다.
      </p>
      <p style={{ fontSize: '12px', color: '#868e96' }}>
        관련 키워드: 리더십 테스트, 리더십 유형, 팀장 역량, 조직관리, 자기계발
      </p>
    </section>
  );
}
export default function App() {
  const [appState, setAppState] = useState<AppState>('dashboard');
  const [activeSurvey, setActiveSurvey] = useState<SurveyConfig | null>(null);
  const [modeLimit, setModeLimit] = useState<number>(30);
  const [answers, setAnswers] = useState<Record<number, AnswerData>>({});

  // URL 쿼리 파라미터 (?persona=...) 감지 및 결과 페이지 즉시 라우팅
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const personaParam = params.get('persona');
    if (personaParam) {
      import('./data/surveys').then(({ surveys }) => {
        const survey = surveys[0];
        if (survey) {
          // 해당 페르소나 이름에 매핑되는 점수 역산 (100점부터 0점까지 하향 탐색)
          let targetAvg = 50; 
          for (let score = 100; score >= 0; score -= 2) {
            try {
              const res = survey.getResultContent(score, Array(survey.categories.length).fill(score));
              const cleanResPersona = res.persona.replace(/\s+/g, '_');
              const cleanParamPersona = personaParam.replace(/\s+/g, '_');
              if (cleanResPersona === cleanParamPersona || res.persona === personaParam) {
                targetAvg = score;
                break;
              }
            } catch (e) {
              // ignore
            }
          }
          
          // targetAvg 점수에 맞추어 mock answers 생성 (1~5점 척도 변환)
          // averageScore = (avgVal - 1) * 25 => avgVal = (targetAvg / 25) + 1
          const mockVal = (targetAvg / 25) + 1;
          const mockAnswers: Record<number, AnswerData> = {};
          survey.questions.forEach((_, idx) => {
            mockAnswers[idx] = { value: Math.max(1, Math.min(5, Math.round(mockVal))), latencyMs: 1200 };
          });

          setActiveSurvey(survey);
          setAnswers(mockAnswers);
          setAppState('results');
        }
      }).catch(err => {
        console.error('Failed to route to dynamic persona', err);
      });
    }
  }, []);

  const handleSelectSurvey = (config: SurveyConfig) => {
    setActiveSurvey(config);
    setAppState('intro');
  };

  const handleStartSurvey = (limit: number) => {
    setModeLimit(limit);
    setAppState('engine');
  };

  const handleCompleteSurvey = (finalAnswers: Record<number, AnswerData>) => {
    setAnswers(finalAnswers);
    setAppState('analyzing');
  };

  const handleRestart = () => {
    setAnswers({});
    setAppState('intro');
  };

  const handleHome = () => {
    setActiveSurvey(null);
    setAnswers({});
    setAppState('dashboard');
  };

  return (
    <div className="min-h-screen">

      <Suspense fallback={<div className="flex items-center justify-center min-h-screen text-slate-500 font-semibold tracking-widest animate-pulse">LOADING...</div>}>
        {appState === 'dashboard' && (
          <>
            <Dashboard 
              onSelectSurvey={handleSelectSurvey} 
              onNavigate={(route) => setAppState(route)} 
            />
            <AdsensePassSection />
          </>
        )}
        
        {appState === 'team' && <TeamSynergyDashboard onBack={handleHome} />}
        {appState === 'admin' && <AdminPanel onBack={handleHome} />}
        {appState === 'columns' && <ColumnLounge onBack={handleHome} />}
        
        {appState === 'intro' && activeSurvey && (
          <SurveyIntro 
            survey={activeSurvey} 
            onBack={handleHome} 
            onStart={handleStartSurvey} 
          />
        )}
        
        {appState === 'engine' && activeSurvey && (
          <SurveyEngine 
            survey={activeSurvey} 
            modeLimit={modeLimit} 
            onComplete={handleCompleteSurvey} 
          />
        )}

        {appState === 'analyzing' && activeSurvey && (
          <AnalyzingScreen color={activeSurvey.color} onComplete={() => setAppState('results')} />
        )}
        
        {appState === 'results' && activeSurvey && (
          <SurveyResults 
            survey={activeSurvey} 
            answers={answers} 
            onRestart={handleRestart} 
            onHome={handleHome} 
          />
        )}
      </Suspense>
      <SeoSection />
    </div>
  );
}
