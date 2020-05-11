// import * as API from 'constant/api'
// import _ from 'lodash'
// import { postJson } from 'helper/http'
// import getApiUrl from 'helper/get-api-url'

// const apiUrl = getApiUrl('auth', API.AUTH_LOGOUT)

// export const logout = ({ Authorization }, body) =>
// 	new Promise(async (resolve, reject) => {
// 		try {
// 			const response = await postJson(apiUrl, { Authorization }, {})
// 			if (_.get(response, 'success')) {
// 				resolve(response)
// 			} else {
// 				reject(response)
// 			}
// 		} catch (error) {
// 			reject(error)
// 		}
// 	})
