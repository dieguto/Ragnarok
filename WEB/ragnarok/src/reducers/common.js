const defaultState = {
    appName: 'Ragnarok',
    token: null
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'APP_LOAD':
            return {
                ...state,
                token: action.token || null,
                appLoaded: true,
                currentUser: action.payload ? action.payload.user : null
        };
        case 'REDIRECT':
            return { ...state, redirectTo: null};
        case 'LOGIN':
            return {
                ...state,
                redirectTo: action.error ? null : '/',
                currentUser: action.error ? null : action.payload.user
            };
    }
    return state;
};