// import * as API from 'constant/api'
// import _ from 'lodash'
// import { getJson } from 'helper/http'
// import getApiUrl from 'helper/get-api-url'

// const apiUrl = getApiUrl('api', API.USER_IS_LOGGED_IN)

// export const isLoggedIn = ({ Authorization }, body) =>
// 	new Promise(async (resolve, reject) => {
// 		try {
// 			const response = await getJson(apiUrl, { Authorization }, {})

// 			if (_.get(response, 'logged_in')) {
// 				resolve(response)
// 			} else {
// 				reject(response)
// 			}
// 		} catch (error) {
// 			reject(error)
// 		}
// 	})
