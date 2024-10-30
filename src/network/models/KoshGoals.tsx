export type KoshaGoals = {
  recommendations: Recommendations[];
};

export type Recommendations = {
  name: string;
  achievedAmount: number;
  targetAmount: number;
  id: number;
  duration: number;
  priority: string;
  logo: string;
  description: string;
  recommendations: InstrumentRecommendation[];
};

export type InstrumentRecommendation = {
  instrument: string;
  description: string;
  name: string;
};

// Converts JSON strings to/from your types
export class Convert {
  public static toKoshaGoals(json: string): KoshaGoals {
    return JSON.parse(json);
  }

  public static koshaGoalsToJson(value: KoshaGoals): string {
    return JSON.stringify(value);
  }
}
