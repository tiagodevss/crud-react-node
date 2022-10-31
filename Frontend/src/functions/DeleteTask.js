import React from 'react';
import Api from '../Api';

export default function DeleteTask(id) {
    return new Promise(async (resolve, reject) => {
        const params = {
            "key": "key123",
            "id": id,
        }
        await Api.post('/delete', params).then((res) => {
            resolve(res)
        }).catch((err) => {
            reject(err)
            console.log(err)
        })
    })
}