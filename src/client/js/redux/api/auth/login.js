// import * as API from 'constant/api'
// import _ from 'lodash'
// import { postJson } from 'helper/http'
// import getApiUrl from 'helper/get-api-url'

// const apiUrl = getApiUrl('auth', API.AUTH_LOGIN)

// export const login = (headers, body) =>
// 	new Promise(async (resolve, reject) => {
// 		try {
// 			const response = await postJson(apiUrl, {}, { ...body })
// 			if (_.get(response, 'success')) {
// 				resolve(response)
// 			} else {
// 				reject(response)
// 			}
// 		} catch (error) {
// 			console.error(error)
// 			reject(error)
// 		}
// 	})
