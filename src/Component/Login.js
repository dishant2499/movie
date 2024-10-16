import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import { setFormData } from "../redux/userReducer";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loginSchema = yup
        .object({
            username: yup.string().required("username is required"),
            password: yup.string().required("password is required"),
        })
        .required();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            username: "",
            password: "",
        },
        resolver: yupResolver(loginSchema),
    });

    useEffect(() => {
        const userAuthToken = JSON.parse(localStorage.getItem("authUserToken"));
        if (userAuthToken) {
            navigate("/");
        }
    }, []);

    const onSubmit = async (event) => {
        await localStorage.setItem(
            "authUserToken",
            JSON.stringify("sdkfhdshfuwernmjndfjkshf")
        );
        dispatch(setFormData(event));
        navigate("/");
    };

    return (
        <div className="w-full flex justify-center items-center h-screen">
            <div className="max-w-[700px] shadow-xl p-10 rounded-xl">
                <form className="flex flex-col gap-10 ">
                    <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                label="UserName"
                                type="text"
                                value={value}
                                placeholder="please enter username"
                                name={"username"}
                                onChange={onChange}
                                isInputLabelRight
                                error={errors?.username?.message}
                            />
                        )}
                        name="username"
                    />

                    <Controller
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                label="Password"
                                type="text"
                                value={value}
                                placeholder="please enter password"
                                name="password"
                                onChange={onChange}
                                isInputLabelRight
                                error={errors.password?.message}
                            />
                        )}
                        name="password"
                    />
                    <button
                        className="bg-blue-400 border py-2 px-4 w-fit rounded-lg mx-auto "
                        onClick={handleSubmit(onSubmit)}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
