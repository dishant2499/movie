import React, { useEffect, useState } from "react";
import Input from "./Input";

const Converter = () => {
    const [Converter, setConverter] = useState("temperature");
    const [label, setLabel] = useState({
        label1: "Celsius",
        label2: "Fahrenheit",
    });
    const [valueList, setValueList] = useState({
        value1: 1,
        value2: null,
    });

    const ConvertValue = (value, name, ConverterList) => {
        if (ConverterList === "temperature") {
            if (name === "Celsius") {
                const changeValue = (value * 9) / 5 + 32;
                setValueList({
                    value1: value,
                    value2: changeValue,
                });
            } else if (name === "Fahrenheit") {
                const changeValue = ((value - 32) * 5) / 9;
                setValueList({
                    value1: changeValue,
                    value2: value,
                });
            }
        } else if (ConverterList === "time") {
            if (name === "Second") {
                const changeValue = value / 60;
                setValueList({
                    value1: value,
                    value2: changeValue,
                });
            } else if (name === "Minute") {
                const changeValue = value * 60;
                setValueList({
                    value1: changeValue,
                    value2: value,
                });
            }
        }
    };

    useEffect(() => {
        ConvertValue(
            1,
            Converter === "temperature" ? "Celsius" : "Second",
            Converter
        );
        if (Converter === "temperature") {
            setLabel({
                label1: "Celsius",
                label2: "Fahrenheit",
            });
        } else if (Converter === "time") {
            setLabel({
                label1: "Second",
                label2: "Minute",
            });
        }
    }, [Converter]);

    const handleOnSelectConverter = (e) => {
        const { value } = e.target;
        setConverter(value);
    };

    const handleOnConverterChange = (e) => {
        const { value, name } = e.target;
        ConvertValue(value, name, Converter);
    };

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="w-[50%] flex flex-col gap-6 bg-red-100 rounded-md p-6">
                <select
                    name="selectConverter"
                    id="converter"
                    onChange={handleOnSelectConverter}
                >
                    <option value="temperature">temperature</option>
                    <option value="time">time</option>
                </select>
                <div className="flex justify-between">
                    <Input
                        label={label.label1}
                        type="number"
                        value={valueList.value1}
                        defaultValue={0}
                        placeholder={`please enter ${label.label1}`}
                        name={label.label1}
                        onChange={handleOnConverterChange}
                    />
                    <Input
                        label={label.label2}
                        type="number"
                        value={valueList.value2}
                        defaultValue={0}
                        placeholder={`please enter ${label.label2}`}
                        name={label.label2}
                        onChange={handleOnConverterChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default Converter;
