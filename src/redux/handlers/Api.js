export const request = (state, {data}) => {
    return {
        ...state,
        fetching: true,
        data,
        success: false,
        payload: undefined
    };
};

export const success = (state, action) => {
    const { payload } = action;
    return {
        ...state,
        fetching: false,
        success: true,
        error: false,
        ...payload
    };
};
export const failure = (state, action) => {
    const { payload } = action;
    return {
        ...state,
        fetching: false,
        success: false,
        error: true,
        payload
    };
};