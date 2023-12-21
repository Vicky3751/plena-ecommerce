const initialState = {}


const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ALL_CART_PRODUCTS': {
            return {
                ...state,
                ...action.payload
            }
        }
        case 'REMOVE_CART_PRODUCT': {
            const newState = { ...state };
            delete newState[action.payload.id];
            return newState;
        }
        case 'DELETE_CART_PRODUCT': {
            return {}
        }
        default:
            return state;
    }
};

export default cartReducer;
