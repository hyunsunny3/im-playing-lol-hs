// App.js (메인 컴포넌트)
import { useState } from "react";
import { getSummonerInfo } from "./api/riotApi";
import SearchBar from "./components/SearchBar";

function App() {
  const [summoner, setSummoner] = useState(null); // 🔹 소환사 정보 저장
  const [error, setError] = useState("");

  const handleSearch = async (summonerName) => {
    setError("");
    setSummoner(null);

    const data = await getSummonerInfo(summonerName);
    if (!data) {
      setError("소환사 정보를 찾을 수 없습니다.");
      return;
    }

    setSummoner(data); // 🔹 소환사 정보 업데이트
  };

  return (
    <div>
      <h1>LoL 실시간 게임 조회</h1>
      <SearchBar onSearch={handleSearch} />

      {error && <p>{error}</p>}

      {summoner && (
        <div>
          <h2>{summoner.name} (LV {summoner.summonerLevel})</h2>
          <p>소환사 ID: {summoner.id}</p>
          <p>계정 ID: {summoner.accountId}</p>
        </div>
      )}
    </div>
  );
}

export default App;
