import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "./api/axios";
const AddDonationURL = "/donations/create/";

export default function AddDonation() {
  const navigate = useNavigate();
    const [donationData, setDonationData] = useState({
        item_name: "",
        item_desc: "",
        Location: "",
        item_picture: "",
    });

    const handleChange = (e) => {
        setDonationData({ ...donationData, [e.target.name]: e.target.value });
    };

    const onFileUpload = (e) => {
        setDonationData({ ...donationData, item_picture: e.target.files[0] });
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
            .post(AddDonationURL, donationData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then(() => {
                setSubmitting(false);
                setMessage({ message: "Donation added successfully", eos: 1 });
                setTimeout(() => {
                  navigate("/profile");
                },5000)
            })
            .catch(() => {
                setSubmitting(false);
                setMessage({
                    message: "Error adding donation",
                    eos: -1,
                });
            });
    };

    return (
        <>
            <h1 className="py-10 px-10 font-poppins font-semibold text-3xl text-pink">
                Add New Donation
            </h1>
            <div className="px-8 w-100 flex flex-col gap-4">
                <form
                    className="flex flex-col gap-5 font-inter "
                    onSubmit={handleSubmit}
                >
                    <div className="flex flex-col gap-2">
                        <input
                            className=" py-1.5  w-64 border-b-2  focus:outline-none  text-blue placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            type="text"
                            name="item_name"
                            placeholder="Item Name"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <input
                            className="w-50%  py-1.5 border-b-2 focus:outline-none  text-blue placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            type="text"
                            name="item_desc"
                            placeholder="Item Description"
                            onChange={handleChange}
                        />
                    </div>
                    <input
                        className=" py-1.5  w-64 border-b-2  focus:outline-none  text-blue placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        type="text"
                        name="Location"
                        placeholder="Location"
                        onChange={handleChange}
                    />
                    <label class="block mb-2 text-sm font-medium text-blue">
                        Upload file
                    </label>
                    <input
                        class="block w-60  text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 "
                        type="file"
                        name="item_picture"
                        placeholder="Item Picture"
                        onChange={onFileUpload}
                    />
                    <button
                        type="submit"
                        className="flex items-center justify-center rounded-md py-2 text-sm text-white bg-blue w-full"
                    >
                        <div
                            class={
                                `${submitting ? "inline-block" : "hidden"}` +
                                " h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                            }
                            role="status"
                        >
                            <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                                Loading...
                            </span>
                        </div>
                        <span
                            className={submitting ? "hidden" : "inline-block"}
                        >
                            Submit
                        </span>
                    </button>
                </form>
                <div
                    className={
                        `${message.message ? "block" : "hidden"}` +
                        " m-6 text-lg text-white p-3 rounded-lg " +
                        `${message.eos === 1 ? "bg-green-500" : "bg-red"}`
                    }
                >
                    <p className="text-center">
                        {message.message ? message.message : ""}
                    </p>
                </div>
            </div>
        </>
    );
}
