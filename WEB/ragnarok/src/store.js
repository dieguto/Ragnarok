import { applyMiddleware, createStore } from 'redux';
import { promiseMiddleware } from './middleware';

const defaultState = {
    appName : 'Ragnarok',
    anuncios : 'null'
}

const reducer = function(state = defaultState, action){
    switch(action.type){
        case 'HOME_PAGE_LOADED':
            return { ...state, anuncios: action.payload.anuncios}
    }

    return state;
}


const middleware = applyMiddleware(promiseMiddleware);

const store = createStore(reducer, middleware);


export default store;