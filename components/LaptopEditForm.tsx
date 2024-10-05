"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchLaptop } from "@/utils/requests";
import { toast } from "react-toastify";

const LaptopEditForm = () => {
  const { id } = useParams();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [fields, setFields] = useState({
    _id: "1",
    owner: "1",
    name: "",
    type: "",
    description: "",
    store_location: {
      street: "",
      city: "",
      state: "",
      zipcode: "",
    },
    screen_size: "",
    processor: "",
    storage: "",
    brand: "",
    cpu_brand: "",
    operating_system: "",
    ram: "",
    graphics_card_memory: "",
    camera_resolution: "",
    warranty: "",
    features: [],
    rates: {
      regular_price: "",
      discount_price: "",
    },
    seller_info: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);

    // Fetch laptop data for form
    const fetchLaptopData = async () => {
      try {
        const laptopData = await fetchLaptop(id);
        setFields(laptopData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLaptopData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [outerKey, innerKey] = name.split(".");
      // console.log[outerKey, innerKey];

      setFields((prevFields) => ({
        ...prevFields,
        [outerKey]: {
          ...prevFields[outerKey],
          [innerKey]: value,
        },
      }));
    } else {
      setFields((prevFields) => ({
        ...prevFields,
        [name]: value,
      }));
    }
  };

  const handleFeaturesChange = (e) => {
    const { value, checked } = e.target;
    const updatedFeatures = [...fields.features];

    if (checked) {
      updatedFeatures.push(value);
    } else {
      const index = updatedFeatures.indexOf(value);

      if (index !== -1) {
        updatedFeatures.splice(index, 1);
      }
    }

    setFields((prevFields) => ({
      ...prevFields,
      features: updatedFeatures,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const res = await fetch(`/api/laptops/${id}`, {
        method: "PUT",
        body: formData,
      });
      if (res.status === 200) {
        router.push(`/laptops/${id}`);
      } else if (res.status === 401 || res.status === 403) {
        toast.error("Permission denied");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    mounted &&
    !loading && (
      <form onSubmit={handleSubmit}>
        <h2 className="text-3xl text-center font-semibold mb-6">Edit Laptop</h2>
        <div className="mb-4">
          <label
            htmlFor="laptop_type"
            className="block text-gray-700 font-bold mb-2"
          >
            Laptop Type
          </label>
          <select
            id="type"
            name="type"
            className="border rounded w-full py-2 px-3"
            required
            value={fields.type}
            onChange={handleChange}
          >
            <option value="Gaming-Laptop">Gaming-Laptop</option>
            <option value="Business-Laptop">Business-Laptop</option>
            <option value="Notebook-Laptop">Notebook-Laptop</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Laptop Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="border rounded w-full py-2 px-3 mb-2"
            placeholder="eg. Beautiful Apartment In Miami"
            required
            value={fields.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-bold mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="border rounded w-full py-2 px-3"
            rows="4"
            placeholder="Add an optional description of your laptop"
            value={fields.description}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="mb-4">
          <label
            htmlFor="screen_size"
            className="block text-gray-700 font-bold mb-2"
          >
            Screen Size
          </label>
          <select
            id="screen_size"
            name="screen_size"
            className="border rounded w-full py-2 px-3"
            required
            value={fields.screen_size}
            onChange={handleChange}
          >
            <option value="13.3 Inch">13.3 Inch</option>
            <option value="14 Inch">14 Inch</option>
            <option value="15.6 Inch">15.6 Inch</option>
            <option value="16 Inch">16 Inch</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="processor"
            className="block text-gray-700 font-bold mb-2"
          >
            Processor
          </label>
          <select
            id="processor"
            name="processor"
            className="border rounded w-full py-2 px-3"
            required
            value={fields.processor}
            onChange={handleChange}
          >
            <option value="Intel i9">Intel i9</option>
            <option value="Intel i7">Intel i7</option>
            <option value="Intel i5">Intel i5</option>
            <option value="Intel i3">Intel i3</option>
            <option value="AMD Ryzen 5">AMD Ryzen 5</option>
            <option value="AMD Ryzen 7">AMD Ryzen 7</option>
            <option value="AMD Ryzen 9">AMD Ryzen 9</option>
          </select>
        </div>

        {/* <div className="mb-4">
          <label htmlFor="ram" className="block text-gray-700 font-bold mb-2">
            RAM
          </label>
          <select
            id="ram"
            name="ram"
            className="border rounded w-full py-2 px-3"
            required
            value={fields.ram}
            onChange={handleChange}
          >
            <option value="4 GB">4 GB</option>
            <option value="8 GB">8 GB</option>
            <option value="16 GB">16 GB</option>
            <option value="32 GB">32 GB</option>
          </select>
        </div> */}

        <div className="mb-4">
          <label
            htmlFor="storage"
            className="block text-gray-700 font-bold mb-2"
          >
            Storage
          </label>
          <select
            id="storage"
            name="storage"
            className="border rounded w-full py-2 px-3"
            required
            value={fields.storage}
            onChange={handleChange}
          >
            <option value="256 GB SSD">256 GB SSD</option>
            <option value="500 GB SSD">500 GB SSD</option>
            <option value="1 TB SSD">1 TB SSD</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="brand" className="block text-gray-700 font-bold mb-2">
            Brand
          </label>
          <select
            id="brand"
            name="brand"
            className="border rounded w-full py-2 px-3"
            required
            value={fields.brand}
            onChange={handleChange}
          >
            <option value="DELL">DELL</option>
            <option value="HP">HP</option>
            <option value="ASUS">ASUS</option>
            <option value="SAMSUNG">SAMSUNG</option>
            <option value="LENOVO">LENOVO</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="cpu_brand"
            className="block text-gray-700 font-bold mb-2"
          >
            CPU Brand
          </label>
          <select
            id="cpu_brand"
            name="cpu_brand"
            className="border rounded w-full py-2 px-3"
            required
            value={fields.cpu_brand}
            onChange={handleChange}
          >
            <option value="INTEL">INTEL</option>
            <option value="AMD">AMD</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="operating_system"
            className="block text-gray-700 font-bold mb-2"
          >
            Operating System
          </label>
          <select
            id="operating_system"
            name="operating_system"
            className="border rounded w-full py-2 px-3"
            required
            value={fields.operating_system}
            onChange={handleChange}
          >
            <option value="Windows 11 HOME">Windows 11 HOME</option>
            <option value="Windows 11 PRO">Windows 11 PRO</option>
            <option value="Windows 11 Enterprise">Windows 11 Enterprise</option>
            <option value="Windows 11 Education">Windows 11 Education</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="ram"
            className="block text-gray-700 font-bold mb-2"
          >
            RAM
          </label>
          <select
            id="ram"
            name="ram"
            className="border rounded w-full py-2 px-3"
            required
            value={fields.ram}
            onChange={handleChange}
          >
            <option value="4 GB">4 GB</option>
            <option value="8 GB">8 GB</option>
            <option value="16 GB">16 GB</option>
            <option value="32 GB">32 GB</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="graphics_card_memory"
            className="block text-gray-700 font-bold mb-2"
          >
            Graphics Card Memory
          </label>
          <select
            id="graphics_card_memory"
            name="graphics_card_memory"
            className="border rounded w-full py-2 px-3"
            required
            value={fields.graphics_card_memory}
            onChange={handleChange}
          >
            <option value="2 GB Graphics Card">2 GB Graphics Card</option>
            <option value="4 GB Graphics Card">4 GB Graphics Card</option>
            <option value="6 GB Graphics Card">6 GB Graphics Card</option>
            <option value="8 GB Graphics Card">8 GB Graphics Card</option>
            <option value="12 GB Graphics Card">12 GB Graphics Card</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="warranty"
            className="block text-gray-700 font-bold mb-2"
          >
            Warranty
          </label>
          <select
            id="warranty"
            name="warranty"
            className="border rounded w-full py-2 px-3"
            required
            value={fields.warranty}
            onChange={handleChange}
          >
            <option value="1 yr Warranty">1 yr Warranty</option>
            <option value="2 yrs Warranty">2 yrs Warranty</option>
            <option value="3 yrs Warranty">3 yrs Warranty</option>
            <option value="5 yrs Warranty">5 yrs Warranty</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Features</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            <div>
              <input
                type="checkbox"
                id="feature_fingerprint_reader"
                name="features"
                value="Fingerprint Reader"
                className="mr-2"
                checked={fields.features.includes("Fingerprint Reader")}
                onChange={handleFeaturesChange}
              />
              <label htmlFor="feature_fingerprint_reader">
                Fingerprint Reader
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                id="feature_backlit_keyboard"
                name="features"
                value="Backlit Keyboard"
                className="mr-2"
                checked={fields.features.includes("Backlit Keyboard")}
                onChange={handleFeaturesChange}
              />
              <label htmlFor="feature_backlit_keyboard">Backlit Keyboard</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="feature_touch-screen"
                name="features"
                value="Touch-Screen"
                className="mr-2"
                checked={fields.features.includes("Touch-Screen")}
                onChange={handleFeaturesChange}
              />
              <label htmlFor="feature_touch-screen">Touch-Screen</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="feature_dolby-atmos"
                name="features"
                value="Dolby-Atmos"
                className="mr-2"
                checked={fields.features.includes("Dolby-Atmos")}
                onChange={handleFeaturesChange}
              />
              <label htmlFor="feature_dolby-atmos">Dolby-Atmos</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="feature_type-c_port"
                name="features"
                value="Type-C Port"
                className="mr-2"
                checked={fields.features.includes("Type-C Port")}
                onChange={handleFeaturesChange}
              />
              <label htmlFor="feature_type-c_port">Type-C Port</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="feature_anti_glare_screen"
                name="features"
                value="Anti Glare Screen"
                className="mr-2"
                checked={fields.features.includes("Anti Glare Screen")}
                onChange={handleFeaturesChange}
              />
              <label htmlFor="feature_anti_glare_screen">
                Anti Glare Screen
              </label>
            </div>
          </div>
        </div>

        <div className="mb-4 bg-blue-50 p-4">
          <label className="block text-gray-700 font-bold mb-2 text-center">
            Prices
          </label>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <div className="flex items-center">
              <label htmlFor="regular_price" className="mr-2">
                Regular Price
              </label>
              <input
                type="number"
                id="regular_price"
                name="rates.regular_price"
                className="border rounded w-full py-2 px-3"
                value={fields.rates.regular_price}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center">
              <label htmlFor="nightly_rate" className="mr-2">
                Discount Price
              </label>
              <input
                type="number"
                id="discount_price"
                name="rates.discount_price"
                className="border rounded w-full py-2 px-3"
                value={fields.rates.discount_price}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="mb-4 bg-blue-50 p-4">
          <label className="block text-gray-700 font-bold mb-2">
            Store Location
          </label>
          <input
            type="text"
            id="street"
            name="store_location.street"
            className="border rounded w-full py-2 px-3 mb-2"
            placeholder="Street"
            value={fields.store_location.street}
            onChange={handleChange}
          />
          <input
            type="text"
            id="city"
            name="store_location.city"
            className="border rounded w-full py-2 px-3 mb-2"
            placeholder="City"
            required
            value={fields.store_location.city}
            onChange={handleChange}
          />
          <input
            type="text"
            id="state"
            name="store_location.state"
            className="border rounded w-full py-2 px-3 mb-2"
            placeholder="State"
            required
            value={fields.store_location.state}
            onChange={handleChange}
          />
          <input
            type="text"
            id="zipcode"
            name="store_location.zipcode"
            className="border rounded w-full py-2 px-3 mb-2"
            placeholder="Zipcode"
            value={fields.store_location.zipcode}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="seller_name"
            className="block text-gray-700 font-bold mb-2"
          >
            Seller Name
          </label>
          <input
            type="text"
            id="seller_name"
            name="seller_info.name"
            className="border rounded w-full py-2 px-3"
            placeholder="Name"
            value={fields.seller_info.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="seller_email"
            className="block text-gray-700 font-bold mb-2"
          >
            Seller Email
          </label>
          <input
            type="email"
            id="seller_email"
            name="seller_info.email"
            className="border rounded w-full py-2 px-3"
            placeholder="Email address"
            required
            value={fields.seller_info.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="seller_phone"
            className="block text-gray-700 font-bold mb-2"
          >
            Seller Phone
          </label>
          <input
            type="tel"
            id="seller_phone"
            name="seller_info.phone"
            className="border rounded w-full py-2 px-3"
            placeholder="Phone"
            value={fields.seller_info.phone}
            onChange={handleChange}
          />
        </div>

        <div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
            type="submit"
          >
            <i className="fas fa-plus-circle mr-2"></i> Update laptop
          </button>
        </div>
      </form>
    )
  );
};

export default LaptopEditForm;
