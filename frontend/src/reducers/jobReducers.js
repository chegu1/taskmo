import {
    JOB_LIST_REQUEST,
    JOB_LIST_SUCCESS,
    JOB_LIST_FAIL,
    JOB_CREATE_REQUEST,
    JOB_CREATE_SUCCESS,
    JOB_CREATE_FAIL
} from '../constants/jobConstants';

export const jobListReducer = (state = { jobs: [] }, action) => {
    switch (action.type) {
        case JOB_LIST_REQUEST:
            return {
                loading: true, jobs: []
            }
        case JOB_LIST_SUCCESS:
            return {
                loading: false, jobs: action.payload
            }
        case JOB_LIST_FAIL:
            return {
                loading: false, error: action.payload
            }
        default:
            return state
    }
}

export const jobCreateReducer = (state =
    {}, action) => {
    switch (action.type) {
        case JOB_CREATE_REQUEST:
            return {
                loading: true
            }
        case JOB_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                job: action.payload,
            }
        case JOB_CREATE_FAIL:
            return {
                loading: false, error: action.payload
            }

        default:
            return state
    }
}