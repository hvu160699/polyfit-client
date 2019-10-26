import * as linkAPI from '../config/linkApi.config'
import { callApi } from '../helper/api.helper'

export function getAllQuotes() {
    return new Promise((resolve, reject) => {
        callApi(linkAPI.GET_ALL_QUOTES(), "GET")
            .then(data => {
                resolve(data.Response);
            })
            .catch(err => {
                reject(err);
            });
    });
}

export function createNewQuotes(values) {
    return new Promise((resolve, reject) => {
        callApi(linkAPI.CREATE_QUOTES(), "POST", {
            title: values.title,
            image_url: values.image
        })
            .then(data => {
                resolve(data)
            })
            .catch(err => {
                reject(err);
            });
    })
}

// export function updateQuotes(values) {
//     return new Promise((resolve, reject) => {
//         callApi(linkAPI.UPDATE_QUOTES(), "PUT", {
//             id: values.id,
//             title: values.title,
//             image_url: values.image
//         })
//             .then(data => {
//                 resolve(data)
//             })
//             .catch(err => {
//                 reject(err)
//             })
//     })
// }

export function deleteQuotes(id) {
    return new Promise((resolve, reject) => {
        callApi(linkAPI.DELETE_QUOTES(id), "DELETE")
            .then(data => {
                resolve(data)
            })
            .catch(err => reject(err))
    })
}
