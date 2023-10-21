export const emailReducer = (state, action) => {
   switch(action.type) {
    case "USER_INPUT":
        return {value: action.payload, isValid: action.payload.includes("@")};
    case "INPUT_BLUR":
        return {value: state.value, isValid: state.value.includes("@")};
    default:
        return {value: "", isValid: false}
   }
};

export const passwordReducer = (state, action) => {
    switch(action.type) {
        case "USER_INPUT":
            return {value: action.payload, isValid: action.payload.trim().length > 6};
        case "INPUT_BLUR":
            return {value: state.value, isValid: state.value.trim().length > 6};
        default:
            return {value: "", isValid: false};
    }
}