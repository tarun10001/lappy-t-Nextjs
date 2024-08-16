import Link from "next/link";
import React from "react";
import { FaMapMarker } from "react-icons/fa";
import Image from "next/image";
import { MdOutlineScreenshotMonitor, MdSdStorage } from "react-icons/md";
import { GiProcessor } from "react-icons/gi";

const LaptopCard = ({ laptop }) => {
  // console.log(laptop.store_location.state)
  return (
    <div className="rounded-xl shadow-md justify-content-center items-center">
      <Image
        src={laptop.images[0]}
        alt=""
        height={10}
        width={10}
        sizes="10vw"
        className="mx-auto w-[400px] h-[300px] rounded-t-xl"
      />
      <div className="p-4">
        <div className="text-left md:text-center lg:text-left mb-6">
          <div className="flex center justify-between mb-4">
            <div className="font-bold text-gray-500">{laptop.brand}</div>
            <div className="text-gray-600">{laptop.type}</div>
          </div>
          <h3 className="text-xl font-bold flex flex-col space-y-8 h-[80px]">
            {laptop.name}
          </h3>
        </div>
        <div className="flex flex-col justify-center gap-3 text-gray-500 mb-4">
          <p>
            <MdOutlineScreenshotMonitor className="inline mr-2" />
            {laptop.screen_size}
          </p>
          <p className="h-[40px]">
            <GiProcessor className="inline mr-2" />
            {laptop.processor}
          </p>
          <p>
            <MdSdStorage className="inline mr-2" />
            {laptop.storage}
          </p>
          <p className="text-blue-500 text-center">
            {" "}
            <span className="text-xl">₹{laptop.rates.discount_price}</span>{" "}
            <span className="line-through text-xl">
            ₹{laptop.rates.regular_price}
            </span>
          </p>
        </div>
        <div className="border border-gray-100 mb-5"></div>



        <div className="flex flex-col lg:flex-row justify-between items-center mb-4">
          <div>
            <p className="text-xs text-gray-500">Store location</p>

            <div className="flex align-middle gap-2 mb-4 lg:mb-0">
              <FaMapMarker className="text-orange-700 mt-1" />
              <span className="text-orange-700">
                {laptop.store_location.city} {laptop.store_location.state}{" "}
                {laptop?.store_location?.city || "Unknown City"},
              </span>
            </div>
          </div>

          <Link
            href={`/laptops/${laptop._id}`}
            className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            Details
          </Link>
        </div>


      </div>
    </div>
  );
};

export default LaptopCard;
