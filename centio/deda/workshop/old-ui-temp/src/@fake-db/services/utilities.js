// import should be made

import SSRStorage from './storage';
import { API_URI } from './constant';
// import axios from 'axios';
const parseJSON = response => response.json();
export const isUnset = o => typeof o === 'undefined' || o === null;
export function decodeValue(val) {
    if (typeof val === 'string') {
        try {
            return JSON.parse(val);
        } catch (_) { }
    }

    return val;
}
export function encodeValue(val) {
    if (typeof val === 'string') {
        return val;
    }

    return JSON.stringify(val);
}
export const staffname = user =>
    user ? `${user?.first_name} ${user?.last_name}` : '--';

const headers = user => {
    if (user) {
        const jwt = `Bearer ${user.token}`;
        return { ...defaultHeaders, Authorization: jwt };
    } else {
        return defaultHeaders;
    }
};
export const Bearer = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwidXNlcklkIjoxLCJpYXQiOjE2NDk0MjAwNzEsImV4cCI6MTY0OTU5Mjg3MX0.qZPn0kWdRc6EXGwzT47mpFu7mhwsqsPmoCoqNl0UbYM'
export const defaultHeaders = {
    Accept: 'application/json',
    Authorization: `Bearer ${Bearer}`,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
    'Content-Type': 'application/json',
};

const checkStatus = async response => {
    if (!response.ok) {
        const message = await response.text();
        const err = JSON.parse(message);
        throw Object.freeze({ message: err.message || err.error });
    }

    return response;
};

export const request = async (url, method, authed = false, data) => {
    // prettier-ignore
    // const user = await (new SSRStorage()).getItem(TOKEN_COOKIE);
    console.log(API_URI);
    console.log(`${API_URI}/${url}`)
    const response = await fetch(`${API_URI}/${url}`, {
        method: method,
        headers: { ...defaultHeaders },
        body: JSON.stringify(data),
    });
    const result = await checkStatus(response);
    return parseJSON(result);

};
export const formatPatientId = data => {
    let formattedId = String(data.id);
    let len = 7 - formattedId.length;
    while (len >= 0) {
        formattedId = '0' + formattedId;
        len--;
    }
    return formattedId;
};
export const patientname = (user, pid = false) =>
    user
        ? `${user.other_names} ${user.surname} ${pid
            ? `(${formatPatientId(user)} ${user.legacy_patient_id ? `[${user.legacy_patient_id}]` : ''
            })`
            : ''
        }`
        : '--';
