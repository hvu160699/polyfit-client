import { HOST_STATIC } from "../config/linkApi.config";

export function callApi(
    endpoint,
    method = "GET",
    body,
    header = {
        Accept: "application/json",
        "Content-Type": "application/json",
    }
) {
    return new Promise((resolve, reject) => {
        fetch(`${HOST_STATIC}${endpoint}`, {
            headers: header,
            method,
            body: JSON.stringify(body)
        })
            .then(async response => {
                const json = await response.json();
                return { json, response };
            })
            .then(({ json, response }) => {

                if (!response.ok) {
                    reject({ status: response.status, msg: json });
                }

                return resolve(json);
            })
            .catch(error => {
                console.log(error);

                reject(error);
            });
    });
}

