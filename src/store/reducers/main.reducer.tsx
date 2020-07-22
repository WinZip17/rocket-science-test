import {
    GET_HOTELS, MainActionTypes, MainState, SET_CLEAR_FILTER, SET_FILTER, SET_FILTER_HOTELS, hotel,
} from "../../types/main";

const defaultFilter = {
    country: '',
    type: [],
    rating: [],
    reviews_amount: 0,
    min_price: 0,
}

const initialState: MainState = {
    hotelsList: [],
    filtersHotelsList: [],
    countries: [],
    types: [],
    ratings: [1,2,3,4,5],
    reviews_amounts: [],
    min_prices: [],
    filters: {
        country: '',
        type: [],
        rating: [],
        reviews_amount: 0,
        min_price: 0,
    }
};

const mainReducer = function (state = initialState, action: MainActionTypes) {
    switch ( action.type )
    {
        case GET_HOTELS:
            const countriesList: string[] = []
            const typesList: string[] = []
            let reviewsList: number[] = []
            let prisesList: number[] = []
            action.payload.forEach((item) => {
                if (!countriesList.includes(item.country)) {
                    countriesList.push(item.country)
                }
                if (!typesList.includes(item.type)) {
                    typesList.push(item.type)
                }
                if (!reviewsList.includes(item.reviews_amount)) {
                    reviewsList.push(item.reviews_amount)
                }
                if (!prisesList.includes(item.min_price)) {
                    prisesList.push(item.min_price)
                }
            })
            prisesList = [...prisesList.sort( (a, b) => a - b )]
            reviewsList = [...prisesList.sort( (a, b) => b - a )]
            return {
                ...state,
                hotelsList: action.payload,
                filtersHotelsList: action.payload,
                countries: countriesList,
                types: typesList,
                reviews_amounts: reviewsList,
                min_prices: prisesList
            };

        case SET_FILTER:
            const newFilters = {...state.filters}
            // @ts-ignore
            newFilters[action.payload.name] = action.payload.value
            return {...state, filters: newFilters};

        case SET_CLEAR_FILTER:
            return {
                ...state,
                filters: defaultFilter,
                filtersHotelsList: [...state.hotelsList]
            };

        case SET_FILTER_HOTELS:
            let newHotels = [...state.hotelsList]
            if (state.filters.country.length > 0) {
                newHotels = [...newHotels.filter((i) => i.country === state.filters.country)]
            }
            if (state.filters.type.length > 0) {
                newHotels = [...newHotels.filter((i) => state.filters.type.includes(i.type))]
            }
            if (state.filters.rating.length > 0) {
                let hotelRatingArr: hotel[] = []
                newHotels.forEach((hotel) => {
                    state.filters.rating.forEach((rating) => {
                        hotel.rating >= Number(rating) && hotel.rating <= Number(rating) + 0.9999 && hotelRatingArr.push(hotel)
                    })
                })
                newHotels = [...hotelRatingArr]
            }
            if (state.filters.reviews_amount !== 0) {
                newHotels = [...newHotels.filter((i) => i.reviews_amount > state.filters.reviews_amount)]
            }
            newHotels = [...newHotels.filter((i) => i.min_price <= state.filters.min_price)]
            return {
                ...state,
                filtersHotelsList: newHotels
            };

        default:
            return state;
    }
};

export default mainReducer;
