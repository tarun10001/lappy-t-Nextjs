"use client";
import LaptopDetails from "@/components/LaptopDetails";
import LaptopHeaderImage from "@/components/LaptopHeaderImage";
import Spinner from "@/components/Spinner";
import { fetchLaptop } from "@/utils/requests";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import LaptopImages from "@/components/LaptopImages";
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
import BookmarkButton from "@/components/BookmarkButton";
import ShareButtons from "@/components/ShareButtons";
import LaptopContactForm from "@/components/LaptopContactForm";

interface Laptop {
  images: string[];
  title: string;
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
      {loading && <Spinner loading={loading} />}
      {!loading && laptop && (
        <>
          <LaptopHeaderImage image={laptop.images[0]} title={laptop.name} />

          <section>
            <div className="container m-auto px-6">
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

                <aside className="space-y-4">
                  <BookmarkButton laptop={laptop} />
                  {/* <ShareButtons laptop={laptop} /> */}
                  {/* <LaptopContactForm laptop={laptop} /> */}
                </aside>
              </div>
            </div>
          </section>
          <LaptopImages images={laptop.images} />
        </>
      )}
    </>
  );
};

export default page;
