"use client";
import { useState, useEffect } from "react";
import LaptopCard from "@/components/LaptopCard";
import Spinner from "@/components/Spinner";
import { toast } from "react-toastify";

const SavedLaptopsPage = () => {
  const [laptops, setLaptops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedLaptops = async () => {
      try {
        const res = await fetch("/api/bookmarks");

        if (res.status === 200) {
          const data = await res.json();
          setLaptops(data);
        } else {
          console.log(res.statusText);
          toast.error("Failed to fetch saved laptops");
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch saved laptops");
      } finally {
        setLoading(false);
      }
    };

    fetchSavedLaptops();
  }, []);

  console.log(laptops);

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className="px-4 mt-24">
        <h1 className="text-2xl mt-14">Saved Laptops</h1>
      <div className="container-xl lg:container m-auto px-4">
        {laptops.length === 0 ? (
          <p>No saved Laptops</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
            {laptops.map((laptop) => (
              <LaptopCard key={laptop._id} laptop={laptop} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SavedLaptopsPage;
