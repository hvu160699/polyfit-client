import * as linkAPI from '../config/linkApi.config'
import { callApi } from '../helper/api.helper'

export function getAllDishes() {
    return new Promise((resolve, reject) => {
        callApi(linkAPI.GET_ALL_DISHES(), "GET")
            .then(data => {
                resolve(data.Response);
            })
            .catch(err => {
                reject(err);
            });
    });
}

export function createNewDishes(values) {
    return new Promise((resolve, reject) => {
        callApi(linkAPI.CREATE_DISHES(), "POST", {
            title: values.title,
            image_url: values.image_url,
            protein: values.protein,
            fat: values.fat,
            carb: values.carb,
            calories: values.calories,
            id_meals: values.id_meals,
            ingredientsArr: values.ingredientsArr
        })
            .then(data => {
                resolve(data)
            })
            .catch(err => {
                reject(err);
            });
    })
}

export function updateDishes(values) {
    return new Promise((resolve, reject) => {
        callApi(linkAPI.UPDATE_DISHES(), "PUT", {
            id: values.id,
            title: values.title,
            image_url: values.image_url,
            protein: values.protein,
            fat: values.fat,
            carb: values.carb,
            calories: values.calories,
        })
            .then(data => {
                resolve(data)
            })
            .catch(err => {
                reject(err)
            })
    })
}

export function deleteDishes(id) {
    return new Promise((resolve, reject) => {
        callApi(linkAPI.DELETE_DISHES(id), "DELETE")
            .then(data => {
                resolve(data)
            })
            .catch(err => reject(err))
    })
}
