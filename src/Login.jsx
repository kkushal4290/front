import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "./api/axios";
const LOGIN_URL = "accounts/login";

export default function Login() {
    const USER_NAME_REGEX = /^[a-zA-Z][a-zA-Z0-9]{5,10}$/;
    const [validUserName, setValidUserName] = useState(false);
    const PASSWORD_REGEX =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$]).{8,24}$/;
    const [validPassword, setValidPassword] = useState(false);

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const navigate = useNavigate();

    const [data, setData] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
        if (e.target.id === "username") {
            if (USER_NAME_REGEX.test(e.target.value)) {
                setValidUserName(true);
            } else {
                setValidUserName(false);
            }
        }
        if (e.target.id === "password") {
            if (PASSWORD_REGEX.test(e.target.value)) {
                setValidPassword(true);
            } else {
                setValidPassword(false);
            }
        }
    };
    const [message, setMessage] = useState({
        message: "",
        eos: 1, // 1 for success, -1 for error
    });
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = (e) => {
        setSubmitting(true);
        e.preventDefault();
        axios
            .post(LOGIN_URL, data)
            .then((res) => {
                setSubmitting(false);
                console.log(res.data)
                localStorage.setItem("token", res.data.token);
                if (res.status === 200) {
                    setTimeout(() => {
                        setMessage({
                            message: "Redirecting to home page . . . ",
                            eos: 1,
                        });
                    }, 2500);
                    setTimeout(() => {
                        navigate("/");
                    }, 5000);
                    setMessage({ message: "Login Successful", eos: 1 });
                }
            })
            .catch((err) => {
                setSubmitting(false);
                setMessage({
                    message: err.response.data.non_field_errors[0],
                    eos: -1,
                });
            });
    };
    useEffect(() => {
        if (localStorage.getItem("token")) navigate("/");
    }, []);

    return (
        <>
            <div className="flex flex-col items-center py-20 md:py-10">
                <h1 className="text-3xl text-blue font-bold py-9 font-poppins">
                    Login
                </h1>
                <div className="w-80 flex flex-col gap-4">
                    <form
                        className="flex flex-col gap-5 font-inter "
                        onSubmit={handleSubmit}
                    >
                        <div className="flex lg:flex-row relative items-center flex-col gap-2">
                            {/* <label className="text-lg font-sm leading-6" htmlFor="username">Username</label> */}
                            <input
                                className={
                                    `${
                                        validUserName
                                            ? "border-b-2 border-green-500"
                                            : "border-b-2 focus:border-red"
                                    }` +
                                    " peer/username border-blue w-full py-1.5 focus:outline-none text-blue placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                }
                                required
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Enter your user Name"
                                value={data.username}
                                onChange={handleChange}
                            />
                            <span
                                className={`${
                                    validUserName
                                        ? "hidden"
                                        : "peer-focus/username:block hidden lg:absolute  -right-3 lg:translate-x-full bg-gray-500/50 px-5 py-2 rounded-xl text-black"
                                }`}
                            >
                                <p>
                                    1. Username should be 6-10 characters
                                    <br />
                                    2. Username should start with a letter
                                    <br />
                                    3. Username should contain only letters and
                                    numbers
                                </p>
                            </span>
                        </div>
                        <div className="flex lg:flex-row items-center relative flex-col">
                            {/* <label className="text-lg font-sm leading-6" htmlFor="password">Password</label> */}
                            <input
                                className={
                                    `${
                                        validPassword
                                            ? "border-b-2 border-green-500"
                                            : "border-b-2 focus:border-red"
                                    }` +
                                    " peer/password border-blue w-full py-1.5 focus:outline-none text-blue placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                }
                                required
                                type={isPasswordVisible ? "text" : "password"}
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                value={data.password}
                                onChange={handleChange}
                            />
                            <span
                                className={`${
                                    validPassword
                                        ? "hidden"
                                        : "peer-focus/password:block hidden lg:absolute  -right-3 lg:translate-x-full bg-gray-500/50 px-5 py-2 rounded-xl text-black"
                                }`}
                            >
                                <p>
                                    1. password should be 8-24 characters
                                    <br />
                                    2. password should contain at least one
                                    upper case letter.
                                    <br />
                                    3. password should contain at least one
                                    lower case letter.
                                    <br />
                                    4. password should contain at least one
                                    number.
                                    <br />
                                    5. password should contain at least one
                                    special character (!@#$)
                                </p>
                            </span>
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
                                        submitting ? "hidden" : "inline-block"
                                    }
                                >
                                    Login
                                </span>
                            </button>
                        </div>
                    </form>
                    <Link
                        className=" font-semibold leading-6 text-pink hover:text-indigo-500"
                        to="/signup"
                    >
                        New User? Signup
                    </Link>
                    <div
                        className={
                            `${message.message ? "block" : "hidden"}` +
                            " m-6 sm:m-0 text-lg text-white p-3 rounded-lg " +
                            `${message.eos === 1 ? "bg-green-500" : "bg-red"}`
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
