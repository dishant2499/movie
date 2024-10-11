const initialState = {
    movieData: [],
    loading: false,
    error: null,
    intialPage: 1,
    totalPages: 0,
    movieDetails: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FETCH_MOVIE_REQUEST":
            return { ...state, loading: true };
        case "FETCH_MOVIE_SUCCESS":
            return {
                ...state,
                loading: false,
                movieData: action.payload.results,
                totalPages: action.payload.total_pages,
            };
        case "FETCH_MOVIE_PAGINATION_DATA":
            return { ...state, loading: false, intialPage: action.payload };
        case "FETCH_MOVIE_FAILURE":
            return { ...state, loading: false, error: action.payload };
        case "FETCH_MOVIE_DETAIL_DATA":
            return { ...state, loading: false, movieDetails: action.payload };
        default:
            return state;
    }
};

export default userReducer;
