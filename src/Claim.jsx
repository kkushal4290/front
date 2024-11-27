import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import axios from "./api/axios";
const CLAIM_URL = "/donations/claim/";
import { useParams } from "react-router-dom";

export default function App() {
  if (localStorage.getItem("token")) {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Token ${localStorage.getItem("token")}`;
  }
  const { donationID } = useParams();

  const [formData, setFormData] = useState({
    heading: "",
    body: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(CLAIM_URL + donationID, formData)
      .then((res) => {
        console.log(res);
        alert("Claim request sent");
      })
      .catch((err) => console.log(err));
    console.log(formData);
  };

  return (
    <>
      <h1 className="py-10 px-10 font-poppins font-semibold text-3xl text-pink">
        Send a claim for this item
      </h1>
      <div className="px-8 w-100 flex flex-col gap-4">
        <form
          className="flex flex-col gap-5 font-inter "
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-2">
            <input
              className=" py-1.5 border-b-2  focus:outline-none  text-blue placeholder:text-gray-400 sm:text-sm sm:leading-6"
              type="text"
              name="heading"
              placeholder="Title"
              onChange={handleChange}
            />
          </div>
          <div className="flex flex-col gap-2">
            <input
              className="w-50%  py-1.5 border-b-2 focus:outline-none  text-blue placeholder:text-gray-400 sm:text-sm sm:leading-6"
              type="text"
              name="body"
              placeholder="Write a small prompt as to why you need the item"
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="flex w-56 justify-center rounded-md bg-blue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
