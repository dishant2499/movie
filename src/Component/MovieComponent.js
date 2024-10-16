import React from "react";
import { useParams } from "react-router-dom";
import MovieDetail from "./MovieDetail";
import MovieList from "./MovieList";

const MovieComponent = () => {
    const { id } = useParams();

    return id ? <MovieDetail id={id} /> : <MovieList />;
};

export default MovieComponent;
