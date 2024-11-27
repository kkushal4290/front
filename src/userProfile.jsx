import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "./api/axios";
import data from "./dummydata.json";
import { useState } from "react";
import Card from "./Card";

const UserProfileURL = "/accounts/user/";
const UserDonationsURL = "/donations/userdonations/";

export default function UserProfile() {
    const { userID } = useParams();
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

    useEffect(() => {
        axios
            .get(UserProfileURL + userID)
            .then((res) => {
                setUserData(res.data.user);
                axios
                    .get(UserDonationsURL + userID)
                    .then((res) => {
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

    console.log(userDonationItems);

    return (
        <div>
            {/* <h1>User Profile </h1>
            {userData.profile_picture == null ? (
                <img
                    src="https://www.w3schools.com/howto/img_avatar.png"
                    alt="Avatar"
                />
            ) : (
                <img src={userData.profile_picture} alt="Avatar" />
            )}
            <h2>Rating: {userData.rating}</h2>
            <h2>Username: {userData.username}</h2>
            <h2>Bio: {userData.bio}</h2>
            <h2>Email: {userData.email}</h2>

            <h1>User Items</h1> */}
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
                            )}{" "}
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
                                <span className="text-2xl font-bold block uppercase tracking-wide text-pink">
                                    5
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
                    <div className="text-,md text-blue mt-0 mb-2 text-slate-400 font-bold uppercase">
                        <i className="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>
                        Paris, France
                    </div>
                </div>
            </div>
            <h2 className="text-3xl font-poppins px-8 font-semibold mt-8 text-pink">
                Posted by This User:
            </h2>
            <div
                id="name"
                className="p-2 flex flex-wrap gap-5 justify-center lg:px-8"
            >
                {userDonationItems.slice(0, visibleCards).map((item) => (
                    <Card key={item.d_id} {...item} showingOnProfile={true} />
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
