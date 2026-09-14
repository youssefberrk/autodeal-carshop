export type ConciergeMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

export type CarSearchFilters = {
  brand?: string;
  bodySilhouette?: string;
  minPrice?: number;
  maxPrice?: number;
  minHorsepower?: number;
  electricOnly?: boolean;
  availableOnly?: boolean;
};

export type CarRecommendation = {
  carId: number;
  reason: string;
};

export type ConciergeResponse = {
  message: string;
  recommendations?: CarRecommendation[];
};
