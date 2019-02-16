import { createActions, createReducer } from 'reduxsauce';
import { request, success, failure } from "../handlers/Api";

export const INITIAL_STATE = {
    items: [],
    fetching: false,
    success: true,
    error: undefined
};

export const { Types, Creators } = createActions({
    get_items_request: undefined,
    get_items_success: ['payload'],
    get_items_failure: ['payload'],
    create_item_request: ['data'],
    create_item_success: ['payload'],
    create_item_failure: ['payload']
});

const reducer = createReducer(INITIAL_STATE, {
    [Types.GET_ITEMS_REQUEST]: request,
    [Types.GET_ITEMS_SUCCESS]: success,
    [Types.GET_ITEMS_FAILURE]: failure,
    [Types.CREATE_ITEM_REQUEST]: request,
    [Types.CREATE_ITEM_SUCCESS]: success,
    [Types.CREATE_ITEM_FAILURE]: failure
});
export default reducer;