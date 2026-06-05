const fs = require('fs');
let content = fs.readFileSync('src/data/surveys.ts', 'utf8');

// Replace some 'L' with 'R' and invert their text to introduce reverse-scored items.
const replacements = [
  // thinking
  { from: "q: '감정에 휩쓸려 판단을 그르친 경험이 거의 없다.'", to: "t: 'R' as const, q: '결정을 내릴 때 객관적 사실보다 직감에 의존하는 편이다.'" },
  { from: "q: '일이 잘 풀리고 있을 때에도 숨은 위험 요소를 찾으려 한다.'", to: "t: 'R' as const, q: '일단 상황이 좋으면 부정적인 변수는 무시하는 편이다.'" },
  // interaction
  { from: "q: '나는 다른 사람의 감정 변화를 표정만 보고도 알아챈다.'", to: "t: 'R' as const, q: '타인이 직접 말해주기 전까지 그들의 기분을 잘 눈치채지 못한다.'" },
  { from: "q: '나와 의견이 맞지 않는 사람과도 감정 상하지 않게 대화할 수 있다.'", to: "t: 'R' as const, q: '나와 반대되는 의견을 들으면 감정적으로 대응하게 된다.'" },
  // leadership
  { from: "q: '모든 일을 혼자 하기보다 적절한 사람에게 맡기는 것을 선호한다.'", to: "t: 'R' as const, q: '내가 직접 해야 마음이 놓여서 타인에게 일을 잘 맡기지 못한다.'" },
  { from: "q: '팀원이 \"모르겠다\"고 말하는 것을 자연스럽게 받아들인다.'", to: "t: 'R' as const, q: '팀원의 실수를 배움의 기회보다 질책의 대상으로 삼는 편이다.'" },
  // achievement
  { from: "q: '아무리 어려운 장애물이 나타나도 포기하지 않고 끝까지 해낸다.'", to: "t: 'R' as const, q: '프로젝트 도중 예상치 못한 큰 난관에 부딪히면 쉽게 포기하고 싶어진다.'" },
  { from: "q: '자원이 부족해도 핑계를 대기보다 가능한 대안을 찾아낸다.'", to: "t: 'R' as const, q: '주어진 자원이나 시간이 완벽하지 않으면 시작을 미루는 편이다.'" },
  // stability
  { from: "q: '비난이나 비판을 받아도 감정적으로 상처받기보다 배울 점을 찾는다.'", to: "t: 'R' as const, q: '동료의 작은 비판에도 오랫동안 상처를 받고 감정이 요동친다.'" },
  { from: "q: '갑작스러운 일정 변경이나 돌발 상황에서도 스트레스를 덜 받는다.'", to: "t: 'R' as const, q: '사전에 계획되지 않은 돌발 상황이 생기면 극심한 스트레스를 받는다.'" }
];

replacements.forEach(r => {
  // Replace only the 'L' type with 'R' if present, otherwise just replace the text
  const searchRegex = new RegExp(`t:\\s*'L'\\s*as\\s*const,\\s*` + r.from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  if (content.match(searchRegex)) {
    content = content.replace(searchRegex, r.to);
  } else {
    // maybe it doesn't match exactly, try simpler replace
    content = content.replace(r.from, r.to);
  }
});

fs.writeFileSync('src/data/surveys.ts', content, 'utf8');
console.log('Surveys updated with reverse-coded items');
