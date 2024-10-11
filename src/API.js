import axios from "axios";

const movieDeatils = async (page) => {
    const MovieList = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`,
        {
            params: {
                api_key: process.env.REACT_APP_API_KEY,
            },
        }
    );
    return MovieList.data;
};

const movieDeatilDescription = async (id) => {
    const MovieList = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}`,
        {
            params: {
                api_key: process.env.REACT_APP_API_KEY,
            },
        }
    );
    return MovieList.data;
};

export { movieDeatils, movieDeatilDescription };
