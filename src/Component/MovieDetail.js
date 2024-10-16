import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { movieDetailData } from "../redux/userReducer";
import Loader from "./Loader";

const MovieDetail = ({ id }) => {
    const dispatch = useDispatch();
    const { loading, movieDetails } = useSelector((data) => data.user);

    useEffect(() => {
        dispatch(movieDetailData(id));
    }, []);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <div>
                    <div className="relative h-[400px] p-20">
                        <div className="flex gap-20">
                            <img
                                src={`https://media.themoviedb.org/t/p/w220_and_h330_face/${movieDetails?.poster_path}`}
                                alt="movie_poster"
                                className="w-[400px] aspect-square rounded-2xl "
                            />
                            <div className="flex flex-col gap-10">
                                <div className="text-3xl">
                                    {movieDetails?.original_title}
                                </div>
                                <div className="text-2xl">
                                    release date :{" "}
                                    <span className="text-gray-600 font-semibold">
                                        {movieDetails?.release_date}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-5 mt-20">
                            <div className="text-xl">Production Company</div>
                            <div className="flex gap-5">
                                {(movieDetails?.production_companies || []).map(
                                    (data, index) => (
                                        <div
                                            key={index}
                                            className="flex flex-col gap-2"
                                        >
                                            <img
                                                src={`https://media.themoviedb.org/t/p/w220_and_h330_face/${data?.logo_path}`}
                                                alt="movie_poster"
                                                className="w-[50px] h-[50px]  rounded-full object-fill"
                                            />
                                            <div className="text-lg">
                                                {data?.name}
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                        <img
                            src={`https://media.themoviedb.org/t/p/w220_and_h330_face/${movieDetails?.poster_path}`}
                            alt="movie_poster"
                            className="absolute inset-0 opacity-30 -z-[1] w-full h-screen"
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default MovieDetail;
