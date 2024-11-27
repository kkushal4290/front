import React from "react";
import axios from "./api/axios";
import { useState, useEffect } from "react";
const ProfileURL = "/accounts/profile";
const UserDontaionsURL = "/donations/userdonations/";
import Card from "./Card";
import { Link } from "react-router-dom";

export default function Profile({}) {
    const setAuthToken = (token) => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Token ${token}`;
        } else {
            delete axios.defaults.headers.common["Authorization"];
        }
    };

    setAuthToken(localStorage.getItem("token"));

    const [userData, setUserData] = useState({});
    const [userDonationItems, setUserDonationItems] = useState([]);

    let userID = null;
    useEffect(() => {
        axios
            .get(ProfileURL)
            .then((res) => {
                userID = res.data.user.id;
                setUserData(res.data.user);

                axios
                    .get(UserDontaionsURL + userID)
                    .then((res) => {
                        console.log(res.data);
                        setUserDonationItems(res.data);
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    }, []);

    const [visibleCards, setVisibleCards] = useState(4);

    const handleSeeMoreClick = () => {
        setVisibleCards((prevVisibleCards) => prevVisibleCards + 4);
    };

    return (
        <div className="">
            
            {/* <h1>My Profile </h1>
            {userData.profile_picture == null ? (
                <img
                    src="https://www.w3schools.com/howto/img_avatar.png"
                    alt="Avatar"
                />
            ) : (
                <img src={userData.user_detail.profile_picture} alt="Avatar" />
            )}
            <h2>Rating: {userData.user_detail.rating}</h2>
            <h2>Username: {userData.user_detail.bio}</h2>
            <h2>Bio: {userData.bio}</h2>
            <h2>Email: {userData.email}</h2>

            <h1>My Items</h1> */}
            <div className="pt-20 px-8">
                <div className="flex flex-wrap justify-center">
                    <div className="w-full flex justify-center">
                        <div className="relative">
                            {userData.profile_picture == null ? (
                                <img
                                    src="https://www.w3schools.com/howto/img_avatar.png"
                                    alt="Avatar"
                                    className="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"
                                />
                            ) : (
                                <img
                                    src={userData.profile_picture}
                                    alt="Avatar"
                                    className="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"
                                />
                            )}
                        </div>
                    </div>
                    <div className="w-full text-center mt-20">
                        <div className="flex justify-center lg:pt-4 pt-8 pb-0">
                            <div className="p-3 text-center">
                                <span className="text-2xl font-bold block uppercase tracking-wide text-pink">
                                    {userDonationItems.length}
                                </span>
                                <span className="text-md text-blue">
                                    Items posted
                                </span>
                            </div>

                            <div className="p-3 text-center">
                                {/* {userData.user_detail.rating ? (
                                    ""
                                ) : (
                                    <span className="text-2xl font-bold block uppercase tracking-wide text-pink">
                                        {userData.user_detail.rating}/10
                                    </span>
                                )} */}
                                <span className="text-2xl font-bold block uppercase tracking-wide text-pink">
                                        5/10
                                    </span>
                                <span className="text-md text-blue">
                                    AVG Rating
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-center mt-2">
                    <h3 className="text-4xl text-pink font-bold leading-normal mb-1">
                        {userData.username}
                    </h3>
                </div>
                <div class="mt-6 py-6 border-t border-slate-200 text-center">
                    <div class="flex flex-wrap justify-center">
                        <div class="w-full px-4">
                            <p class="font-light leading-relaxed text-slate-600 mb-4">
                                {userData.bio}
                            </p>
                        </div>
                    </div>
                </div>
                <Link to = "/AddDonation">
                <button className="w-40 py-2 text-white bg-pink font-inter font-semibold rounded-md">Add donation</button>
            </Link>
            </div>

            <div
                id="name"
                className="p-2 flex flex-wrap gap-5 justify-center lg:px-8"
            >
                {userDonationItems.slice(0, visibleCards).map((item) => (
                    <Card
                        key={item.d_id}
                        {...item}
                        showingOnProfile={true}
                        myProfile={true}
                    />
                ))}
                {visibleCards < userDonationItems.length && (
                    <button
                        className="bg-blue-600 px-5 py-2 text-white bg-blue font-inter font-semibold rounded-md text-md cursor-pointer lg:text-lg "
                        onClick={handleSeeMoreClick}
                    >
                        See More
                    </button>
                )}
            </div>
        </div>
    );
}
