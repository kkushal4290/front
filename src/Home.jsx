import React from "react";
import { useEffect, useState } from "react";
import axios from "./api/axios";
// import data from "./dummydata";
import Card from "./Card";
import { Link } from "react-router-dom";

export default function Home() {
    const [visibleCards, setVisibleCards] = useState(4);

    const handleSeeMoreClick = () => {
        setVisibleCards((prevVisibleCards) => prevVisibleCards + 4);
    };

    let [data, setData] = useState([]);
    useEffect(() => {
        axios
            .get("/donations/")
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => console.log(err));
    }, []);
    return (
        <>
            <div className="px-5 py-32 lg:px-8 lg:py-24 ">
                <h1 className="text-5xl text-blue leading-[3.5rem] font-poppins font-medium lg:text-7xl lg:leading-[6rem]">
                    Uniting for{" "}
                    <span className="text-pink font-bold">Sustainability</span>,
                    <br></br>One{" "}
                    <span className="text-pink font-bold">Donation</span> at a
                    Time !
                </h1>
                <div className="flex gap-3">
                    {localStorage.getItem("token") ? (
                        <Link to="/AddDonation">
                            <button className="mt-10 w-32 py-2 text-white bg-pink font-inter font-semibold rounded-md lg:w-48">
                                Donate NOW!
                            </button>
                        </Link>
                    ) : (
                        <Link to="/signup">
                            <button className="mt-10 w-32 py-2 text-white bg-pink font-inter font-semibold rounded-md lg:w-48">
                                Sign up
                            </button>
                        </Link>
                    )}
                    <a
                        href="#name"
                        className="mt-10 w-full py-2 text-blue font-inter font-semibold rounded-md lg:w-48"
                    >
                        <button>View available Items</button>
                    </a>
                </div>
                <div>
                    <div className="wave"></div>
                    <div className="wave"></div>
                    <div className="wave"></div>
                </div>
            </div>
            <div className="px-8 mb-9 md:py-4">
                <h2 className="py-4 text-3xl font-poppins text-pink md:text-4xl">
                    Why ShareAid ?
                </h2>
                <p className="font-Inter text-blue font-semibold text-md leading-[2rem] md:text-xl ">
                    Join our online community at ShareAid and be a part of the
                    sustainable revolution! By donating and receiving old items,
                    you can actively contribute to reducing waste, promoting
                    sustainability, and protecting the environment.Together,
                    let's create a brighter future by embracing the power of
                    second-hand items and inspiring others to join the movement.
                    Start donating and receiving today, and together, we'll make
                    a sustainable difference, one item at a time.
                </p>
            </div>
            <h2 className="px-8 py-4 text-3xl font-poppins text-pink">
                Some available Items
            </h2>
            <div className="flex flex-col justify-center m-5">
                <div
                    id="name"
                    className="p-2 flex flex-wrap gap-5 justify-center lg:px-8"
                >
                    {data.slice(0, visibleCards).map((item) => (
                        <Card key={item.d_id} {...item} />
                    ))}
                </div>

                {visibleCards < data.length && (
                    <button
                        className="bg-blue-600 w-52 mx-auto px-5 py-2 text-white bg-blue font-inter font-semibold rounded-md text-md cursor-pointer lg:text-lg "
                        onClick={handleSeeMoreClick}
                    >
                        See More
                    </button>
                )}
            </div>
        </>
    );
}
