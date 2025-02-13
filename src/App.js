import React, { useState } from "react";
import axios from "axios";

const RiotSummonerSearch = () => {
  const API_KEY = process.env.REACT_APP_RIOT_API_KEY;

  const [gameName, setGameName] = useState("");
  const [tagLine, setTagLine] = useState("");
  const [summoner, setSummoner] = useState(null);
  const [summonerDetail, setSummonerDetail] = useState(null);
  const [spectator, setSpectator] = useState(null);
  const [error, setError] = useState(null);

  const summonerInfo = async () => {
    if (!gameName || !tagLine) {
      setError("gameName & tagLine를 입력하세요.");
      return;
    }

    setError(null);
    setSummoner(null);
    
    try {
      const response = await axios.get(
        `https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`,
        {
          headers: {
            "X-Riot-Token": API_KEY,
          },
        }
      );
      setSummoner(response.data);
      summonerInfoId(response.data.puuid);
      existSpectator(response.data.puuid);
    } catch (err) {
      setError("소환사 정보가 없습니다.");
    }
  };

  const summonerInfoId = async (puuid) => {
    try {
      const response = await axios.get(
        `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`,
        {
          headers: {
            "X-Riot-Token": API_KEY,
          },
        }
      );
      setSummonerDetail(response.data);
    } catch (err) {
      setError("소환사 정보가 없습니다.");
    }
  };

  const existSpectator = async (puuid) => {
    try {
      const response = await axios.get(
        `https://kr.api.riotgames.com/lol/spectator/v5/active-games/by-summoner/${puuid}`,
        {
          headers: {
            "X-Riot-Token": API_KEY,
          }
        }
      );
      setSpectator(response.data);
    }catch (err) {
      setError("게임중이 아닙니다");
    }
  };

  return (
    <div>
      <h2>소환사 검색</h2>
      <div>
        <input
          type="text"
          placeholder="gameName"
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="tagLine"
          value={tagLine}
          onChange={(e) => setTagLine(e.target.value)}
        />
      </div>
      <button onClick={summonerInfo}>검색</button>
      {error && <p>{error}</p>}
      {summoner && (
        <div>
          <p>gameName: {summoner.gameName}</p>
          <p>tagLine: {summoner.tagLine}</p>
          <p>PUUID: {summoner.puuid}</p>
        </div>
      )}
      {summonerDetail && (
        <div>
          <p>id: {summonerDetail.id}</p>
          <p>accountId: {summonerDetail.accountId}</p>
          <p>summonerLevel: {summonerDetail.summonerLevel}</p>
        </div>
      )}
      {spectator && (
        <div>
          <p>gameId: {spectator.gameId}</p>
        </div>
      )}
    </div>
  );
};

export default RiotSummonerSearch;
