interface Registrant {
  id: number; 
  fullName: string;
  gender: string; 
  plan: string; 
  extraItems?: {
    bottle: boolean;
    shoes: boolean;
    cap: boolean;
  };
  total: number;
}
export type { Registrant };