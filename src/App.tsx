import React, { useState, useEffect } from 'react';
import { Globe, MessageSquare, Share2, Eye, Send, Zap, Activity } from 'lucide-react';

interface ResultShare { id: string; user: string; archetype: string; emoji: string; time: string; note: string; }
interface Comment { id: string; user: string; text: string; time: string; }
interface ApiComment { id: number; site: string; result_type: string | null; nickname: string; body: string; created_at: number; }

const API = 'https://api.pomyjo.com/api';
const SITE = 'ilbanleadership1024';

function timeAgo(ts: number, isEn: boolean): string {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return isEn ? 'just now' : '방금 전';
  const m = Math.floor(s / 60);
  if (m < 60) return isEn ? `${m}m ago` : `${m}분 전`;
  const h = Math.floor(m / 60);
  if (h < 24) return isEn ? `${h}h ago` : `${h}시간 전`;
  const d = Math.floor(h / 24);
  return isEn ? `${d}d ago` : `${d}일 전`;
}

export function App() {
  // State for answers to compute a score
  const [answers, setAnswers] = useState<number[]>([]);

  const [lang, setLang] = useState<'ko' | 'en'>('ko');
  const [tab, setTab] = useState<'survey' | 'publicFeed' | 'comments'>('survey');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [result, setResult] = useState<any>(null);

  // Live Community Data
  const [publicShares, setPublicShares] = useState<ApiComment[]>([]);

  const [comments, setComments] = useState<ApiComment[]>([]);

  const [newComment, setNewComment] = useState('');
  const [nickname, setNickname] = useState('');
  const [shareNote, setShareNote] = useState('');
  const [total, setTotal] = useState(12480);
  const [feedError, setFeedError] = useState<string | null>(null);

  const refreshFeed = async () => {
    try {
      const [cRes, sRes] = await Promise.all([
        fetch(`${API}/comments?site=${SITE}&limit=50`),
        fetch(`${API}/stats?site=${SITE}`),
      ]);
      if (!cRes.ok || !sRes.ok) throw new Error('bad status');
      const cj = await cRes.json();
      const sj = await sRes.json();
      setComments(cj.comments || []);
      setPublicShares((cj.comments || []).filter((x: ApiComment) => x.result_type));
      if (sj.total) setTotal(sj.total);
      setFeedError(null);
    } catch {
      setFeedError(lang === 'en' ? 'Community feed unavailable' : '커뮤니티 피드를 불러오지 못했습니다');
    }
  };

  useEffect(() => { refreshFeed(); /* eslint-disable-next-line */ }, [lang]);

  const questions = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    textKo: `${i + 1}번 문항: 진단 상태 및 심리적 행동 패턴을 측정합니다.`,
    textEn: `Item ${i + 1}: Behavioral & diagnostic assessment.`
  }));

  const handleAnswer = (score: number) => {
    // Record the selected score (5=Strongly Agree ... 1=Strongly Disagree)
    setAnswers(prev => [...prev, score]);
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(currentIdx + 1);
    } else {
      // Compute a simple total score (max 100)
        const totalScore = answers.reduce((a, b) => a + b, 0) + score; // include current answer
        // Determine archetype based on score thresholds
        let archetype;
        if (totalScore >= 80) {
          archetype = {
            nameKo: "카리스마 리더",
            nameEn: "Charismatic Leader",
            emoji: "👑",
            descKo: "비전과 열정을 통해 조직을 이끌며, 구성원에게 영감을 주는 리더십 유형입니다.",
            insight: "당신은 높은 자기 효능감과 강한 영향력을 가지고 있습니다.",
            strategies: [
              "비전을 명확히 제시하고 공유하세요.",
              "팀원 개개인의 강점을 파악해 배치하세요.",
              "정기적인 피드백을 통해 동기 부여를 유지하세요.",
              "결정 시 데이터와 직관을 균형 있게 활용하세요.",
              "스트레스 관리와 자기 돌봄을 잊지 마세요."
            ],
            steps: [
              "1️⃣ 30분 동안 현재 조직 목표를 정리하고 공유한다.",
              "2️⃣ 1:1 대화를 통해 팀원의 동기를 탐색한다.",
              "3️⃣ 주간 회고에서 성공 사례와 배운 점을 기록한다."
            ],
            science: "리더십 효과성 연구에 따르면, 비전 제시는 조직 참여도를 평균 27% 상승시킵니다."
          };
        } else if (totalScore >= 60) {
          archetype = {
            nameKo: "서번트 리더",
            nameEn: "Servant Leader",
            emoji: "🤝",
            descKo: "팀원의 성장과 복지를 최우선으로 생각하는 배려 깊은 리더십 유형입니다.",
            insight: "당신은 공감 능력이 높고 협업을 촉진합니다.",
            strategies: [
              "팀원 의견을 적극 청취하고 반영한다.",
              "역량 개발 프로그램을 설계한다.",
              "투명한 커뮤니케이션을 유지한다.",
              "작은 성공을 자주 축하한다.",
              "리더십 역할을 분산하여 권한을 부여한다."
            ],
            steps: [
              "1️⃣ 매주 1시간을 팀원 멘토링에 투자한다.",
              "2️⃣ 피드백 루프를 구축해 의견을 정기적으로 수집한다.",
              "3️⃣ 복지 정책을 검토하고 개선안을 제시한다."
            ],
            science: "서번트 리더십은 조직 내 신뢰를 34% 향상시키는 것으로 보고되었습니다."
          };
        } else {
          archetype = {
            nameKo: "코칭 리더",
            nameEn: "Coaching Leader",
            emoji: "🗣️",
            descKo: "팀원의 잠재력을 끌어내고 성장 여정을 지원하는 코칭 중심의 리더십 유형입니다.",
            insight: "당신은 질문과 피드백을 통해 학습을 촉진합니다.",
            strategies: [
              "목표 설정을 공동으로 만든다.",
              "정기적인 성과 리뷰를 진행한다.",
              "학습 문화와 실험을 장려한다.",
              "실패를 학습 기회로 전환한다.",
              "역량 기반 피드백을 제공한다."
            ],
            steps: [
              "1️⃣ 각 팀원과 30분 코칭 세션을 진행한다.",
              "2️⃣ 개인 목표와 조직 목표를 매핑한다.",
              "3️⃣ 월간 성과 회고를 통해 성장 포인트를 도출한다."
            ],
            science: "코칭 리더십은 직원 몰입도를 평균 22% 끌어올린다고 알려져 있습니다."
          };
        }

        setResult({
          nameKo: archetype.nameKo,
          nameEn: archetype.nameEn,
          emoji: archetype.emoji,
          descKo: archetype.descKo,
          insight: archetype.insight,
          strategies: archetype.strategies,
          steps: archetype.steps,
          science: archetype.science
        });
    }
  };

    const handleShareResult = async () => {
    if (!result) return;
    try {
      const res = await fetch(`${API}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          site: SITE,
          result_type: lang === 'en' ? result.nameEn : result.nameKo,
          nickname: nickname.trim() || (lang === 'en' ? 'Anonymous Explorer' : '익명 탐험가'),
          body: shareNote.trim() || (lang === 'en' ? 'Sharing my diagnostic result to the community feed!' : '내 진단 결과를 커뮤니티 피드에 공유합니다!'),
        }),
      });
      if (!res.ok) throw new Error('post failed');
      setShareNote('');
      await refreshFeed();
      setTab('publicFeed');
    } catch {
      setFeedError(lang === 'en' ? 'Failed to share' : '공유에 실패했습니다');
    }
  };

    const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      const res = await fetch(`${API}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          site: SITE,
          nickname: nickname.trim() || (lang === 'en' ? 'Anonymous Dev' : '익명 개발자'),
          body: newComment.trim(),
        }),
      });
      if (!res.ok) throw new Error('post failed');
      setNewComment('');
      await refreshFeed();
    } catch {
      setFeedError(lang === 'en' ? 'Failed to post comment' : '댓글 작성에 실패했습니다');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
      {/* Header */}
      <header className="border-b border-slate-800 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900/80 px-6 py-4 flex justify-between items-center max-w-4xl mx-auto w-full sticky top-0 z-50" style={{ backdropFilter: 'blur(8px)' }}>
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-indigo-400" />
          <span className="font-extrabold text-base text-white tracking-tight uppercase">ilban-leadership-site</span>
          <span className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold rounded-full flex items-center gap-1">
            <Globe className="w-3 h-3" /> Live Connected
          </span>
        </div>
        <button onClick={() => setLang(lang === 'ko' ? 'en' : 'ko')} className="px-3 py-1 bg-slate-800 rounded-full text-xs font-semibold">
          {lang === 'ko' ? 'English' : '한국어'}
        </button>
      </header>

      {/* Main Container */}
      <main className="max-w-2xl mx-auto px-6 py-8 w-full flex-1">
        {/* Navigation Tabs */}
        {feedError && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-300">{feedError}</div>
        )}
        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 mb-6">
          <button onClick={() => setTab('survey')} className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition flex justify-center items-center gap-1 ${tab === 'survey' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}>
            <Activity className="w-3.5 h-3.5" /> 진단하기
          </button>
          <button onClick={() => setTab('publicFeed')} className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition flex justify-center items-center gap-1 ${tab === 'publicFeed' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}>
            <Eye className="w-3.5 h-3.5" /> 접속자 진단 결과 피드 ({publicShares.length})
          </button>
          <button onClick={() => setTab('comments')} className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition flex justify-center items-center gap-1 ${tab === 'comments' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}>
            <MessageSquare className="w-3.5 h-3.5" /> 라이브 댓글 ({comments.length})
          </button>
        </div>

        {/* Tab 1: Survey & Share */}
        {tab === 'survey' && (
          <div>
            {!result ? (
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl">
                <div className="flex justify-between text-xs text-slate-400 mb-2">
                  <span>진단 문항 {currentIdx + 1} / 20</span>
                  <span>{Math.round(((currentIdx + 1) / 20) * 100)}%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full mb-6 overflow-hidden">
                  <div className="h-full bg-indigo-500 transition-all duration-300" style={{ width: `${((currentIdx + 1) / 20) * 100}%` }} />
                </div>
                <h2 className="text-lg font-bold text-white mb-6">{questions[currentIdx].textKo}</h2>
                <div className="grid gap-2.5">
                  {[5, 4, 3, 2, 1].map((s, i) => (
                    <button key={i} onClick={() => handleAnswer(s)} className="p-3.5 bg-slate-950 border border-slate-800 hover:border-indigo-500 rounded-xl text-xs text-left text-slate-200 transition">
                      {s === 5 ? "매우 그렇다 (Strongly Agree)" : s === 4 ? "그렇다 (Agree)" : s === 3 ? "보통이다 (Neutral)" : s === 2 ? "그렇지 않다 (Disagree)" : "전혀 그렇지 않다 (Strongly Disagree)"}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white/10 border border-white/20 backdrop-blur-lg p-8 rounded-2xl text-center space-y-6" style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '1rem' }}>
                <div className="text-6xl">{result.emoji}</div>
                <div>
                  <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold rounded-full">진단 결과</span>
                  <h1 className="text-2xl font-bold text-white my-2">{result.nameKo}</h1>
                <p className="text-sm text-slate-300 italic mb-2">{result.insight}</p>
                  <p className="text-xs text-slate-300 max-w-md mx-auto mb-4">{result.descKo}</p>
                <ul className="text-left text-xs text-slate-200 list-disc list-inside mb-3">
                  {result.strategies && result.strategies.map((s: string, i: number) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
                <ol className="text-left text-xs text-slate-200 list-decimal list-inside mb-3">
                  {result.steps && result.steps.map((s: string, i: number) => (
                    <li key={i}>{s}</li>
                  ))}
                </ol>
                <p className="text-xs text-slate-400 italic">{result.science}</p>
                </div>

                {/* Online Result Share Box */}
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-left space-y-3">
                  <h3 className="text-xs font-bold text-indigo-400 flex items-center gap-1">
                    <Share2 className="w-3.5 h-3.5" /> 이 결과를 다른 접속자들과 실시간 공유하기
                  </h3>
                  <input
                    type="text"
                    placeholder="닉네임 (선택사항)"
                    value={nickname}
                    onChange={e => setNickname(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="공유 한마디 메모 (예: 내 성향과 딱 들어맞네요!)"
                    value={shareNote}
                    onChange={e => setShareNote(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white"
                  />
                  <button onClick={handleShareResult} className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg text-xs transition">
                    지금 공유하고 리더십 인사이트 받기 🚀
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Public Diagnostics Feed */}
        {tab === 'publicFeed' && (
          <div className="space-y-4">
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex justify-between items-center text-xs">
              <span className="text-slate-400">실시간 유저 진단 참여 수</span>
              <strong className="text-indigo-400 font-bold">{total.toLocaleString()} 건</strong>
            </div>

            <div className="space-y-3">
              {publicShares.map(s => (
                <div key={s.id} className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex items-start gap-3">
                  <div className="text-3xl">{result?.emoji || '📊'}</div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-white">{s.nickname}</span>
                      <span className="text-[10px] text-slate-500">{timeAgo(s.created_at, lang === 'en')}</span>
                    </div>
                    <span className="px-2 py-0.5 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-[10px] font-bold rounded">
                      {s.result_type}
                    </span>
                    <p className="text-xs text-slate-300 mt-2">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Community Comments */}
        {tab === 'comments' && (
          <div className="space-y-6">
            <form onSubmit={handleAddComment} className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-3">
              <input
                type="text"
                placeholder="닉네임 (선택사항)"
                value={nickname}
                onChange={e => setNickname(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
              />
              <textarea
                placeholder="자유롭게 진단 후기, 의견, 질문을 공유해보세요..."
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white h-20 resize-none"
              />
              <button type="submit" className="w-full py-2.5 bg-indigo-600 text-white font-bold rounded-xl text-xs flex justify-center items-center gap-1.5">
                <Send className="w-3.5 h-3.5" /> 라이브 댓글 작성하기
              </button>
            </form>

            <div className="space-y-3">
              {comments.map(c => (
                <div key={c.id} className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold text-white block mb-1">{c.nickname}</span>
                    <p className="text-xs text-slate-300 leading-relaxed">{c.body}</p>
                  </div>
                  <span className="text-[10px] text-slate-500">{timeAgo(c.created_at, lang === 'en')}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

            <footer className="border-t border-slate-800 py-5 text-center">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                const url = location.href;
                if (navigator.share) { navigator.share({ title: document.title, url }); }
                else { navigator.clipboard?.writeText(url).then(() => alert('링크가 복사되었습니다! 공유해보세요 🎉')); }
              }}
              className="px-4 py-1.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold transition"
            >
              📤 결과 공유하기
            </button>
            <a
              href="https://hub.pomyjo.com"
              className="px-4 py-1.5 rounded-full border border-slate-700 hover:border-indigo-500 text-slate-300 hover:text-white text-[11px] font-bold transition"
            >
              🧠 더 많은 진단 테스트
            </a>
          </div>
          <p className="text-[10px] text-slate-500">© 2026 POMYJO · <a href="https://hub.pomyjo.com" className="hover:text-slate-300">POMYJO 진단 허브</a> · 결과는 참고용입니다</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
