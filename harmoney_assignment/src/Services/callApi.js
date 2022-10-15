
import {getHeaders} from "./getHeaders";
const callApi = (url, data) => {

    return new Promise((resolve, reject) => {
        fetch(url, { headers: getHeaders(), ...data })
            .then((res) => res.json())
            .then((res) => {
                resolve(res)
                // if (res.status === 200) resolve(res);
                // else if (res.status === 401) {
                //     reject(res);
                // }
            })
            .catch((e) => {
                reject(`ERROR OCCURRED : ${e}`);
            });
    });
};

export default callApi;
