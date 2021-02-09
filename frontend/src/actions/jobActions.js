import {
    JOB_LIST_REQUEST, JOB_LIST_SUCCESS, JOB_LIST_FAIL
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