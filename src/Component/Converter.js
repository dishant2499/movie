import React, { useEffect, useState } from "react";

const Converter = () => {
    const [Converter, setConverter] = useState("tempreture");
    const [label, setLabel] = useState({
        label1: "Celcius",
        label2: "Farenheit",
    });
    const [valueList, setValueList] = useState({
        value1: 1,
        value2: null,
    });

    const ConvertValue = (value, name, ConverterList) => {
        if (ConverterList === "tempreture") {
            if (name === "Celcius") {
                const changeValue = (value * 9) / 5 + 32;
                setValueList({
                    value1: value,
                    value2: changeValue,
                });
            } else if (name === "Farenheit") {
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
            Converter === "tempreture" ? "Celcius" : "Second",
            Converter
        );
        if (Converter === "tempreture") {
            setLabel({
                label1: "Celcius",
                label2: "Farenheit",
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
                    <option value="tempreture">tempreture</option>
                    <option value="time">time</option>
                </select>
                <div className="flex justify-between">
                    <div className="flex flex-col gap-1">
                        <label>{label.label1}</label>
                        <input
                            type="number"
                            value={valueList.value1}
                            defaultValue={0}
                            placeholder={`please enter ${label.label1}`}
                            name={label.label1}
                            className="border border-black max-w-[250px] rounded-lg py-1 px-2"
                            onChange={handleOnConverterChange}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label>{label.label2}</label>
                        <input
                            type="number"
                            value={valueList.value2}
                            defaultValue={0}
                            placeholder={`please enter ${label.label2}`}
                            name={label.label2}
                            className="border border-black max-w-[250px] rounded-lg py-1 px-2"
                            onChange={handleOnConverterChange}
                            onClick={(e) => console.log("errrr", e)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Converter;
