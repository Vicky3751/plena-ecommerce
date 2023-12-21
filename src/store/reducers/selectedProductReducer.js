const initialState = {}


const selectedProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SELCTED_PRODUCT': {
            return action.payload
        }
        default:
            return state;
    }
};

export default selectedProductReducer;
