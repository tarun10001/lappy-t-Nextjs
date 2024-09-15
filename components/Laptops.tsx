"use client";
import LaptopCard from "@/components/LaptopCard";
import { fetchLaptops } from "@/utils/requests";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import Pagination from "./Pagination";

const Laptops = async () => {
  const [laptops, setLaptops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [totalItems, setTotalItems] = useState(0);

  // Sort Laptops created by date
  // laptops.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  useEffect(() => {
    const fetchLaptops = async () => {
      try {
        const res = await fetch(
          `/api/laptops?page=${page}&pageSize=${pageSize}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await res.json();
        setLaptops(data.laptops);
        setTotalItems(data.totalLaptops);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchLaptops();
  }, [page, pageSize]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return loading ? (
    <Spinner />
  ) : (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {laptops.length === 0 ? (
          <p>No Laptops found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-4">
            {laptops.map((laptop) => (
              <LaptopCard key={laptop._id} laptop={laptop} />
            ))}
          </div>
        )}
      </div>
      <Pagination
        page={page}
        pageSize={pageSize}
        totalItems={totalItems}
        onPageChange={handlePageChange}
      />
    </section>
  );
};

export default Laptops;
