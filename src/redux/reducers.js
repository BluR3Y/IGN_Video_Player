import {
    SET_AUTO_PLAY,
    SET_CHAPTERS_OPEN,
    SET_VOLUME
} from './actions';

const initialState = {
    autoPlay: false,
    chaptersOpen: true,
    volume: 1
};

function userReducer(state = initialState, action) {
    switch(action.type) {
        case SET_AUTO_PLAY:
            return {...state, autoPlay: action.payload};
        case SET_VOLUME:
            return {...state, volume: action.payload};
        case SET_CHAPTERS_OPEN:
            return {...state, chaptersOpen: action.payload};
        default:
            return state;
    }
};

export default userReducer;