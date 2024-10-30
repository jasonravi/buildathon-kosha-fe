import http from '../../utils/http';
const userId = localStorage.getItem('userId');

export const getMonthlyData = async () => {
  const response = await http.get(`financial-data/${userId}/monthly-data`);
  return response;
};

export const getPortfolioData = async () => {
  const response = await http.get(
    `financial-data/${userId}/investment-portfolio`,
  );
  return response;
};

export const getFinancialScore = async () => {
  const response = await http.get(`financial-data/${userId}/health-score`);
  return response;
};

//https://kosha.platform.dreamx-dev.tech/v1/kosha/recommendations/45?user=true
export const getUserRecommendation = async (isUser: boolean = true) => {
  return await http.get(`recommendations/${userId}?user=${isUser}`);
  // return await http.get(`recommendations/45?user=true`);
};

export const getSystemRecommendation = async () => {
  return await http.get(`recommendations/${userId}?user=false`);
};
