import { movieDeatils, movieDeatilDescription } from "../API";

const movieDataList = (page) => async (dispatch) => {
    try {
        dispatch({ type: "FETCH_MOVIE_REQUEST" });
        const data = await movieDeatils(page);
        dispatch({ type: "FETCH_MOVIE_SUCCESS", payload: data });
    } catch (e) {
        dispatch({ type: "FETCH_MOVIE_FAILURE" });
    }
};

const movieDetailData = (id) => async (dispatch) => {
    try {
        dispatch({ type: "FETCH_MOVIE_REQUEST" });
        const data = await movieDeatilDescription(id);
        dispatch({ type: "FETCH_MOVIE_DETAIL_DATA", payload: data });
    } catch (e) {
        dispatch({ type: "FETCH_MOVIE_FAILURE" });
    }
};

export { movieDataList, movieDetailData };
