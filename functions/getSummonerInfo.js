const axios = require('axios');

const API_KEY = process.env.RIOT_API_KEY;
const REGION = 'kr';

exports.handler = async (event, context) => {
  const summonerName = event.queryStringParameters.summonerName;

  try {
    // Riot API 요청
    const response = await axios.get(
      `https://${REGION}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`,
      { headers: { "X-Riot-Token": API_KEY } }
    );

    // 성공적으로 데이터를 가져오면 JSON 형태로 응답
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    // 에러가 발생하면 500 상태 코드로 반환
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "소환사 정보를 가져오는 중 오류 발생" }),
    };
  }
};
