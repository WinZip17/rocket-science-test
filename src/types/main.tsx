import { RootState } from "../store/reducers";
import {
    useSelector as useReduxSelector,
    TypedUseSelectorHook,
} from 'react-redux'

export const GET_HOTELS = '[MAIN APP] GET_HOTELS';
export const SET_FILTER = '[MAIN APP] SET_FILTER';
export const SET_CLEAR_FILTER = '[MAIN APP] SET_CLEAR_FILTER';
export const SET_FILTER_HOTELS = '[MAIN APP] SET_FILTER_HOTELS';

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector

export type filterValueTypes = string | string[] | number[] | number

export interface hotel {
    name: string
    country: string
    address: string
    stars: number
    type: string
    description: string
    services: [string]
    min_price: number
    currency: string
    rating: number
    reviews_amount: number
    last_review: string
}

interface filters {
    country: string
    type: string[]
    rating: number[]
    reviews_amount: number
    min_price: number
}

export interface MainState {
    hotelsList:  hotel[],
    filtersHotelsList:  hotel[],
    countries: string[],
    types: string[],
    ratings: number[],
    reviews_amounts: number[],
    min_prices: number[],
    filters: filters
}

export interface getHotels {
    type: typeof GET_HOTELS
    payload: hotel[]
}

export interface setFilter {
    type: typeof SET_FILTER
    payload: {
        name: string
        value: filterValueTypes
    }
}

export interface setClearFilter {
    type: typeof SET_CLEAR_FILTER
}

export interface setFilterHotels {
    type: typeof SET_FILTER_HOTELS
}

export type MainActionTypes =
    | getHotels
    | setFilter
    | setClearFilter
    | setFilterHotels
