"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const LaptopSearchForm = () => {
  const [laptopBrand, setLaptopBrand] = useState("");
  const [laptopType, setLaptopType] = useState("All");

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(laptopType, laptopBrand);

    if (laptopBrand === "" && laptopType === "All") {
      router.push("/laptops");
    } else {
      const query = `?laptopBrand=${laptopBrand}&laptopType=${laptopType}`;
      router.push(`/laptops/search-results${query}`);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="mt-3 mx-auto max-w-2xl w-full flex flex-col md:flex-row items-center"
    >
      <div className="w-full md:w-3/5 md:pr-2 mb-4 md:mb-0">
        <label htmlFor="brand" className="sr-only">
          Laptop Brand
        </label>
        <input
          type="text"
          id="store_location"
          placeholder="Enter Keywords or Laptop Brand"
          className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
          value={laptopBrand}
          onChange={(e) => setLaptopBrand(e.target.value)}
        />
      </div>
      <div className="w-full md:w-2/5 md:pl-2">
        <label htmlFor="laptop-type" className="sr-only">
          Laptop Type
        </label>
        <select
          id="laptop-type"
          className="w-full px-4 py-3 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
          value={laptopType}
          onChange={(e) => setLaptopType(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Gaming-Laptop">Gaming-Laptop</option>
          <option value="Business-Laptop">Business-Laptop</option>
          <option value="Notebook-Laptop">Notebook-Laptop</option>
        </select>
      </div>
      <button
        onClick={handleSubmit}
        type="submit"
        className="md:ml-4 mt-4 md:mt-0 w-full md:w-auto px-6 py-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
      >
        Search
      </button>
    </form>
  );
};

export default LaptopSearchForm;
