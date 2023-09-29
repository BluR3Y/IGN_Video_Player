export const SET_AUTO_PLAY = 'SET_AUTO_PLAY';
export const SET_VOLUME = 'SET_VOLUME';
export const SET_CHAPTERS_OPEN = 'SET_CHAPTERS_OPEN';

export const setAutoPlay = value => dispatch => {
    dispatch({
        type: SET_AUTO_PLAY,
        payload: value
    });
};

export const setVolume = value => dispatch => {
    dispatch({
        type: SET_VOLUME,
        payload: value
    });
}

export const setChaptersOpen = value => dispatch => {
    dispatch({
        type: SET_CHAPTERS_OPEN,
        payload: value
    });
}
