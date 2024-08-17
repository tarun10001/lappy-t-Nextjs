"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import profileDefault from "@/assets/images/profile.png";
import Spinner from "@/components/Spinner";

const ProfilePage = () => {
  const { data: session } = useSession();
  const profileImage = session?.user?.image;
  const profileName = session?.user?.name;
  const profileEmail = session?.user?.email;

  const [laptops, setLaptops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserLaptops = async (userId) => {
      if (!userId) {
        return;
      }

      try {
        const res = await fetch(`/api/laptops/user/${userId}`);

        if (res.status === 200) {
          const data = await res.json();
          setLaptops(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.id) {
      fetchUserLaptops(session.user.id);
    }
  }, [session]);

  const handleDeleteLaptop = async (laptopId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this laptop"
    );

    if (!confirmed) {
      return;
    }

    try {
      const res = await fetch(`/api/laptops/${laptopId}`, { method: 'DELETE' });

      if (res.status === 200) {
        const updatedLaptops = laptops.filter(
          (laptop) => laptop._id !== laptopId
        );

        setLaptops(updatedLaptops);
        alert("Laptop Deleted");
      } else {
        alert("Failed to delete laptop");
      }
    } catch (error) {
      console.log(error);
      alert("Failed to delete laptop");
    }
  };

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Profile</h1>

          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mx-20 mt-10">
              <div className="mb-4">
                <Link href="/laptop">
                  <Image
                    className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                    src={profileImage || profileDefault}
                    alt="User"
                    width={200}
                    height={200}
                    priority={true}
                  />
                </Link>
              </div>

              <h2 className="text-2xl mb-4">
                <span className="font-bold block">Name: </span>
                {profileName}
              </h2>
              <h2 className="text-2xl">
                <span className="font-bold block">Email: </span>
                {profileEmail}
              </h2>
            </div>
            <div className="md:w-3/4 md:pl-4">
              <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
              {!loading && laptops.length === 0 && (
                <p>You have no Laptops listings</p>
              )}
              {loading ? (
                <Spinner loading={loading} />
              ) : (
                laptops.map((laptop) => (
                  <div className="mb-10">
                    <Link href={`/laptop/${laptop._id}`}>
                      <Image
                        className="h-32 w-full rounded-md object-cover"
                        src={laptop.images[0]}
                        alt="Property 2"
                        width={500}
                        height={100}
                        priority={true}
                      />
                    </Link>
                    <div className="mt-2">
                      <p className="text-lg font-semibold">{laptop.name}</p>
                      <p className="text-gray-600">{laptop.description}</p>
                    </div>
                    <div className="mt-2">
                      <Link
                        href={`/laptops/${laptop._id}/edit`}
                        className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteLaptop(laptop._id)}
                        className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                        type="button"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
