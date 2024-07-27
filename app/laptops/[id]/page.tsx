"use client";

import LaptopDetails from "@/components/LaptopDetails";
import LaptopHeaderImage from "@/components/LaptopHeaderImage";
import { fetchLaptop } from "@/utils/requests";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaBath,
  FaBed,
  FaBookmark,
  FaCheck,
  FaMapMarker,
  FaPaperPlane,
  FaRulerCombined,
  FaShare,
  FaTimes,
} from "react-icons/fa";

interface Laptop {
  images: string[];
  title: string;

  // Add other properties of the Laptop as needed
}

const page = () => {
  const { id } = useParams<{ id: string }>();

  const [laptop, setLaptop] = useState<Laptop | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLaptopData = async () => {
      if (!id) return;
      try {
        const laptop = await fetchLaptop(id);
        console.log(laptop);
        setLaptop(laptop);
      } catch (error) {
        console.log("Error fetching laptop", error);
      } finally {
        setLoading(false);
      }
    };

    if (laptop === null) {
      fetchLaptopData();
    }
  }, [id, laptop]);

  if (!laptop && !loading) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">Laptop not found</h1>
    );
  }

  return (
    <>
      {!loading && laptop && (
        <>
          <LaptopHeaderImage image={laptop.images[0]} title={laptop.name} />

          <section>
            <div className="container m-auto py-6 px-6">
              <Link
                href="/laptops"
                className="text-blue-500 hover:text-blue-600 flex items-center"
              >
                <FaArrowLeft className="mr-2" />
                Back to Laptops
             
              </Link>
            </div>
          </section>

          <section className="bg-blue-50">
            <div className="container m-auto py-10 px-6">
              <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                <LaptopDetails laptop={laptop} />

                {/* <!-- Sidebar --> */}
                <aside className="space-y-4">
                  <div>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center">
                      <FaBookmark className="mr-2" />
                      Bookmark laptop
                    </button>
                  </div>
                  <div>
                    <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center">
                      <FaShare className="mr-2" /> Share laptop
                    </button>
                  </div>

                  {/* <!-- Contact Form --> */}
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-6">
                      Contact laptop Manager
                    </h3>
                    <form
                      action="mailto:support@traversymedia.com"
                      method="post"
                      encType="text/plain"
                    >
                        <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="name"
                        >
                          Name:
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="name"
                          type="text"
                          placeholder="Enter your name"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="email"
                        >
                          Email:
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="message"
                        >
                          Message:
                        </label>
                        <textarea
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-44 focus:outline-none focus:shadow-outline"
                          id="message"
                          placeholder="Enter your message"
                        ></textarea>
                      </div>
                      <div>
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline flex items-center justify-center"
                          type="submit"
                        >
                          <FaPaperPlane className="mr-2" /> Send Message
                        </button>
                      </div>
                    </form>
                  </div>
                </aside>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default page;
