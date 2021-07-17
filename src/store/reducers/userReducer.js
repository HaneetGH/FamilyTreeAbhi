import {SAVE_USER,SAVE_USER_ID} from '../action/actionTypes'

const initialState = {};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_USER:
          return action.payload;
       
           case SAVE_USER_ID:
            return action.payload;

          default:
            return state;
    }
}