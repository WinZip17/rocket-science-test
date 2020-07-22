import {
    GET_HOTELS, SET_FILTER, filterValueTypes, SET_CLEAR_FILTER, SET_FILTER_HOTELS
} from "../../types/main";
import {ThunkAction} from "redux-thunk";
import {RootState} from "../reducers";
import {Action} from "redux";
import hotels from '../../API/hotels.json'

export const getHotels = (): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
    try {
        const hotelsRequest = await hotels.hotels;
        dispatch({
            type: GET_HOTELS,
            payload: hotelsRequest
        })
    } catch (err) {
        console.log(err)
    }
}

export const setFilter = (filterName: string, filterValue: filterValueTypes): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
    return dispatch({
        type: SET_FILTER,
        payload: {name: filterName, value: filterValue}
    })
}

export const setClearFilter = (): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
    return dispatch({
        type: SET_CLEAR_FILTER
    })
}

export const setFilterHotels = (): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {
    return dispatch({
        type: SET_FILTER_HOTELS
    })
}


