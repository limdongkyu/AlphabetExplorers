// 알파벳 데이터와 각 알파벳으로 시작하는 단어들
export interface Word {
  word: string; // 영어 단어
  korean: string; // 한국어 뜻
  emoji: string; // 시각적 표시용 이모지
}

export interface AlphabetData {
  uppercase: string; // 대문자
  lowercase: string; // 소문자
  name: string; // 알파벳 이름 (예: "에이")
  words: Word[]; // 해당 알파벳으로 시작하는 단어들
}

export const alphabetData: AlphabetData[] = [
  {
    uppercase: 'A',
    lowercase: 'a',
    name: '에이',
    words: [
      { word: 'Apple', korean: '사과', emoji: '🍎' },
      { word: 'Ant', korean: '개미', emoji: '🐜' },
      { word: 'Airplane', korean: '비행기', emoji: '✈️' },
      { word: 'Angel', korean: '천사', emoji: '👼' },
      { word: 'Arm', korean: '팔', emoji: '💪' },
    ],
  },
  {
    uppercase: 'B',
    lowercase: 'b',
    name: '비',
    words: [
      { word: 'Ball', korean: '공', emoji: '⚽' },
      { word: 'Bird', korean: '새', emoji: '🐦' },
      { word: 'Bear', korean: '곰', emoji: '🐻' },
      { word: 'Book', korean: '책', emoji: '📚' },
      { word: 'Banana', korean: '바나나', emoji: '🍌' },
    ],
  },
  {
    uppercase: 'C',
    lowercase: 'c',
    name: '씨',
    words: [
      { word: 'Cat', korean: '고양이', emoji: '🐱' },
      { word: 'Car', korean: '자동차', emoji: '🚗' },
      { word: 'Cake', korean: '케이크', emoji: '🎂' },
      { word: 'Cow', korean: '소', emoji: '🐄' },
      { word: 'Cloud', korean: '구름', emoji: '☁️' },
    ],
  },
  {
    uppercase: 'D',
    lowercase: 'd',
    name: '디',
    words: [
      { word: 'Dog', korean: '강아지', emoji: '🐶' },
      { word: 'Duck', korean: '오리', emoji: '🦆' },
      { word: 'Dinosaur', korean: '공룡', emoji: '🦕' },
      { word: 'Door', korean: '문', emoji: '🚪' },
      { word: 'Doll', korean: '인형', emoji: '🎎' },
    ],
  },
  {
    uppercase: 'E',
    lowercase: 'e',
    name: '이',
    words: [
      { word: 'Elephant', korean: '코끼리', emoji: '🐘' },
      { word: 'Egg', korean: '달걀', emoji: '🥚' },
      { word: 'Eagle', korean: '독수리', emoji: '🦅' },
      { word: 'Eye', korean: '눈', emoji: '👁️' },
      { word: 'Earth', korean: '지구', emoji: '🌍' },
    ],
  },
  {
    uppercase: 'F',
    lowercase: 'f',
    name: '에프',
    words: [
      { word: 'Fish', korean: '물고기', emoji: '🐠' },
      { word: 'Flower', korean: '꽃', emoji: '🌸' },
      { word: 'Frog', korean: '개구리', emoji: '🐸' },
      { word: 'Fire', korean: '불', emoji: '🔥' },
      { word: 'Fox', korean: '여우', emoji: '🦊' },
    ],
  },
  {
    uppercase: 'G',
    lowercase: 'g',
    name: '지',
    words: [
      { word: 'Giraffe', korean: '기린', emoji: '🦒' },
      { word: 'Gift', korean: '선물', emoji: '🎁' },
      { word: 'Guitar', korean: '기타', emoji: '🎸' },
      { word: 'Grass', korean: '잔디', emoji: '🌱' },
      { word: 'Girl', korean: '소녀', emoji: '👧' },
    ],
  },
  {
    uppercase: 'H',
    lowercase: 'h',
    name: '에이치',
    words: [
      { word: 'House', korean: '집', emoji: '🏠' },
      { word: 'Heart', korean: '하트', emoji: '❤️' },
      { word: 'Horse', korean: '말', emoji: '🐴' },
      { word: 'Hat', korean: '모자', emoji: '🎩' },
      { word: 'Hand', korean: '손', emoji: '✋' },
    ],
  },
  {
    uppercase: 'I',
    lowercase: 'i',
    name: '아이',
    words: [
      { word: 'Ice', korean: '얼음', emoji: '🧊' },
      { word: 'Ice cream', korean: '아이스크림', emoji: '🍦' },
      { word: 'Igloo', korean: '이글루', emoji: '🏠' },
      { word: 'Island', korean: '섬', emoji: '🏝️' },
      { word: 'Insect', korean: '곤충', emoji: '🐛' },
    ],
  },
  {
    uppercase: 'J',
    lowercase: 'j',
    name: '제이',
    words: [
      { word: 'Jellyfish', korean: '해파리', emoji: '🎐' },
      { word: 'Juice', korean: '주스', emoji: '🧃' },
      { word: 'Jacket', korean: '재킷', emoji: '🧥' },
      { word: 'Jelly', korean: '젤리', emoji: '🍮' },
      { word: 'Jump', korean: '뛰기', emoji: '🦘' },
    ],
  },
  {
    uppercase: 'K',
    lowercase: 'k',
    name: '케이',
    words: [
      { word: 'Kangaroo', korean: '캥거루', emoji: '🦘' },
      { word: 'Key', korean: '열쇠', emoji: '🔑' },
      { word: 'King', korean: '왕', emoji: '👑' },
      { word: 'Kite', korean: '연', emoji: '🪁' },
      { word: 'Koala', korean: '코알라', emoji: '🐨' },
    ],
  },
  {
    uppercase: 'L',
    lowercase: 'l',
    name: '엘',
    words: [
      { word: 'Lion', korean: '사자', emoji: '🦁' },
      { word: 'Leaf', korean: '나뭇잎', emoji: '🍃' },
      { word: 'Lamp', korean: '램프', emoji: '💡' },
      { word: 'Lollipop', korean: '막대사탕', emoji: '🍭' },
      { word: 'Lemon', korean: '레몬', emoji: '🍋' },
    ],
  },
  {
    uppercase: 'M',
    lowercase: 'm',
    name: '엠',
    words: [
      { word: 'Moon', korean: '달', emoji: '🌙' },
      { word: 'Monkey', korean: '원숭이', emoji: '🐵' },
      { word: 'Mouse', korean: '쥐', emoji: '🐭' },
      { word: 'Milk', korean: '우유', emoji: '🥛' },
      { word: 'Music', korean: '음악', emoji: '🎵' },
    ],
  },
  {
    uppercase: 'N',
    lowercase: 'n',
    name: '엔',
    words: [
      { word: 'Nest', korean: '둥지', emoji: '🪺' },
      { word: 'Nose', korean: '코', emoji: '👃' },
      { word: 'Net', korean: '그물', emoji: '🕸️' },
      { word: 'Night', korean: '밤', emoji: '🌃' },
      { word: 'Nurse', korean: '간호사', emoji: '👩‍⚕️' },
    ],
  },
  {
    uppercase: 'O',
    lowercase: 'o',
    name: '오',
    words: [
      { word: 'Octopus', korean: '문어', emoji: '🐙' },
      { word: 'Orange', korean: '오렌지', emoji: '🍊' },
      { word: 'Owl', korean: '올빼미', emoji: '🦉' },
      { word: 'Ocean', korean: '바다', emoji: '🌊' },
      { word: 'Onion', korean: '양파', emoji: '🧅' },
    ],
  },
  {
    uppercase: 'P',
    lowercase: 'p',
    name: '피',
    words: [
      { word: 'Pig', korean: '돼지', emoji: '🐷' },
      { word: 'Penguin', korean: '펭귄', emoji: '🐧' },
      { word: 'Pizza', korean: '피자', emoji: '🍕' },
      { word: 'Plant', korean: '식물', emoji: '🌿' },
      { word: 'Pencil', korean: '연필', emoji: '✏️' },
    ],
  },
  {
    uppercase: 'Q',
    lowercase: 'q',
    name: '큐',
    words: [
      { word: 'Queen', korean: '여왕', emoji: '👸' },
      { word: 'Quilt', korean: '이불', emoji: '🛏️' },
      { word: 'Quack', korean: '꽥꽥', emoji: '🦆' },
      { word: 'Question', korean: '질문', emoji: '❓' },
      { word: 'Quiet', korean: '조용한', emoji: '🤫' },
    ],
  },
  {
    uppercase: 'R',
    lowercase: 'r',
    name: '알',
    words: [
      { word: 'Rabbit', korean: '토끼', emoji: '🐰' },
      { word: 'Rainbow', korean: '무지개', emoji: '🌈' },
      { word: 'Robot', korean: '로봇', emoji: '🤖' },
      { word: 'Rose', korean: '장미', emoji: '🌹' },
      { word: 'Rocket', korean: '로켓', emoji: '🚀' },
    ],
  },
  {
    uppercase: 'S',
    lowercase: 's',
    name: '에스',
    words: [
      { word: 'Star', korean: '별', emoji: '⭐' },
      { word: 'Sun', korean: '태양', emoji: '☀️' },
      { word: 'Snake', korean: '뱀', emoji: '🐍' },
      { word: 'Sheep', korean: '양', emoji: '🐑' },
      { word: 'Spoon', korean: '숟가락', emoji: '🥄' },
    ],
  },
  {
    uppercase: 'T',
    lowercase: 't',
    name: '티',
    words: [
      { word: 'Tiger', korean: '호랑이', emoji: '🐯' },
      { word: 'Tree', korean: '나무', emoji: '🌳' },
      { word: 'Train', korean: '기차', emoji: '🚂' },
      { word: 'Toy', korean: '장난감', emoji: '🧸' },
      { word: 'Turtle', korean: '거북이', emoji: '🐢' },
    ],
  },
  {
    uppercase: 'U',
    lowercase: 'u',
    name: '유',
    words: [
      { word: 'Umbrella', korean: '우산', emoji: '☂️' },
      { word: 'Unicorn', korean: '유니콘', emoji: '🦄' },
      { word: 'Up', korean: '위', emoji: '⬆️' },
      { word: 'Under', korean: '아래', emoji: '⬇️' },
      { word: 'Utensil', korean: '도구', emoji: '🍴' },
    ],
  },
  {
    uppercase: 'V',
    lowercase: 'v',
    name: '브이',
    words: [
      { word: 'Violin', korean: '바이올린', emoji: '🎻' },
      { word: 'Vase', korean: '꽃병', emoji: '🏺' },
      { word: 'Vegetable', korean: '채소', emoji: '🥕' },
      { word: 'Volcano', korean: '화산', emoji: '🌋' },
      { word: 'Van', korean: '밴', emoji: '🚐' },
    ],
  },
  {
    uppercase: 'W',
    lowercase: 'w',
    name: '더블유',
    words: [
      { word: 'Water', korean: '물', emoji: '💧' },
      { word: 'Whale', korean: '고래', emoji: '🐋' },
      { word: 'Wind', korean: '바람', emoji: '💨' },
      { word: 'Window', korean: '창문', emoji: '🪟' },
      { word: 'Worm', korean: '벌레', emoji: '🐛' },
    ],
  },
  {
    uppercase: 'X',
    lowercase: 'x',
    name: '엑스',
    words: [
      { word: 'X-ray', korean: '엑스레이', emoji: '🦴' },
      { word: 'Xylophone', korean: '실로폰', emoji: '🎹' },
      { word: 'Fox', korean: '여우 (x 포함)', emoji: '🦊' },
      { word: 'Box', korean: '상자 (x 포함)', emoji: '📦' },
      { word: 'Ax', korean: '도끼 (x 포함)', emoji: '🪓' },
    ],
  },
  {
    uppercase: 'Y',
    lowercase: 'y',
    name: '와이',
    words: [
      { word: 'Yak', korean: '야크', emoji: '🐃' },
      { word: 'Yellow', korean: '노란색', emoji: '🟡' },
      { word: 'Yarn', korean: '실', emoji: '🧶' },
      { word: 'Yacht', korean: '요트', emoji: '⛵' },
      { word: 'Yo-yo', korean: '요요', emoji: '🪀' },
    ],
  },
  {
    uppercase: 'Z',
    lowercase: 'z',
    name: '제드',
    words: [
      { word: 'Zebra', korean: '얼룩말', emoji: '🦓' },
      { word: 'Zoo', korean: '동물원', emoji: '🐾' },
      { word: 'Zip', korean: '지퍼', emoji: '🤐' },
      { word: 'Zero', korean: '영', emoji: '0️⃣' },
      { word: 'Zipper', korean: '지퍼', emoji: '🔗' },
    ],
  },
];

// 진행 상황 저장/불러오기 유틸 함수
export interface ProgressData {
  [letter: string]: {
    completed: boolean;
    stars: number; // 0-3
    practiced: boolean; // 쓰기 연습 했는지
  };
}

export const saveProgress = (letter: string, data: Partial<ProgressData[string]>) => {
  const current = getProgress();
  current[letter] = { ...current[letter], ...data };
  localStorage.setItem('alphabetProgress', JSON.stringify(current));
};

export const getProgress = (): ProgressData => {
  if (typeof window === 'undefined') return {};
  const saved = localStorage.getItem('alphabetProgress');
  return saved ? JSON.parse(saved) : {};
};

export const getLetterProgress = (letter: string) => {
  const progress = getProgress();
  return progress[letter] || { completed: false, stars: 0, practiced: false };
};

// 진행 상황 초기화 함수
export const resetProgress = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('alphabetProgress');
    return true;
  }
  return false;
};

