import React, { useEffect } from "react";
import moment from "moment/moment";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { movieDataList, setPaginationData } from "../redux/userReducer";
import Loader from "./Loader";

const MovieList = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const { movieData, loading, intialPage, totalPages, error } = useSelector(
        (data) => data.user
    );

    console.log("error", error);
    useEffect(() => {
        dispatch(movieDataList(intialPage));
    }, [intialPage]);

    const handlePageClick = (event) => {
        dispatch(setPaginationData(event?.selected + 1));
    };

    return (
        <>
            {loading ? (
                <Loader />
            ) : error ? (
                <div className="text-red-500 flex items-center justify-center">
                    {error}
                </div>
            ) : (
                <div className="p-10">
                    <div className="text-3xl text-center p-6">
                        Popular Movies
                    </div>
                    <div className="grid grid-cols-3 gap-10">
                        {(movieData || []).map((data, index) => {
                            const {
                                poster_path,
                                release_date,
                                title,
                                overview,
                                id,
                            } = data;
                            return (
                                <div
                                    className="flex gap-5  rounded-xl p-5 shadow-xl"
                                    key={index}
                                >
                                    <img
                                        src={`https://media.themoviedb.org/t/p/w220_and_h330_face/${poster_path}`}
                                        alt="movie_poster"
                                        className="max-w-[300px] aspect-square rounded-md"
                                    />
                                    <div className="flex flex-col gap-3 ">
                                        <div
                                            className="cursor-pointer text-xl"
                                            onClick={() =>
                                                navigate(`/movie/${id}`)
                                            }
                                        >
                                            {title}
                                        </div>
                                        <div className="text-base text-gray-500">
                                            {moment(release_date).format(
                                                "Do MMM YY"
                                            )}
                                        </div>
                                        <div className="text-base text-gray-500 line-clamp-5 text-wrap	">
                                            {overview}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="mt-10">
                        <ReactPaginate
                            containerClassName={"pagination"}
                            pageClassName={"page-item"}
                            activeClassName={"active"}
                            breakLabel="..."
                            pageCount={totalPages}
                            pageRangeDisplayed={5}
                            previousLabel="< previous"
                            nextLabel="next >"
                            onPageChange={handlePageClick}
                            forcePage={intialPage - 1}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default MovieList;
