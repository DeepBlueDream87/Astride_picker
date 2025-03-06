/**
 * 캐릭터 이미지 경로를 반환하는 함수
 * @param imageFileName 이미지 파일명
 * @returns 이미지 전체 경로
 */
export const getCharacterImagePath = (imageFileName: string): string => {
  return `/images/characters/${imageFileName}`;
};

/**
 * 이미지 존재 여부를 확인하는 함수
 * @param imageFileName 이미지 파일명
 * @returns 이미지 존재 여부 (Promise<boolean>)
 */
export const checkImageExists = async (imageFileName: string): Promise<boolean> => {
  try {
    const response = await fetch(getCharacterImagePath(imageFileName));
    return response.ok;
  } catch {
    return false;
  }
}; 