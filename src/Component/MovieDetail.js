import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { movieDetailData } from "../redux/userAction";

const MovieDetail = () => {
    const dispatch = useDispatch();
    const { loading, movieDetails } = useSelector((data) => data.user);
    const { id } = useParams();

    useEffect(() => {
        dispatch(movieDetailData(id));
    }, []);

    console.log("movieDetails", movieDetails);
    return (
        <div>
            <div className="relative bg-slate-400 h-[400px]">
                <img
                    src={`https://media.themoviedb.org/t/p/w220_and_h330_face/${movieDetails?.poster_path}`}
                    alt="movie_poster"
                    className="max-w-[300px] aspect-square rounded-md"
                />
            </div>
        </div>
    );
};

export default MovieDetail;
