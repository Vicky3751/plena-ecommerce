// reducers/index.js
import { combineReducers } from 'redux';
import productsReducer from './productsReducer';
import cartReducer from './cartReducer';
import favouriteReducer from './favouriteReducer';
import selectedProductReducer from './selectedProductReducer';

const rootReducer = combineReducers({
    products: productsReducer,
    cartProducts: cartReducer,
    favProducts: favouriteReducer,
    selectedProduct: selectedProductReducer,
});

export default rootReducer;
