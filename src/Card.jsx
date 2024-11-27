import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "./api/axios";
import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css'
const UserProfileURL = "/accounts/user/";

export default function Card({
    item_name,
    item_desc,
    item_picture,
    Location,
    createdby,
    d_id,
    showingOnProfile,
    myProfile,
}) {
    const setAuthToken = (token) => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Token ${token}`;
        } else {
            delete axios.defaults.headers.common["Authorization"];
        }
    };

    setAuthToken(localStorage.getItem("token"));

    const [createdbyUser, setcreatedbyUser] = useState("");

    axios
        .get(UserProfileURL + createdby)
        .then((res) => {
            setcreatedbyUser(res.data.user.username);
        })
        .catch((err) => console.log(err));

    return (
        <>
            <div className="w-72 p-3 shadow-2xl bg-white rounded-lg  lg:w- ">
                <a href="#">
                    <LazyLoadImage
                        src={`https://shareaid.pythonanywhere.com${item_picture}`}
                        className="rounded-t-lg w-[264px] h-[197px] object-contain"
                        effect="blur"
                    />
                    {/* <img
                        className="rounded-t-lg w-[264px] h-[197px] object-contain"
                        src={`https://shareaid.pythonanywhere.com${item_picture}`}
                        alt=""
                    /> */}
                </a>
                <div className="p-2">
                    <a href="#">
                        <h5 className="mb-2 font-poppins text-2xl font-bold tracking-tight text-blue">
                            {item_name}
                        </h5>
                    </a>
                    <p className="font-inter ">{item_desc}</p>
                    <p className="font-poppins font-medium ">
                        By:{" "}
                        <Link to={`/userProfile/${createdby}`}>
                            @{createdbyUser}
                        </Link>
                    </p>
                    <p className="text-md font-light"> {Location}</p>
                </div>

                <div>
                    {
                        showingOnProfile ? null : "" // <Link to={`/userProfile/${createdby}`}>
                        //     {createdbyUser}
                        // </Link>
                    }
                    {myProfile ? null : (
                        <>
                            {localStorage.getItem("token") ? (
                                <Link to={`claim/${d_id}`}>
                                    <button className=" w-24 py-2 text-white bg-pink font-inter font-md rounded-md lg:w-32">
                                        Claim Now
                                    </button>
                                </Link>
                            ) : (
                                <Link to="/login">
                                    <button className=" w-24 py-2 text-white bg-pink font-inter font-md rounded-md lg:w-32">
                                        Claim Now
                                    </button>
                                </Link>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
