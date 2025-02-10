// React 컴포넌트에서 Netlify Functions 호출 예시
import { useState } from 'react';
import axios from 'axios';

const SearchBar = ({ onSearch }) => {
  const [summonerName, setSummonerName] = useState('');

  const handleSearch = async () => {
    if (summonerName.trim()) {
      try {
        // Netlify Function으로 요청 보내기
        const response = await axios.get(
          `/api/getSummonerInfo?summonerName=${summonerName}`
        );
        onSearch(response.data);  // 데이터 처리 함수 호출
      } catch (error) {
        console.error("소환사 정보를 가져오는 중 오류 발생", error);
      }
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="소환사명 입력"
        value={summonerName}
        onChange={(e) => setSummonerName(e.target.value)}
      />
      <button onClick={handleSearch}>검색</button>
    </div>
  );
};

export default SearchBar;
