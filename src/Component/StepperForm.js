import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { setStepFormDetails, setPreviousStep } from "../redux/userReducer";
import Input from "./Input";

const StepperForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { activeSteps, stepDetails } = useSelector((data) => data.user);
    const stepperFormSchema = yup
        .object({
            firstname: yup.string().required("username is required"),
            lastname: yup.string().required("password is required"),
            phonenumber: yup
                .string()
                .required("phone number is required")
                .min(10, "min 10 number is required")
                .max(10, "max 10 number is allowed"),
            email: activeSteps.step2.isActive
                ? yup
                      .string()
                      .email("Must be a valid email")
                      .required("email is required")
                : yup.string().notRequired(),
            passWord: activeSteps.step2.isActive
                ? yup.string().required("password is required")
                : yup.string().notRequired(),
            type: activeSteps.step2.isActive
                ? yup.string().required("type is required")
                : yup.string().notRequired(),
            confirm: activeSteps.step3.isActive
                ? yup
                      .boolean()
                      .oneOf([true], "please check the box before submit")
                : yup.boolean().notRequired(),
        })
        .required();

    const { control, handleSubmit } = useForm({
        defaultValues: {
            firstname: stepDetails.firstname || "",
            lastname: stepDetails.lastname || "",
            phonenumber: stepDetails.phonenumber || "",
            email: stepDetails.email || "",
            passWord: stepDetails.passWord || "",
            type: stepDetails.type || "admin",
            confirm: false,
        },
        resolver: yupResolver(stepperFormSchema),
    });

    const onSubmit = (event) => {
        const Data = {
            formData: event,
            isCompleted: activeSteps.step1.isActive
                ? "step1"
                : activeSteps.step2.isActive
                ? "step2"
                : "step3",
            isActive: activeSteps.step1.isActive
                ? "step2"
                : activeSteps.step2.isActive
                ? "step3"
                : "step3",
        };
        dispatch(setStepFormDetails(Data));
        if (activeSteps.step3.isActive) {
            navigate("/");
        }
    };

    const handleOnPrevious = () => {
        let newActiveStep;
        if (activeSteps.step3.isActive) {
            newActiveStep = "step2"; // Go to step 2 from step 3
        } else if (activeSteps.step2.isActive) {
            newActiveStep = "step1"; // Go to step 1 from step 2
        }

        const dataList = {
            isActive: newActiveStep,
            isPreviousActive: activeSteps.step2.isActive ? "step2" : "step3",
        };

        dispatch(setPreviousStep(dataList));
    };

    const stepperData = [
        {
            index: 1,
            title: "Personal Detail",
            subTitle: "please fill the personal detial",
            activeOrCompletedStep:
                activeSteps.step1.isActive || activeSteps.step1.isCompleted,
        },
        {
            index: 2,
            title: "Email Verification",
            subTitle: "please fill the email and password",
            activeOrCompletedStep:
                activeSteps.step2.isActive || activeSteps.step2.isCompleted,
        },
        {
            index: 3,
            title: "Completed",
            subTitle: "all the steps are completed",
            activeOrCompletedStep:
                activeSteps.step3.isActive || activeSteps.step3.isCompleted,
        },
    ];
    return (
        <div className="p-20">
            <div className="text-3xl text-center">Multiple form Wizard</div>
            <div className="mx-auto flex w-full justify-between mt-10 max-w-[1200px] relative ">
                {stepperData.map((data, index) => {
                    return (
                        <div className="flex flex-col gap-3 w-fit" key={index}>
                            <div
                                className={` border rounded-full w-7 h-7 flex justify-center items-center ${
                                    data.activeOrCompletedStep
                                        ? "text-white bg-green-400 border-green-500"
                                        : "bg-white border-black text-black"
                                }`}
                            >
                                {data.index}
                            </div>
                            <div
                                className={`${
                                    data.activeOrCompletedStep
                                        ? "text-green-400"
                                        : "text-black"
                                }`}
                            >
                                {data.title}
                            </div>
                            <div
                                className={`${
                                    data.activeOrCompletedStep
                                        ? "text-green-400"
                                        : "text-black"
                                }`}
                            >
                                {data.subTitle}
                            </div>
                        </div>
                    );
                })}
                <div className="absolute w-[85%] top-[12%] bg-black h-[2px] -z-[1]" />
            </div>
            <div className="mt-14 max-w-[400px] mx-auto ">
                <div>
                    <div className="flex flex-col gap-10 ">
                        {activeSteps.step1.isActive && (
                            <>
                                <Controller
                                    control={control}
                                    render={({
                                        field: { onChange, value },
                                        fieldState: { error },
                                    }) => (
                                        <Input
                                            label="firstName"
                                            type="text"
                                            value={value}
                                            placeholder="please enter firstName"
                                            name="firstname"
                                            onChange={onChange}
                                            error={
                                                error ? error?.message : null
                                            }
                                            className="max-w-full"
                                        />
                                    )}
                                    name="firstname"
                                />

                                <Controller
                                    control={control}
                                    render={({
                                        field: { onChange, value },
                                        fieldState: { error },
                                    }) => (
                                        <Input
                                            label="lastName"
                                            type="text"
                                            value={value}
                                            placeholder="please enter lastname"
                                            name="lastname"
                                            onChange={onChange}
                                            error={
                                                error ? error?.message : null
                                            }
                                            className="max-w-full"
                                        />
                                    )}
                                    name="lastname"
                                />
                                <Controller
                                    control={control}
                                    render={({
                                        field: { onChange, value },
                                        fieldState: { error },
                                    }) => (
                                        <Input
                                            label="PhoneNumber"
                                            type="number"
                                            value={value}
                                            placeholder="please enter phone-number"
                                            name="phonenumber"
                                            onChange={(event) => {
                                                const changeValue =
                                                    event.target.value.replace(
                                                        /[^0-9]/g,
                                                        ""
                                                    );
                                                onChange(changeValue);
                                            }}
                                            error={
                                                error ? error?.message : null
                                            }
                                            className="max-w-full"
                                            max="10"
                                        />
                                    )}
                                    name="phonenumber"
                                />
                            </>
                        )}

                        {activeSteps.step2.isActive && (
                            <>
                                <Controller
                                    control={control}
                                    render={({
                                        field: { onChange, value },
                                        fieldState: { error },
                                    }) => (
                                        <Input
                                            label="email"
                                            type="email"
                                            value={value}
                                            placeholder="please enter email"
                                            name="email"
                                            onChange={onChange}
                                            error={
                                                error ? error?.message : null
                                            }
                                            className="max-w-full"
                                        />
                                    )}
                                    name="email"
                                />
                                <Controller
                                    control={control}
                                    render={({
                                        field: { onChange, value },
                                        fieldState: { error },
                                    }) => (
                                        <Input
                                            label="passWord"
                                            type="passWord"
                                            value={value}
                                            placeholder="please enter passWord"
                                            name="passWord"
                                            onChange={onChange}
                                            error={
                                                error ? error?.message : null
                                            }
                                            className="max-w-full"
                                        />
                                    )}
                                    name="passWord"
                                />

                                <Controller
                                    control={control}
                                    render={({
                                        field: { onChange, value },
                                    }) => (
                                        <select
                                            name="type"
                                            id="type"
                                            onChange={onChange}
                                            value={value}
                                        >
                                            <option
                                                value="admin"
                                                defaultChecked
                                            >
                                                admin
                                            </option>
                                            <option value="superadmin">
                                                superadmin
                                            </option>
                                        </select>
                                    )}
                                    name="type"
                                />
                            </>
                        )}

                        {activeSteps.step3.isActive && (
                            <div className="text-center">
                                <Controller
                                    control={control}
                                    render={({
                                        field: { onChange, value },
                                        fieldState: { error },
                                    }) => (
                                        <div>
                                            <div className="flex gap-2 items-center">
                                                <input
                                                    type="checkbox"
                                                    value={value}
                                                    name="confirm"
                                                    onChange={onChange}
                                                    className="max-w-full h-5 w-5 "
                                                />
                                                <span>
                                                    {" "}
                                                    please check the box to
                                                    submit detail succesfully
                                                </span>
                                            </div>
                                            {error && (
                                                <div className="text-red-400">
                                                    {error.message}
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    name="confirm"
                                />
                            </div>
                        )}
                        <div className="flex gap-4">
                            {!activeSteps.step1.isActive && (
                                <button
                                    className="bg-blue-400 border py-2 px-4 w-fit rounded-lg mx-auto"
                                    onClick={() => handleOnPrevious()}
                                >
                                    previous
                                </button>
                            )}

                            <button
                                className="bg-blue-400 border py-2 px-4 w-fit rounded-lg mx-auto "
                                onClick={handleSubmit(onSubmit)}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StepperForm;
