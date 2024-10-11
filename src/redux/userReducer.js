import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { movieDeatils, movieDeatilDescription } from "../API";

const initialState = {
    movieData: [],
    loading: false,
    error: null,
    intialPage: 1,
    totalPages: 0,
    movieDetails: null,
};

export const movieDataList = createAsyncThunk(
    "movie",
    async (page, { rejectWithValue }) => {
        try {
            const response = await movieDeatils(page);
            return response;
        } catch (err) {
            return rejectWithValue({
                message: err.response.data.status_message,
                code: err.response.data.status_code,
            });
        }
    }
);

export const movieDetailData = createAsyncThunk(
    "moviedetails",
    async (id, { rejectWithValue }) => {
        try {
            const response = await movieDeatilDescription(id);
            return response;
        } catch (err) {
            return rejectWithValue({
                message: err.response.data.status_message,
                code: err.response.data.status_code,
            });
        }
    }
);

export const movieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {
        setPaginationData: (state, action) => {
            state.intialPage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(movieDataList.pending, (state) => {
                state.loading = true;
            })
            .addCase(movieDataList.fulfilled, (state, action) => {
                state.loading = false;
                state.movieData = action.payload.results;
                state.totalPages = action.payload.total_pages;
            })
            .addCase(movieDataList.rejected, (state, action) => {
                console.log("action", action);
                state.error = action.payload.message;
                state.loading = false;
            })
            .addCase(movieDetailData.pending, (state) => {
                state.loading = true;
            })
            .addCase(movieDetailData.fulfilled, (state, action) => {
                state.loading = false;
                state.movieDetails = action.payload;
            })
            .addCase(movieDetailData.rejected, (state, action) => {
                state.error = action.error;
                state.loading = false;
            });
    },
});
console.log("initialState", initialState);
export const { setPaginationData } = movieSlice.actions;

export default movieSlice.reducer;
