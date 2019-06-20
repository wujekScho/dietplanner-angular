export interface Product {
    id: number;
    name: string;
    productType: string;
    calories: number;
    protein: number;
    fat: number;
    carbohydrates: number;
    homeMeasureType?: string;
    homeMeasureWeightRatio?: number;
    homeMeasureStep?: number;
  }
  
  export interface MealProduct {
    id: number;
    weight: number;
    product: Product;
    calories: number;
    protein: number;
    fat: number;
    carbohydrates: number;
  }
  
  export interface Meal {
    id: number;
    name: string;
    mealType: string;
    recipe: string;
    mealProducts: MealProduct[];
    weight: number;
    calories: number;
    protein: number;
    fat: number;
    carbohydrates: number;
  }
  
  export interface DayMeals {
    id: number;
    breakfast: Meal;
    brunch: Meal;
    dinner: Meal;
    tea: Meal;
    supper: Meal;
    weight: number;
    calories: number;
    protein: number;
    fat: number;
    carbohydrates: number;
  }
  
  export interface PlannedDay {
    id: number;
    day: number[];
    dayMeals: DayMeals;
  }