import * as linkAPI from '../config/linkApi.config'
import { callApi } from '../helper/api.helper'

export function getAllBodyparts() {
    return new Promise((resolve, reject) => {
        callApi(linkAPI.GET_ALL_BODYPARTS(), "GET")
            .then(data => {
                resolve(data.Response);
            })
            .catch(err => {
                reject(err);
            });
    });
}

export function createNewBodyparts(values) {
    return new Promise((resolve, reject) => {
        callApi(linkAPI.CREATE_BODYPARTS(), "POST", {
            title: values.title,
            image_url: values.image_url,
        })
            .then(data => {
                resolve(data)
            })
            .catch(err => {
                reject(err);
            });
    })
}

export function updateBodyparts(id, values) {
    return new Promise((resolve, reject) => {
        callApi(linkAPI.UPDATE_BODYPARTS(), "PUT", {
            id: id,
            title: values.title,
            image_url: values.image_url,
        })
            .then(data => {
                resolve(data)
            })
            .catch(err => {
                reject(err)
            })
    })
}

export function deleteBodyparts(id) {
    return new Promise((resolve, reject) => {
        callApi(linkAPI.DELETE_BODYPARTS(id), "DELETE")
            .then(data => {
                resolve(data)
            })
            .catch(err => reject(err))
    })
}
