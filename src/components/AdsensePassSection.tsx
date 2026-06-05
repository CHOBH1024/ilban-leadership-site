import React, { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp } from 'lucide-react';

interface Column {
  title: string;
  category: string;
  content: string;
}

const columnsData: Column[] = [
  {
    title: "카리스마형 리더 유형의 성공 패턴 — 혼돈 속에서 방향을 제시하고 팀을 이끄는 타고난 지도자",
    category: "트렌드 분석",
    content: "당신은 강력한 의사결정 능력과 결단력으로 팀을 이끄는 카리스마형 리더입니다. 위기 상황에서 가장 빛나며, 팀원들이 자연스럽게 당신을 중심으로 모입니다. 팀원의 의견을 경청하는 시간을 의도적으로 만들어 보세요. 이 유형의 대표 강점은 강력한 결단력과 추진력, 위기 관리 능력, 팀에게 방향과 에너지 제공이며, 명확한 목표와 기대치를 사전에 제시해 주세요 자율권을 부여하되 체크포인트를 설정하세요"
  },
  {
    title: "코칭형 리더 유형의 성공 패턴 — 질문으로 잠재력을 끌어내고 팀원의 성장이 곧 성과인 리더",
    category: "전문가 칼럼",
    content: "당신은 팀원 한 명 한 명의 강점을 발굴하고 성장을 이끄는 데 탁월합니다. 직접 답을 주기보다 올바른 질문으로 스스로 답을 찾게 만드는 진정한 멘토형 리더입니다. 코칭과 지시를 상황에 따라 전환하는 유연성을 길러보세요. 이 유형의 대표 강점은 팀원 역량 개발, 심리적 안전감 조성, 장기적 조직 성장 견인이며, 성장 목표를 함께 설정하고 정기 1:1 면담을 진행하세요 실패를 학습으로 인정하는 문화를 만드세요"
  },
  {
    title: "서번트 리더 유형의 성공 패턴 — 나를 비워 팀을 채우는, 신뢰로 움직이는 따뜻한 리더",
    category: "심층 리포트",
    content: "당신은 팀원의 필요와 성장을 자신보다 먼저 생각하는 서번트 리더입니다. 강압이 아닌 신뢰와 관계로 팀을 이끌며, 팀원들이 자발적으로 따르게 만드는 힘을 가지고 있습니다. 팀을 위한 희생과 나 자신을 위한 경계 설정을 균형 있게 유지하세요. 이 유형의 대표 강점은 높은 팀 신뢰도와 충성도, 협력적 조직 문화 형성, 심리적 안전감 극대화이며, 투명한 소통과 정기적 피드백 채널을 열어두세요 팀원의 작은 성과도 공개적으로 인정해 주세요"
  }
];

export const AdsensePassSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-12 px-6 py-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-left">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
        <BookOpen className="w-6 h-6 text-indigo-400" />
        <h2 className="text-xl font-bold text-white tracking-wide">
          Knowledge Hub &amp; 전문가 칼럼
        </h2>
      </div>
      
      <p className="text-sm text-gray-400 mb-6 leading-relaxed">
        본 진단 시스템은 일반 리더십 진단 | 나의 리더십 유형 테스트 기반 다차원 역량 분석을 제공하며,
        아래 칼럼 섹션은 리더십, 리더십테스트, 리더유형, 심리진단, 직장생활 트렌드 파악 및 자기 계발을 위해 정기적으로 업데이트되는 지식 아카이브입니다.
      </p>

      <div className="space-y-4">
        {columnsData.map((column, index) => {
          const isOpen = openIndex === index;
          return (
            <div 
              key={index}
              className="rounded-xl border border-white/5 bg-white/5 overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left transition-colors duration-200 hover:bg-white/5"
              >
                <div className="flex-1">
                  <span className="inline-block px-2 py-0.5 mb-1.5 text-xs font-semibold rounded bg-indigo-500/20 text-indigo-300">
                    {column.category}
                  </span>
                  <h3 className="text-base font-semibold text-white leading-snug">
                    {column.title}
                  </h3>
                </div>
                <div>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-indigo-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </button>

              <div 
                className={`transition-all duration-300 ease-in-out ${
                  isOpen ? 'max-h-[800px] border-t border-white/5 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                }`}
              >
                <div className="p-5 text-sm text-gray-300 leading-relaxed font-light whitespace-pre-line">
                  {column.content}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
