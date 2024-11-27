import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "./api/axios";
const RESET_PASSWORD_URL = "accounts/change-password";

export default function resetPassword() {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const [message, setMessage] = useState({
        message: "",
        eos: 1, // 1 for success, -1 for error
    });

    const navigate = useNavigate();

    const [data, setData] = useState({
        old_password: "",
        new_password: "",
    });

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };
const [submitting, setSubmitting] = useState(false);
    const handleSubmit = (e) => {
        setSubmitting(true);
        e.preventDefault();
        axios
            .put(RESET_PASSWORD_URL, data)
            .then((res) => {
                setSubmitting(false);
                if (res.status === 200) {
                    setTimeout(() => {
                        navigate("/login");
                    }, 2500);
                    setMessage({ message: "Password changed successfully", eos: 1 });
                }
            })
            .catch((err) => {
                setSubmitting(false);
                setMessage({
                    message:
                        err.response.data.old_password[0],
                    eos: -1,
                });
            });
    };

    if (!localStorage.getItem("token")) {
        useEffect(() => {
            navigate("/");
        }, []);
    } else {
        axios.defaults.headers.common[
            "Authorization"
        ] = `Token ${localStorage.getItem("token")}`;
        return (
            <>
                <div className="flex flex-col items-center py-20 md:py-10">
                    <h1 className="text-3xl text-blue font-bold py-9  font-poppins">
                        Reset Password
                    </h1>
                    <div className="w-80 flex flex-col gap-4">
                        <form
                            className="flex flex-col gap-5 font-inter "
                            onSubmit={handleSubmit}
                        >
                            <div className="flex flex-col gap-2">
                                <label htmlFor="old_password"></label>
                                <input
                                    className="w-full  py-1.5 border-b-2 focus:outline-none  text-blue placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                    autoComplete="off"
                                    required
                                    type={
                                        isPasswordVisible ? "text" : "password"
                                    }
                                    name="old_password"
                                    id="old_password"
                                    placeholder="Old Password"
                                    value={data.old_password}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="new_password"></label>
                                <input
                                    className="w-full  py-1.5 border-b-2 focus:outline-none  text-blue placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                    required
                                    type={
                                        isPasswordVisible ? "text" : "password"
                                    }
                                    name="new_password"
                                    id="new_password"
                                    placeholder="New Password"
                                    value={data.new_password}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                <input
                                    type="checkbox"
                                    name="isPasswordVisible"
                                    id="isPasswordVisible"
                                    checked={isPasswordVisible}
                                    onChange={togglePasswordVisibility}
                                />
                                <label htmlFor="isPasswordVisible">
                                    Show Password
                                </label>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="flex items-center justify-center rounded-md py-2 text-sm text-white bg-blue w-full"
                                >
                                    <div
                                        class={
                                            `${
                                                submitting
                                                    ? "inline-block"
                                                    : "hidden"
                                            }` +
                                            " h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                                        }
                                        role="status"
                                    >
                                        <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                                            Loading...
                                        </span>
                                    </div>
                                    <span
                                        className={
                                            submitting
                                                ? "hidden"
                                                : "inline-block"
                                        }
                                    >
                                        Submit
                                    </span>
                                </button>
                            </div>
                        </form>
                        <div
                            className={
                                `${message.message ? "block" : "hidden"}` +
                                " m-6 text-lg text-white p-3 rounded-lg " +
                                `${
                                    message.eos === 1
                                        ? "bg-green-500"
                                        : "bg-red"
                                }`
                            }
                        >
                            <p className="text-center">
                                {message.message ? message.message : ""}
                            </p>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
