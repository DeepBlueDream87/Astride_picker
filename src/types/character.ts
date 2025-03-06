// 캐릭터 타입 (강공, 격파, 방어, 지원, 이상)
export type CharacterType = '강공' | '격파' | '방어' | '지원' | '이상';

// 속성 타입 (물리, 전기, 에테르, 불, 얼음, 서릿불)
export type ElementType = '물리' | '전기' | '에테르' | '불' | '얼음' | '서릿불';

// 등급 타입
export type Grade = 'S' | 'A';

// 진영 타입
export type Faction = 
  | '교활한토끼굴'
  | '벨로보그 중공업'
  | '빅토리아 하우스 키핑'
  | '오볼로스 소대'
  | '형사특수팀'
  | '대공동 6과'
  | '스타즈 오브 리라'
  | '칼리돈의 자손';

// 캐릭터 인터페이스
export interface Character {
  id: string;           // 고유 식별자
  name: string;         // 캐릭터 이름
  faction: Faction;     // 소속 진영
  type: CharacterType;  // 캐릭터 타입
  element: ElementType; // 속성
  grade: Grade;         // 등급
  imageFileName: string; // 이미지 파일명
} 