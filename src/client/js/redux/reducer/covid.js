import * as ACTIONS from 'constant/actions'
import { handleActions } from 'redux-actions'
import _ from 'lodash'

const initialState = {
	covid: undefined,
	dailyCovid: undefined,
	countries: undefined,
	spinner: true,
	country: ''
}

export default
handleActions({
	[ACTIONS.GET_COVID_DATA_REJECTED]: (state, action) => ({
		...state,
		spinner: true,
		error: true
	}),
	[ACTIONS.GET_COVID_DATA_PENDING]: (state, action) => ({
		...state,
		spinner: true
	}),
	[ACTIONS.GET_COVID_DATA_FULFILLED]: (state, action) => ({
		...state,
		spinner: false,
		covid: _.pick(action.payload.data, ['confirmed', 'recovered', 'deaths', 'lastUpdate'])
	}),
	[ACTIONS.GET_DAILY_COVID_DATA_REJECTED]: (state, action) => ({
		...state,
		spinner: true,
		error: true
	}),
	[ACTIONS.GET_DAILY_COVID_DATA_PENDING]: (state, action) => ({
		...state,
		spinner: true
	}),
	[ACTIONS.GET_DAILY_COVID_DATA_FULFILLED]: (state, action) => ({
		...state,
		spinner: false,
		dailyCovid: _.map(action.payload.data, ({ confirmed, deaths, reportDate }) => ({
			confirmed: confirmed.total,
			deaths: deaths.total,
			date: reportDate
		}))
	}),
	[ACTIONS.GET_COUNTRY_COVID_DATA_REJECTED]: (state, action) => ({
		...state,
		spinner: true,
		error: true
	}),
	[ACTIONS.GET_COUNTRY_COVID_DATA_PENDING]: (state, action) => ({
		...state,
		spinner: true
	}),
	[ACTIONS.GET_COUNTRY_COVID_DATA_FULFILLED]: (state, action) => ({
		...state,
		spinner: false,
		countries: _.map(action.payload.data.countries, ({ name }) => name)
	}),
	[ACTIONS.CHANGE_COVID_COUNTRY]: (state, action) => ({
		...state,
		country: action.payload
	})
}, initialState)
