import {
    JOB_LIST_REQUEST, JOB_LIST_SUCCESS, JOB_LIST_FAIL,
    JOB_CREATE_REQUEST,
    JOB_CREATE_SUCCESS,
    JOB_CREATE_FAIL
} from '../constants/jobConstants';

import axios from 'axios'

export const listJobs = () => async (dispatch) => {
    try {
        dispatch({ type: JOB_LIST_REQUEST })
        const { data } = await axios.get('http://localhost:5000/api/alljobs')

        dispatch({
            type: JOB_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: JOB_LIST_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }
}

export const createJob = (jobtitle, description, location, expirydate) => async (dispatch) => {
    try {
        dispatch({ type: JOB_CREATE_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('http://localhost:5000/api/jobcreate', { jobtitle, description, location, expirydate }, config)

        dispatch({
            type: JOB_CREATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: JOB_CREATE_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message :
                error.message
        })
    }
}