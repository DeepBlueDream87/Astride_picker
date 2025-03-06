import { Character } from '../types/character'

// 캐릭터 데이터
const characters: Character[] = [
  {
    id: '1',
    name: '불의 전사',
    rarity: 'SSR',
    attribute: 'Fire',
    imageUrl: '/images/characters/fire-warrior.png',
    description: '강력한 불의 힘을 다루는 전사',
    stats: {
      attack: 100,
      defense: 80,
      hp: 120,
      speed: 90,
    },
    skills: [
      {
        name: '화염 폭발',
        description: '적에게 강력한 화염 데미지를 입힙니다',
        cooldown: 3,
      },
    ],
  },
  {
    id: '2',
    name: '물의 마법사',
    rarity: 'SSR',
    attribute: 'Water',
    imageUrl: '/images/characters/water-mage.png',
    description: '물의 힘으로 적을 제압하는 마법사',
    stats: {
      attack: 85,
      defense: 60,
      hp: 90,
      speed: 95,
    },
    skills: [
      {
        name: '물의 폭포',
        description: '강력한 물의 폭포로 적을 공격합니다',
        cooldown: 4,
      },
    ],
  },
  {
    id: '3',
    name: '대지의 방패',
    rarity: 'SR',
    attribute: 'Earth',
    imageUrl: '/images/characters/earth-shield.png',
    description: '대지의 힘으로 동료를 지키는 방패',
    stats: {
      attack: 60,
      defense: 120,
      hp: 150,
      speed: 70,
    },
    skills: [
      {
        name: '대지의 방벽',
        description: '동료를 보호하는 방벽을 생성합니다',
        cooldown: 5,
      },
    ],
  },
  {
    id: '4',
    name: '바람의 궁수',
    rarity: 'SR',
    attribute: 'Wind',
    imageUrl: '/images/characters/wind-archer.png',
    description: '바람처럼 빠른 궁수',
    stats: {
      attack: 90,
      defense: 50,
      hp: 80,
      speed: 120,
    },
    skills: [
      {
        name: '바람의 화살',
        description: '바람을 타고 날아가는 화살을 발사합니다',
        cooldown: 2,
      },
    ],
  },
  {
    id: '5',
    name: '빛의 성직자',
    rarity: 'SR',
    attribute: 'Light',
    imageUrl: '/images/characters/light-priest.png',
    description: '빛의 힘으로 동료를 치유하는 성직자',
    stats: {
      attack: 40,
      defense: 70,
      hp: 100,
      speed: 85,
    },
    skills: [
      {
        name: '빛의 치유',
        description: '동료의 HP를 회복시킵니다',
        cooldown: 3,
      },
    ],
  },
  {
    id: '6',
    name: '어둠의 도적',
    rarity: 'SR',
    attribute: 'Dark',
    imageUrl: '/images/characters/dark-rogue.png',
    description: '어둠 속에서 적을 처치하는 도적',
    stats: {
      attack: 110,
      defense: 40,
      hp: 70,
      speed: 110,
    },
    skills: [
      {
        name: '어둠의 일격',
        description: '적의 약점을 노리는 치명적인 공격',
        cooldown: 4,
      },
    ],
  },
]

export const characterService = {
  // 캐릭터 목록 조회
  async getCharacters(): Promise<Character[]> {
    return characters
  },

  // 캐릭터 상세 정보 조회
  async getCharacterById(id: string): Promise<Character | null> {
    const character = characters.find((c) => c.id === id)
    return character || null
  },

  // 랜덤 파티 구성
  async generateParty(): Promise<Character[]> {
    const partySize = 3
    const party: Character[] = []
    const availableCharacters = [...characters]

    // 파티 구성 규칙
    const rules = {
      // 같은 속성은 최대 2명까지만
      maxSameAttribute: 2,
      // 같은 등급은 최대 2명까지만
      maxSameRarity: 2,
    }

    while (party.length < partySize) {
      const randomIndex = Math.floor(Math.random() * availableCharacters.length)
      const character = availableCharacters[randomIndex]

      // 속성 제한 체크
      const sameAttributeCount = party.filter((c) => c.attribute === character.attribute).length
      if (sameAttributeCount >= rules.maxSameAttribute) {
        continue
      }

      // 등급 제한 체크
      const sameRarityCount = party.filter((c) => c.rarity === character.rarity).length
      if (sameRarityCount >= rules.maxSameRarity) {
        continue
      }

      party.push(character)
      availableCharacters.splice(randomIndex, 1)
    }

    return party
  },
}
