import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name : 'auth',
    initialState : {
        loading : true,
        isAuthenticated : false
    },
    reducers : {
        loginRequest(state, action){
            return ({ 
                ...state,
                loading: true
                // loading : true,
                // isAuthenticated : false
            })
        },
        loginSuccess(state, action){
            return ({
                loading : false,
                isAuthenticated : true,
                user : action.payload.user
            })
        },
        loginFail(state, action){
            return({
                ...state,
                loading: false,
                error:  action.payload
                // loading : false,
                // isAuthenticated : false,
                // error : action.payload
            })
        },
        clearError(state, action){
            return({
                ...state,
                error:  null
                // loading : false,
                // isAuthenticated : false,
                // error : null
            })
        },
        registerRequest(state, action){
            return ({ 
                ...state,
                loading: true
                // loading : true,
                // isAuthenticated : false
            })
        },
        registerSuccess(state, action){
            return ({
                loading : false,
                isAuthenticated : true,
                user : action.payload.user
            })
        },
        registerFail(state, action){
            return({
                ...state,
                loading: false,
                error:  action.payload
                // loading : false,
                // isAuthenticated : false,
                // error : action.payload
            })
        },
        loadUserRequest(state, action){
            return ({ 
                ...state,
                isAuthenticated: false,
                loading: true,
                // loading : true,
                // isAuthenticated : false
            })
        },
        loadUserSuccess(state, action){
            return ({
                loading : false,
                isAuthenticated : true,
                user : action.payload.user
            })
        },
        loadUserFail(state, action){
            return({
                ...state,
                loading: false
                // loading : false,
                // isAuthenticated : false,
                // error : action.payload
            })
        },
        logoutSuccess(state, action){
            return ({
                loading : false,
                isAuthenticated : false
            })
        },
        logoutFail(state, action){
            return({
                ...state,
                error:  action.payload
                // loading : false,
                // isAuthenticated : false,
                // error : action.payload
            })
        },
        updateProfileRequest(state, action){
            return ({ 
                ...state,
                loading: true,
                isUpdated: false
                // loading : true,
                // isAuthenticated : false,
                // isUpdated : false
            })
        },
        updateProfileSuccess(state, action){
            return ({
                ...state,
                loading: false,
                user: action.payload.user,
                isUpdated: true
                // loading : false,
                // isAuthenticated : true,
                // user : action.payload.user,
                // isUpdated : true
            })
        },
        updateProfileFail(state, action){
            return({
                ...state,
                loading: false,
                error:  action.payload
                // loading : false,
                // isAuthenticated : false,
                // error : action.payload
            })
        },
        clearUpdateProfile(state, action){
            return ({ 
                ...state,
                isUpdated: false
            })
        },
        updatePasswordRequest(state, action){
            return ({ 
                ...state,
                loading: true,
                isUpdated: false
                // loading : true,
                // isAuthenticated : false,
                // isUpdated : false
            })
        },
        updatePasswordSuccess(state, action){
            return ({
                ...state,
                loading: false,
                isUpdated: true
                // loading : false,
                // isAuthenticated : true,
                // isUpdated : true
            })
        },
        updatePasswordFail(state, action){
            return({
                ...state,
                loading: false,
                error:  action.payload
                // loading : false,
                // isAuthenticated : false,
                // error : action.payload
            })
        },
        forgotPasswordRequest(state, action){
            return ({ 
                ...state,
                loading: true,
                message: null
            })
        },
        forgotPasswordSuccess(state, action){
            return ({
                ...state,
                loading: false,
                message: action.payload.message
            })
        },
        forgotPasswordFail(state, action){
            return({
                ...state,
                loading: false,
                error: action.payload
            })
        },
        resetPasswordRequest(state, action){
            return ({ 
                ...state,
                loading: true
            })
        },
        resetPasswordSuccess(state, action){
            return ({
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload.user 
            })
        },
        resetPasswordFail(state, action){
            return({
                ...state,
                loading: false,
                error: action.payload
            })
        }
    }
})

const { actions, reducer } = authSlice;

export const { 
                loginRequest, 
                loginSuccess, 
                loginFail, 
                clearError,
                registerRequest,
                registerSuccess,
                registerFail,
                loadUserRequest,
                loadUserSuccess,
                loadUserFail,
                logoutSuccess,
                logoutFail,
                updateProfileRequest,
                updateProfileSuccess,
                updateProfileFail,
                clearUpdateProfile,
                updatePasswordRequest,
                updatePasswordSuccess,
                updatePasswordFail,
                forgotPasswordRequest,
                forgotPasswordSuccess,
                forgotPasswordFail,
                resetPasswordRequest,
                resetPasswordSuccess,
                resetPasswordFail
            } = actions;

export default reducer;