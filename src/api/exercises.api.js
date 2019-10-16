import * as linkAPI from '../config/linkApi.config'
import { callApi } from '../helper/api.helper'

export function getAllExercises() {
    return new Promise((resolve, reject) => {
        callApi(linkAPI.GET_ALL_EXERCISES(), "GET")
            .then(data => {
                resolve(data.Response);
            })
            .catch(err => {
                reject(err);
            });
    });
}

export function createNewExercises(values) {
    return new Promise((resolve, reject) => {
        callApi(linkAPI.CREATE_EXERCISES(), "POST", {
            title: values.title,
            introduction: values.introduction,
            content: values.content,
            tips: values.tips,
            sets: values.sets,
            reps: values.reps,
            rest: values.rest,
            video_url: values.video_url,
            image_url: values.image_url,
            id_level: values.id_level
        })
            .then(data => {
                resolve(data)
            })
            .catch(err => {
                reject(err);
            });
    })
}

export function updateExercises(values) {
    return new Promise((resolve, reject) => {
        callApi(linkAPI.UPDATE_EXERCISES(), "PUT", {
            id: values.id,
            title: values.title,
            introduction: values.introduction,
            content: values.content,
            tips: values.tips,
            sets: values.sets,
            reps: values.reps,
            rest: values.rest,
            video_url: values.video_url,
            image_url: values.image_url,
            id_level: values.id_level
        })
            .then(data => {
                resolve(data)
            })
            .catch(err => {
                reject(err)
            })
    })
}

export function deleteExercises(id) {
    return new Promise((resolve, reject) => {
        callApi(linkAPI.DELETE_EXERCISES(id), "DELETE")
            .then(data => {
                resolve(data)
            })
            .catch(err => reject(err))
    })
}
