import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { movieDeatils, movieDeatilDescription } from "../API";

const initialState = {
    movieData: [],
    loading: false,
    error: null,
    initialPage: 1,
    totalPages: 0,
    movieDetails: null,
    formData: {},
    activeSteps: {
        step1: { isCompleted: false, isActive: true },
        step2: { isCompleted: false, isActive: false },
        step3: { isCompleted: false, isActive: false },
    },
    stepDetails: {},
    totalFormList: [],
};

export const movieDataList = createAsyncThunk(
    "movie",
    async (page, { rejectWithValue }) => {
        try {
            const response = await movieDeatils(page);
            return response;
            // if (response == 200) {
            // }
            // return rejectWithValue({
            //     message: response.err,
            //     code: response.err,
            // });
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
            console.log("err", err);
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
            state.initialPage = action.payload;
        },
        setFormData: (state, action) => {
            state.formData = action.payload;
        },
        setStepFormDetails: (state, action) => {
            state.stepDetails = {
                ...state.stepDetails,
                ...action.payload.formData,
            };
            state.activeSteps = {
                ...state.activeSteps,
                [action.payload.isActive]: {
                    isCompleted: false,
                    isActive: true,
                },
                [action.payload.isCompleted]: {
                    isCompleted: true,
                    isActive: false,
                },
            };
        },
        setPreviousStep: (state, action) => {
            state.activeSteps = {
                ...state.activeSteps,
                [action.payload.isActive]: {
                    ...state.activeSteps[action.payload.isActive],
                    isActive: true,
                },
                [action.payload.isPreviousActive]: {
                    ...state.activeSteps[action.payload.isPreviousActive],
                    isActive: false,
                },
            };
        },
        setMultipleFormData: (state, action) => {
            state.totalFormList = action.payload;
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

export const {
    setPaginationData,
    setFormData,
    setStepFormDetails,
    setPreviousStep,
    setMultipleFormData,
} = movieSlice.actions;

export default movieSlice.reducer;
