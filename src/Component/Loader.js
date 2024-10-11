import React from "react";

const Loader = () => {
    return (
        <div className="w-full h-screen flex justify-center items-center">
            <div className="w-6 h-6 mr-2 border-4 border-gray-300 border-t-4 border-t-blue-500 rounded-full animate-spin"></div>
            Loading ...{" "}
        </div>
    );
};

export default Loader;
