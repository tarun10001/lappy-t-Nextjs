"use client";
import LaptopCard from "@/components/LaptopCard";
import LaptopSearchForm from "@/components/LaptopSearchForm";
import Spinner from "@/components/Spinner";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowCircleLeft } from "react-icons/fa";

const SearchResultsPage = () => {
  const searchParams = useSearchParams();
  console.log(searchParams.get("laptopType"));
  const [laptops, setLaptops] = useState([]);
  const [loading, setLoading] = useState(true);

  const laptopBrand = searchParams.get("laptopBrand");
  const laptopType = searchParams.get("laptopType");

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const res = await fetch(
          `/api/laptops/search?laptopBrand=${laptopBrand}&laptopType=${laptopType}`
        );

        if (res.status === 200) {
          const data = await res.json();
          setLaptops(data);
        } else {
          setLaptops([]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [laptopBrand, laptopType]);

  //   console.log(laptops);

  return (
    <>
    <section className="bg-blue-700 py-24 pb-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
            <LaptopSearchForm />
        </div>
    </section>
    {loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-2">
        <Link
          href="/laptops"
          className="flex items-center text-blue-500 hover:underline mb-3"
        >
          <FaArrowCircleLeft className="mr-2 mb-1" />
          Back To Laptops
        </Link>
        <h1 className="text-2xl mb-4">Search Results</h1>
        {laptops.length === 0 ? (
          <p>No search results found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-16">
            {laptops.map((laptop) => (
              <LaptopCard key={laptop._id} laptop={laptop} />
            ))}
          </div>
        )}
      </div>
    </section>
  )}
    </>
  )
};

export default SearchResultsPage;
