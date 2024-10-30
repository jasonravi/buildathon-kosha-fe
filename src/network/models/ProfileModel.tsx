export type MonthlyData = {
  months: string[];
  assets: number[];
  liabilities: number[];
  spends: number[];
};

export type PortfolioData = {
  category: string;
  totalValue: string;
  items: Item[];
};

export type Item = {
  name: string;
  value: number;
};

export type FinancialScore = {
  score: string;
  description: string;
  details: FinancialScoreDetails;
};

export type FinancialScoreDetails = {
  financialScore: ScoreDetailMeta[];
  demographicScore: ScoreDetailMeta[];
  finalScore: string;
};

export type ScoreDetailMeta = {
  category: string;
  score: number;
  weightage: number;
};

export class Convert {
  public static toMonthlyData(json: string): MonthlyData {
    return JSON.parse(json);
  }

  public static monthlyDataToJson(value: MonthlyData): string {
    return JSON.stringify(value);
  }

  public static toPortfolio(json: string): PortfolioData[] {
    return JSON.parse(json);
  }

  public static portfolioToJson(value: PortfolioData[]): string {
    return JSON.stringify(value);
  }
  public static toFinancialScore(json: string): FinancialScore {
    return JSON.parse(json);
  }

  public static financialScoreToJson(value: FinancialScore): string {
    return JSON.stringify(value);
  }
}
