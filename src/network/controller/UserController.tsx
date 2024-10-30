import http from '../../utils/http';

import { Goal, User } from '../models/User';

export const updateUser = async (user: User) => {
  const response = await http.post('user', user);
  return response;
};

export const saveGoal = async (
  goal: Goal,
  userId: string,
  handle: string = '',
) => {
  const response = await http.post(
    `user/goal/${userId}?handle=${handle}`,
    goal,
  );
  return response;
};

//https://kosha.platform.dreamx-dev.tech/v1/kosha/financial-data/1/total-wealth
export const getNetWorth = async (userId: string) => {
  const response = await http.get(`financial-data/${userId}/total-wealth`);
  return response;
};

//kosha.platform.dreamx-dev.tech/v1/kosha/financial-data/1/investment-portfolio
export const getInvestmentPortfolio = async (userId: string) => {
  const response = await http.get(
    `financial-data/${userId}/investment-portfolio`,
  );
  return response;
};

//https://kosha.platform.dreamx-dev.tech/v1/kosha/user/goal/43
export const getGoals = async (userId: string) => {
  const response = await http.get(`user/goal/${userId}`);
  return response;
};
