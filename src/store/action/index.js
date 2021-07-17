import {SAVE_USER,SAVE_USER_ID} from './actionTypes'

export const saveUserData = data => ({
    type: SAVE_USER,
    payload: data
  });

  export const saveUserId = data => ({
    type: SAVE_USER_ID,
    payload: data
  });