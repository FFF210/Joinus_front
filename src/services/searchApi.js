import { myAxios } from '../config';

/**
 * 검색 API 호출
 * @param {Object} searchParams - 검색 파라미터
 * @param {string} searchParams.keyword - 검색 키워드
 * @param {Array<string>} searchParams.categories - 카테고리 리스트
 * @param {Array<string>} searchParams.priceRanges - 가격대 리스트
 * @param {string} searchParams.sortBy - 정렬 기준 ("인기순", "최신순", "마감임박순")
 * @returns {Promise<Object>} { proposals, ongoing, totalCount }
 */
export const searchProducts = async (searchParams) => {
  try {
    const response = await myAxios().post('/api/search', searchParams);
    return response.data;
  } catch (error) {
    console.error('검색 API 호출 실패:', error);
    throw error;
  }
};

