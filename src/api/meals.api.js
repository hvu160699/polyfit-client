import * as linkAPI from '../config/linkApi.config'
import { callApi } from '../helper/api.helper'

export function getAllMeals() {
    return new Promise((resolve, reject) => {
        callApi(linkAPI.GET_ALL_MEALS(), "GET")
            .then(data => {
                resolve(data.Response);
            })
            .catch(err => {
                reject(err);
            });
    });
}

export function createNewMeals(values) {
    return new Promise((resolve, reject) => {
        callApi(linkAPI.CREATE_MEALS(), "POST", {
            title: values.title,
            image_url: values.image_url,
            id_diets: values.id_diets,
        })
            .then(data => {
                resolve(data)
            })
            .catch(err => {
                reject(err);
            });
    })
}

export function updateMeals(values) {
    return new Promise((resolve, reject) => {
        callApi(linkAPI.UPDATE_MEALS(), "PUT", {
            id: values.id,
            title: values.title,
            id_diets: values.id_diets,
        })
            .then(data => {
                resolve(data)
            })
            .catch(err => {
                reject(err)
            })
    })
}

export function deleteMeals(id) {
    return new Promise((resolve, reject) => {
        callApi(linkAPI.DELETE_MEALS(id), "DELETE")
            .then(data => {
                resolve(data)
            })
            .catch(err => reject(err))
    })
}
