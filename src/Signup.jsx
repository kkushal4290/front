import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "./api/axios";
const REGISTER_URL = "accounts/register";

export default function Signup() {
    const USER_NAME_REGEX = /^[a-zA-Z][a-zA-Z0-9]{5,10}$/;
    const [validUserName, setValidUserName] = useState(false);
    const EMAIL_REGEX = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    const [validEmail, setValidEmail] = useState(false);
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
        email: "",
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
        if (e.target.id === "email") {
            if (EMAIL_REGEX.test(e.target.value)) {
                setValidEmail(true);
            } else {
                setValidEmail(false);
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
        message:"",
        eos: 1 // 1 for success, -1 for error
    });

    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = (e) => {
        setSubmitting(true);
        e.preventDefault();
        axios
            .post(REGISTER_URL, data)
            .then((res) => {
                setSubmitting(false);
                if (res.status === 200) {
                    setTimeout(() => {
                        setMessage({message:"Redirecting to login page . . . ", eos:1} )
                    }, 2500);
                    setTimeout(() => {
                        navigate("/login");
                    },5000)
                    setMessage({message: "Registration Successful", eos: 1});
                }
            })
            .catch((err) => {
                setSubmitting(false);
                setMessage({message: err.response.data.username[0] + " Please choose another username!", eos: -1});
            });
    };

    if (localStorage.getItem("token")) {
        useEffect(() => {
            navigate("/");
        }, []);
    } else {
        return (
            <>
                <div className="flex flex-col items-center py-20 md:py-10">
                    <h1 className="text-3xl text-blue font-bold py-9 font-poppins">
                        Signup Page
                    </h1>
                    <div className="w-80 flex flex-col gap-4">
                        <form
                            className="flex flex-col gap-5 font-inter "
                            onSubmit={handleSubmit}
                        >
                            <div className="flex relative items-center flex-col lg:flex-row gap-2">
                                <input
                                    className={
                                        `${
                                            validUserName
                                                ? "border-b-2 border-green-500"
                                                : "border-b-2 focus:border-red"
                                        }` +
                                        " peer/username border-blue w-full py-1.5 focus:outline-none text-blue placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                    }
                                    autoComplete="off"
                                    required
                                    type="text"
                                    name="username"
                                    id="username"
                                    placeholder="Enter your username"
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
                                        3. Username should contain only letters
                                        and numbers
                                    </p>
                                </span>
                            </div>
                            <div className="flex flex-col gap-2">
                                <input
                                    className={
                                        `${
                                            validEmail
                                                ? "border-b-2 border-green-500"
                                                : "border-b-2 focus:border-red"
                                        }` +
                                        " peer/email border-blue w-full py-1.5 focus:outline-none text-blue placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                    }
                                    required
                                    type="email"
                                    name="email"
                                    placeholder="Enter your Email"
                                    id="email"
                                    value={data.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="flex flex-col lg:flex-row relative items-center gap-2">
                                {/* <label htmlFor="password">Password</label> */}
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
                                    type={
                                        isPasswordVisible ? "text" : "password"
                                    }
                                    name="password"
                                    id="password"
                                    placeholder="Enter your Password"
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
                    </div>
                    <Link
                        className="mt-2 font-semibold leading-6 text-pink hover:text-indigo-500"
                        to="/login"
                    >
                        Already registered? Sign in
                    </Link>
                    {/* show message if any */}
                    {/* 1 for success and -1 for error */}
                    <div className={`${message.message ? "block" : "hidden"}` + " m-6 text-lg text-white p-3 rounded-lg " + `${message.eos === 1 ? "bg-green-500" : "bg-red"}`}>
                        <p className="text-center">{message.message ? message.message : ""}</p>
                    </div>
                </div>
            </>
        );
    }
}
