import { SurveyConfig, SurveyResultContent, AnswerData } from '../types';

function getResultContent(avg: number, _cats: number[], _answers?: Record<number, AnswerData>): SurveyResultContent {
  if (avg >= 75) {
    return {
      persona: "카리스마형 리더",
      emoji: "🦅",
      hashtags: ["#강한결단력","#카리스마","#타고난리더"],
      headline: "혼돈 속에서 방향을 제시하고 팀을 이끄는 타고난 지도자",
      description: "당신은 강력한 의사결정 능력과 결단력으로 팀을 이끄는 카리스마형 리더입니다. 위기 상황에서 가장 빛나며, 팀원들이 자연스럽게 당신을 중심으로 모입니다.",
      strengths: ["강력한 결단력과 추진력","위기 관리 능력","팀에게 방향과 에너지 제공"],
      weaknesses: ["독단적 결정으로 팀원 소외 가능","속도를 중시해 세부사항 놓침"],
      advice: "팀원의 의견을 경청하는 시간을 의도적으로 만들어 보세요.",
      workManual: ["명확한 목표와 기대치를 사전에 제시해 주세요","자율권을 부여하되 체크포인트를 설정하세요"],
      worstMatch: {"type":"완벽주의 분석가","description":"빠른 결정과 느린 검토 사이의 충돌이 잦습니다.","handling":"핵심 데이터만 먼저 보고받고 결정하는 프로세스를 구축하세요."},
      bestMatch: {"type":"실행형 부리더","emoji":"⚡","description":"비전을 현실로 빠르게 구현해주는 최고의 파트너"},
      leadershipFit: []
    };
  }
  if (avg >= 45) {
    return {
      persona: "코칭형 리더",
      emoji: "🌱",
      hashtags: ["#인재육성","#공감리더십","#성장촉진자"],
      headline: "질문으로 잠재력을 끌어내고 팀원의 성장이 곧 성과인 리더",
      description: "당신은 팀원 한 명 한 명의 강점을 발굴하고 성장을 이끄는 데 탁월합니다. 직접 답을 주기보다 올바른 질문으로 스스로 답을 찾게 만드는 진정한 멘토형 리더입니다.",
      strengths: ["팀원 역량 개발","심리적 안전감 조성","장기적 조직 성장 견인"],
      weaknesses: ["단기 성과 압박 상황에서 속도 부족","우유부단해 보일 수 있음"],
      advice: "코칭과 지시를 상황에 따라 전환하는 유연성을 길러보세요.",
      workManual: ["성장 목표를 함께 설정하고 정기 1:1 면담을 진행하세요","실패를 학습으로 인정하는 문화를 만드세요"],
      worstMatch: {"type":"즉각 결과 요구자","description":"장기 성장보다 단기 실적을 우선시하는 상사와 충돌합니다.","handling":"단기 지표와 장기 역량 지표를 함께 보고하세요."},
      bestMatch: {"type":"성장 지향 팀원","emoji":"📈","description":"피드백을 에너지로 삼아 빠르게 성장하는 팀원과 최고의 시너지"},
      leadershipFit: []
    };
  }
  if (avg >= 0) {
    return {
      persona: "서번트 리더",
      emoji: "🤝",
      hashtags: ["#섬김의리더십","#팀우선","#신뢰구축"],
      headline: "나를 비워 팀을 채우는, 신뢰로 움직이는 따뜻한 리더",
      description: "당신은 팀원의 필요와 성장을 자신보다 먼저 생각하는 서번트 리더입니다. 강압이 아닌 신뢰와 관계로 팀을 이끌며, 팀원들이 자발적으로 따르게 만드는 힘을 가지고 있습니다.",
      strengths: ["높은 팀 신뢰도와 충성도","협력적 조직 문화 형성","심리적 안전감 극대화"],
      weaknesses: ["강한 외부 압박 시 결단력 부족","팀원의 눈치를 지나치게 볼 수 있음"],
      advice: "팀을 위한 희생과 나 자신을 위한 경계 설정을 균형 있게 유지하세요.",
      workManual: ["투명한 소통과 정기적 피드백 채널을 열어두세요","팀원의 작은 성과도 공개적으로 인정해 주세요"],
      worstMatch: {"type":"권위적 상사","description":"수직적 명령 구조에서 자신의 리더십 철학과 마찰이 생깁니다.","handling":"위로는 결과로, 아래로는 과정으로 신뢰를 쌓으세요."},
      bestMatch: {"type":"자기주도형 팀원","emoji":"🌟","description":"자율성을 부여받으면 스스로 빛나는 팀원과 환상적 조합"},
      leadershipFit: []
    };
  }
  // 기본값 — minScore: 0 페르소나가 항상 캐치함
  throw new Error('페르소나 매핑 실패: minScore 0인 항목이 필요합니다');
}

export const surveys: SurveyConfig[] = [
  {
    id: "leadership-test",
    name: "리더십 유형 진단",
    title: "일반 리더십 진단 | 나의 리더십 유형 테스트",
    subtitle: "당신 안의 리더를 깨워드립니다",
    description: "심리학 기반 리더십 분석으로 당신의 타고난 리더십 스타일을 발견하세요. 카리스마형, 서번트형, 코칭형 중 당신은?",
    color: "#4f46e5",
    icon: "🦅",
    categories: ["결단력","공감능력","비전제시","실행력"],
    questions: [
  { c: 1, t: 'L', q: "팀의 방향이 불분명할 때 내가 먼저 결정을 내리는 편이다." },
  { c: 1, t: 'L', q: "위기 상황에서 오히려 더 침착해지고 집중력이 높아진다." },
  { c: 2, t: 'L', q: "팀원의 감정 상태를 파악하고 배려하는 것이 자연스럽다." },
  { c: 2, t: 'L', q: "구성원이 성장하는 것을 보면 나 자신의 성과보다 더 뿌듯하다." },
  { c: 3, t: 'L', q: "5년 후, 10년 후의 큰 그림을 그리고 팀과 공유하는 것을 즐긴다." },
  { c: 3, t: 'L', q: "나의 열정과 비전이 주변 사람들에게 동기를 불어넣는다고 느낀다." },
  { c: 4, t: 'L', q: "계획보다 빠른 실행과 시도를 더 중요하게 여긴다." },
  { c: 4, t: 'L', q: "맡은 일은 어떤 장애물이 있어도 끝까지 해내는 추진력이 있다." }
    ],
    getResultContent
  }
];
