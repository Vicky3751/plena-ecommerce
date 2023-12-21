const initialState = []


const favouriteReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ALL_FAV_PRODUCTS':
            return [...state, action.payload];
        case 'REMOVE_FAV_PRODUCT': {
            const newPayload = state.filter(item => item.id !== action.payload.id)
            return newPayload
        }
        default:
            return state;
    }
};

export default favouriteReducer;
