import { AsyncStorage } from 'react-native'
import { Facebook } from 'expo'
import axios from 'axios'
import reverseGeocode from 'latlng-to-zip'
import qs from 'qs'

export const FACEBOOK_LOGIN_SUCCESS = 'facebook_login_success'
export const FACEBOOK_LOGIN_FAIL = 'facebook_login_fail'
export const FETCH_JOBS = 'fetch_jobs'
export const LIKE_JOB = 'like_job'
export const CLEAR_LIKED_JOBS = 'clear_liked_jobs'

const JOB_QUERY_SEARCH = {
    publisher: '4022372635962623',
    format: 'json',
    v: '2',
    latlong: 1,
    radius: 10,
    q: 'javascript'
}

export const facebookLogin = () => async dispatch => {
    let token = await AsyncStorage.getItem('fb_token')
    if (token) {
        dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: token })
    } else {
        doFacebookLogin(dispatch)
    }
}

const doFacebookLogin = async dispatch => {
    let result = await Facebook.logInWithReadPermissionsAsync('YOUR_API_KEY', {
        permissions: ['public_profile']
    })

    if (result.type === 'cancel') {
        return dispatch({ type: FACEBOOK_LOGIN_FAIL })
    }

    await AsyncStorage.setItem('fb_token', result.token)
    dispatch({ type: FACEBOOK_LOGIN_SUCCESS, payload: result.token })
}

const JOB_ROOT_URL = 'http://api.indeed.com/ads/apisearch?'

export const fetchJobs = (region, callback) => async dispatch => {
    try {
        let zip = await reverseGeocode(region)
        const query = qs.stringify({ ...JOB_QUERY_SEARCH, l: zip })
        const url = `${JOB_ROOT_URL}${query}`
        let { data } = await axios.get(url)
        dispatch({ type: FETCH_JOBS, payload: data.results })
        callback()
    } catch (e) {
        console.error(e)
    }
}

export const likeJob = job => {
    return {
        type: LIKE_JOB,
        payload: job
    }
}

export const clearLikedJobs = () => {
    return {
        type: CLEAR_LIKED_JOBS
    }
}
