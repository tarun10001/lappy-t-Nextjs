import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaTimes,
  FaCheck,
  FaMapMarker,
} from "react-icons/fa";
import { GiProcessor } from "react-icons/gi";
import { MdOutlineScreenshotMonitor, MdSdStorage } from "react-icons/md";
//   import laptopMap from '@/components/laptopMap';

const LaptopDetails = ({ laptop }) => {
  console.log(laptop);
  return (
    <main>
      <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
        <div className="text-gray-500 mb-4">{laptop.type}</div>
        <h1 className="text-3xl font-bold mb-4">{laptop.name}</h1>
        <div>
          <p className="text-xs text-gray-500">Store location</p>
          <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
            <FaMapMarker className="text-orange-700 mr-2 text-lg" />
            <p className="text-orange-700">
              {laptop.store_location.street}, {laptop.store_location.city}{" "}
              {laptop.store_location.state}
            </p>
          </div>
        </div>

        <h3 className="text-lg font-bold my-6 bg-gray-800 text-white p-2">
          Prices
        </h3>
        <div className="flex flex-col md:flex-row justify-around">
          <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
            <div className="text-gray-500 mr-2 font-bold">Regular Price</div>
            <div className="text-2xl font-bold">
              {laptop.rates.regular_price ? (
                `$${laptop.rates.regular_price.toLocaleString()}`
              ) : (
                <FaTimes className="text-red-700" />
              )}
            </div>
          </div>
          <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
            <div className="text-gray-500 mr-2 font-bold">Discount Price</div>
            <div className="text-2xl font-bold text-blue-500">
              {laptop.rates.discount_price ? (
                `$${laptop.rates.discount_price.toLocaleString()}`
              ) : (
                <FaTimes className="text-red-700" />
              )}
            </div>
          </div>
          {/* <div className='flex items-center justify-center mb-4 pb-4 md:pb-0'>
            <div className='text-gray-500 mr-2 font-bold'>
              Monthly
            </div>
            <div className='text-2xl font-bold text-blue-500'>
              {laptop.rates.monthly ? (
                `$${laptop.rates.monthly.toLocaleString()}`
              ) : (
                <FaTimes className='text-red-700' />
              )}
            </div>
          </div> */}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-lg font-bold mb-6">Description & Details</h3>
        <div className="flex justify-center gap-4 text-blue-500 mb-4 text-xl space-x-9">
          <p>
            <MdOutlineScreenshotMonitor className="inlin-block mr-2" />
            <span className="hidden sm:inline">{laptop.screen_size}</span>
          </p>
          <p>
            <GiProcessor className="inline-block mr-2" />
            <span className="hidden sm:inline">{laptop.processor}</span>
          </p>
          <p>
            <MdSdStorage className="inline-block mr-2" />
            <span className="hidden sm:inline">{laptop.storage}</span>
          </p>
        </div>
        <p className="text-gray-500 mb-4 text-center">{laptop.description}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-lg font-bold mb-6">Features</h3>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none space-y-2">
          {laptop.features.map((feature, index) => (
            <li key={index}>
              <FaCheck className="inline-block mr-2 text-green-600" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <div id="map"></div>
      </div>
    </main>
  );
};
export default LaptopDetails;
