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
    </div>
  );
}
