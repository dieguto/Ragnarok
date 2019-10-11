export default (state = {}, action) => {
    switch (action.type) {
        case 'HOME_PAGE_LOADED':
            return {
                ...state,
                // anuncio: action.payload.anuncios
            };
    }
    return state;
};