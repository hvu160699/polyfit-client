import * as linkAPI from '../config/linkApi.config'
import { callApi } from '../helper/api.helper'

export function getAllDiets() {
    return new Promise((resolve, reject) => {
        callApi(linkAPI.GET_ALL_DIETS(), "GET")
            .then(data => {
                resolve(data.Response);
            })
            .catch(err => {
                reject(err);
            });
    });
}

export function createNewDiets(values) {
    return new Promise((resolve, reject) => {
        callApi(linkAPI.CREATE_DIETS(), "POST", {
            title: values.title,
            description: values.description,
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

export function updateDiets(values) {
    return new Promise((resolve, reject) => {
        callApi(linkAPI.UPDATE_DIETS(), "PUT", {
            id: values.id,
            title: values.title,
            description: values.description,
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

export function deleteDiets(id) {
    return new Promise((resolve, reject) => {
        callApi(linkAPI.DELETE_DIETS(id), "DELETE")
            .then(data => {
                resolve(data)
            })
            .catch(err => reject(err))
    })
}
