/* global window */
import * as ACTIONS from 'constant/actions'
import * as API from 'constant/api'
import { createAction } from 'redux-actions'
import axios from 'axios'

const changeCovidCountry = createAction(ACTIONS.CHANGE_COVID_COUNTRY)

export const getCovidDataPromise = (country) => ({
  type: ACTIONS.GET_COVID_DATA,
  payload: !country ? axios.get(API.COVID_API) : axios.get(`${API.COVID_API}/countries/${country}`)
})

export const getDailyCovidDataPromise = () => ({
  type: ACTIONS.GET_DAILY_COVID_DATA,
  payload: axios.get(`${API.COVID_API}/daily`)
})

export const getCountryCovidDataPromise = () => ({
  type: ACTIONS.GET_COUNTRY_COVID_DATA,
  payload: axios.get(`${API.COVID_API}/countries`)
})

export const changeCountry = (name) => async (dispatch, getState, {}) => {
  try {
    dispatch(getCovidDataPromise(name))
    dispatch(changeCovidCountry(name))
  } catch (error) {
    console.log(error)
  }
}