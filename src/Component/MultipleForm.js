import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "./Input";
import { setMultipleFormData } from "../redux/userReducer";

const MultipleForm = () => {
    const dispatch = useDispatch();
    const { totalFormList } = useSelector((data) => data.user);

    console.log("totalFormList", totalFormList);

    const multipleFormSchema = yup.object().shape({
        userField: yup.array().of(
            yup.object().shape({
                firstname: yup.string().required("First name is required"),
                lastname: yup.string().required("Last name is required"),
                file: yup
                    .mixed()
                    .required("File is required")
                    .test(
                        "fileSize",
                        "File is too large",
                        (value) =>
                            !value || (value && value.size <= 1024 * 1024) // 1MB file size limit
                    )
                    .test(
                        "fileFormat",
                        "Unsupported Format",
                        (value) =>
                            !value ||
                            (value &&
                                [
                                    "image/jpeg",
                                    "image/png",
                                    "application/pdf",
                                ].includes(value.type)) // Allow specific file formats
                    ),
            })
        ),
    });

    const { control, handleSubmit } = useForm({
        defaultValues: {
            userField: [
                {
                    firstname: "",
                    lastname: "",
                    file: null,
                },
            ],
        },
        resolver: yupResolver(multipleFormSchema),
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "userField",
    });

    const onSubmit = (event) => {
        const formDataList = event.userField.map((item) => {
            const data = new FormData();

            if (item.file && item.file.name) {
                data?.append("file", item.file);

                // Optionally, add the file's path or name
                data?.append("path", item.file.name);
            }
            return { ...item, file: data };
        });

        dispatch(setMultipleFormData(formDataList));
    };

    const handleSubmitCloneData = () => {
        append({
            firstname: "",
            lastname: "",
            file: null,
        });
    };
    return (
        <div className="p-14">
            <div className="flex justify-between">
                <span className="text-3xl">Multiple Form</span>
                <button
                    className="bg-blue-400 border py-2 px-4 w-fit rounded-lg "
                    onClick={handleSubmitCloneData}
                >
                    ADD +
                </button>
            </div>
            <div className="mt-10 flex flex-col justify-center gap-10">
                {fields.map((item, index) => (
                    <div
                        className="relative max-w-[500px]  flex flex-col gap-5 p-5 border border-black"
                        key={item.id}
                    >
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
                                    onChange={onChange}
                                    error={error ? error?.message : null}
                                    className="max-w-full"
                                />
                            )}
                            name={`userField.${index}.firstname`}
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
                                    placeholder="please enter lastName"
                                    onChange={onChange}
                                    error={error ? error?.message : null}
                                    className="max-w-full"
                                />
                            )}
                            name={`userField.${index}.lastname`}
                        />
                        <Controller
                            control={control}
                            render={({
                                field: { onChange },
                                fieldState: { error },
                            }) => (
                                <>
                                    <input
                                        type="file"
                                        onChange={(e) =>
                                            onChange(e.target.files[0])
                                        }
                                        error={error ? error?.message : null}
                                        className="max-w-full"
                                    />
                                    {error && (
                                        <div className="text-red-400">
                                            {error?.message}
                                        </div>
                                    )}
                                </>
                            )}
                            name={`userField.${index}.file`}
                        />
                        {index > 0 && (
                            <button
                                className="absolute bottom-2 right-2 bg-red-400 border py-2 px-4 w-fit rounded-lg "
                                onClick={() => remove(index)}
                            >
                                Delete
                            </button>
                        )}
                    </div>
                ))}
                <button
                    className="bg-blue-400 border py-2 px-4 w-fit rounded-lg "
                    onClick={handleSubmit(onSubmit)}
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export default MultipleForm;
