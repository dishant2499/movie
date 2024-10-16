import React from "react";

const Input = ({
    label,
    type,
    value,
    defaultValue,
    placeholder,
    name,
    className,
    onChange,
    isInputLabelRight,
    error,
    max,
    checkboxLabel,
}) => {
    return (
        <div
            className={`flex  gap-1 ${
                isInputLabelRight ? "flex-row" : "flex-col"
            }`}
        >
            {label && <label className="w-[150px]">{label} : </label>}
            <div className="flex flex-col gap-[2px]">
                <input
                    type={type}
                    value={value}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    name={name}
                    className={`border  max-w-[250px] rounded-lg py-1.5 px-2 ${className} ${
                        error ? "border-red-600" : "border-black"
                    }`}
                    onChange={onChange}
                    maxLength={max}
                />
                {error && <div className="text-red-400">{error}</div>}
            </div>
        </div>
    );
};

export default Input;
