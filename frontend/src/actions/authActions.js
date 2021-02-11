import axios from 'axios'
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_ACTIVATE_REQUEST, USER_ACTIVATE_SUCCESS, USER_ACTIVATE_FAIL
} from '../constants/authConstants'

export const login = (email, userTypeJobSeeker) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        console.log(email, userTypeJobSeeker, "actions")
        const { data } = await axios.post('http://localhost:5000/api/signup', { email, userTypeJobSeeker }, config)

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }
}

export const activate = ({ token }) => async (dispatch) => {
    try {
        dispatch({
            type: USER_ACTIVATE_REQUEST
        })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('http://localhost:5000/api/account-activation', { token }, config)

        dispatch({
            type: USER_ACTIVATE_SUCCESS,
            payload: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data))


    } catch (error) {
        dispatch({
            type: USER_ACTIVATE_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }
}