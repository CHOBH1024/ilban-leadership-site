const fs = require('fs');
let content = fs.readFileSync('src/data/surveys.ts', 'utf8');

const pointsData = {
  thinking: [
    {icon: '🔍', title: '논리적 추론 패턴', description: '복잡한 정보를 해체하고 데이터를 기반으로 최적의 해답을 도출하는 당신만의 사고 알고리즘을 분석합니다.'},
    {icon: '🧠', title: '인지적 편향(Bias) 탐지', description: '무의식적으로 빠지기 쉬운 확증 편향과 오류를 객관적으로 측정하여 판단의 사각지대를 밝혀냅니다.'},
    {icon: '⚡', title: '직관과 데이터의 배합', description: '가설을 세우는 직관력과 이를 검증하는 논리력이 어떤 비율로 융합되어 있는지 확인합니다.'},
    {icon: '🛡️', title: '리스크 관리 역량', description: '위험 요소를 사전에 탐지하고 불확실성 속에서도 가장 안전하고 효율적인 경로를 설계하는 능력을 측정합니다.'}
  ],
  interaction: [
    {icon: '🤝', title: '관계 역학 패턴', description: '갈등 상황이나 협업 시 타인과 어떻게 상호작용하며 시너지를 만들어내는지 분석합니다.'},
    {icon: '📡', title: '비언어적 해독력', description: '말하지 않아도 눈빛과 분위기만으로 상대의 진의를 파악하는 공감의 해상도를 측정합니다.'},
    {icon: '🕸️', title: '전략적 네트워킹', description: '단순한 인맥 관리를 넘어 관계 자산을 어떻게 설계하고 활용하는지 아키텍처를 분석합니다.'},
    {icon: '⚖️', title: '갈등 중재 스타일', description: '의견이 충돌할 때 승패를 가르지 않고 윈윈(Win-Win)을 도출하는 당신만의 협상 방식을 파악합니다.'}
  ],
  leadership: [
    {icon: '👑', title: '권한 위임 스펙트럼', description: '마이크로 매니징부터 완전 자율까지, 팀원의 잠재력을 끌어올리는 당신의 통제 방식을 진단합니다.'},
    {icon: '🔭', title: '비전 캐스팅 역량', description: '위기 속에서도 흔들리지 않는 목표를 설정하고 구성원들을 한 방향으로 정렬시키는 능력을 측정합니다.'},
    {icon: '🌱', title: '심리적 안전감 설계', description: '팀원들이 실패를 두려워하지 않고 혁신을 시도할 수 있는 환경을 얼마나 잘 구축하는지 분석합니다.'},
    {icon: '🔥', title: '동기 부여 메커니즘', description: '명령이 아닌 맥락과 의미를 통해 자발적이고 폭발적인 실행력을 이끌어내는 리더십 톤을 확인합니다.'}
  ],
  achievement: [
    {icon: '🔥', title: '그릿(Grit)과 끈기', description: '수차례의 실패와 좌절 속에서도 포기하지 않고 끝까지 목표를 완수해내는 집요함을 측정합니다.'},
    {icon: '🎯', title: '우선순위 최적화', description: '한정된 시간과 에너지 속에서 가장 임팩트 있는 핵심 과제(20%)에 집중하는 능력을 분석합니다.'},
    {icon: '🧩', title: '제약 돌파 역량', description: '예산과 자원이 부족한 악조건을 오히려 창의적 혁신의 발판으로 삼는 자원 연금술을 파악합니다.'},
    {icon: '⚙️', title: '실행 시스템화', description: '일회성 성공에 그치지 않고 지속 가능한 성과를 내기 위해 프로세스를 구축하는 역량을 측정합니다.'}
  ],
  stability: [
    {icon: '🛡️', title: '회복 탄력성(Resilience)', description: '심리적 타격을 입었을 때 얼마나 빠르게 본래의 평정심과 성과 궤도로 돌아오는지 분석합니다.'},
    {icon: '🖼️', title: '위기 리프레이밍', description: '부정적 사건을 성장의 기회로 재해석하여 스트레스 압박을 돌파 에너지로 변환하는 능력을 측정합니다.'},
    {icon: '🔋', title: '에너지 분배 전략', description: '번아웃을 예방하기 위해 몰입과 휴식의 사이클을 어떻게 관리하고 통제하는지 파악합니다.'},
    {icon: '🧊', title: '감정 분리 역량', description: '혼돈 속에서도 감정과 사실을 철저히 분리하여 냉철한 객관성을 유지하는 심리적 방어력을 진단합니다.'}
  ],
  growth: [
    {icon: '🧬', title: '학습 민첩성(Agility)', description: '완전히 낯선 환경과 새로운 지식 체계에 던져졌을 때 얼마나 빠르게 흡수하고 적응하는지 측정합니다.'},
    {icon: '🗑️', title: '언러닝(Unlearning) 속도', description: '과거의 성공 공식이나 낡은 지식을 과감히 버리고 새로운 패러다임을 받아들이는 유연성을 분석합니다.'},
    {icon: '🌐', title: '크로스오버 지능', description: '자신의 전문 분야를 넘어 이질적인 지식들을 연결하고 융합하여 파괴적 혁신을 만드는 능력을 파악합니다.'},
    {icon: '🔭', title: '피드백 수용력', description: '비판과 거절을 방어적으로 대하지 않고 성장을 위한 가장 강력한 연료로 활용하는 태도를 진단합니다.'}
  ],
  competency: [
    {icon: '⛏️', title: '딥 다이브(Deep Dive) 역량', description: '하나의 도메인을 끝까지 파고들어 대체 불가능한 수준의 전문성으로 승화시키는 집요함을 측정합니다.'},
    {icon: '🏦', title: '신뢰 자산 구축력', description: '작은 약속의 이행과 일관된 태도를 통해 동료와 클라이언트에게 보증수표가 되는 과정을 분석합니다.'},
    {icon: '🌱', title: '지식 레버리지', description: '혼자만 아는 것을 넘어 노하우를 시스템화하고 조직 전체의 수준을 끌어올리는 역량을 파악합니다.'},
    {icon: '⚖️', title: '윤리적 잣대', description: '단기적 이익의 유혹 앞에서도 장기적인 가치와 직업적 원칙을 타협하지 않는 단단함을 진단합니다.'}
  ],
  passion: [
    {icon: '🎶', title: '내적 동기 트리거', description: '단순한 보상이나 압박이 아닌, 당신의 심장을 뛰게 하고 자발적으로 밤을 새게 만드는 진짜 이유를 찾습니다.'},
    {icon: '🏄‍♂️', title: '플로우(Flow) 진입력', description: '난이도와 실력의 균형점에서 시공간을 잊고 완벽한 몰입의 상태로 빠져드는 능력을 측정합니다.'},
    {icon: '🌟', title: '소명(Calling) 재정의', description: '주어진 직무를 단순한 밥벌이가 아닌 삶의 목적과 일치시키는 의미 부여의 수준을 분석합니다.'},
    {icon: '🔥', title: '전염성 있는 열정', description: '자신의 에너지가 주변 사람들에게 얼마나 긍정적으로 파급되고 팀을 깨우는지 진단합니다.'}
  ],
  vision: [
    {icon: '🌌', title: '패턴 인식력(Connecting Dots)', description: '무관해 보이는 파편화된 정보들 속에서 미래의 거대한 메가트렌드와 맥락을 읽어내는 능력을 파악합니다.'},
    {icon: '🎲', title: '시나리오 플래닝', description: '단일한 예측에 기대지 않고 다중 미래를 입체적으로 설계하여 불확실성에 대비하는 역량을 분석합니다.'},
    {icon: '💥', title: '패러다임 파괴력', description: '기존의 룰 안에서 승리하는 것을 넘어, 게임의 법칙 자체를 새로 정의하고 시장을 리드하는 힘을 진단합니다.'},
    {icon: '🧭', title: '가치 지향성', description: '기술의 발전 속에서도 흔들리지 않는 인류의 본질적 가치와 철학을 비즈니스에 녹여내는 깊이를 측정합니다.'}
  ]
};

Object.keys(pointsData).forEach(id => {
  const pointsStr = JSON.stringify(pointsData[id], null, 4);
  const regex = new RegExp(`(id:\\s*['"]${id}['"],\\s*name:\\s*['"][^'"]+['"],)`);
  content = content.replace(regex, `$1\n  keyPoints: ${pointsStr},`);
});

fs.writeFileSync('src/data/surveys.ts', content, 'utf8');
