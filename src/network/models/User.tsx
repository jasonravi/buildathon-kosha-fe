export type User = {
  firstName: string;
  lastName: string;
  gender: Gender; // Assuming gender can have specific values
  maritalStatus: MaritalStatus;
  age: number;
  numberOfDependents: number;
  mobileNumber: string;
  employmentType: string;
  status: number;
};

export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

export type MaritalStatus = 'SINGLE' | 'MARRIED' | 'DIVORCED' | 'WIDOWED';

export type EmploymentType =
  | 'SALARIED'
  | 'SELF_EMPLOYED'
  | 'UNEMPLOYED'
  | 'RETIRED';

interface Consent {
  handle: string;
  status: string;
}

export interface UserResponse {
  success: boolean;
  consents: Consent[];
  redirect_url: string;
  userId: number;
}

export type Priority = 'HIGH' | 'MEDIUM' | 'LOW';

interface Item {
  name: string;
  value: number;
}

interface Category {
  category: string;
  totalValue: string;
  items: Item[];
}

export type NetWorthData = Category[];

export interface FinancialData {
  totalWealth: string;
  assets: string;
  liabilities: string;
  spends: string;
}

export interface Goal {
  id?: number;
  name: string;
  targetAmount: number;
  achiveAmount: number;
  duration: number;
  priority: string;
  logo: string;
  description: string;
}

export interface GoalResponse {
  goals: Goal[];
}
