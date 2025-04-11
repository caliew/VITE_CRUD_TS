export interface IRestaurantsState {
    restaurants: any[] | null;
    isLoading: boolean;
    error: any;
}

export interface Restaurant {
    id: number;
    name: string;
    address: string;
}