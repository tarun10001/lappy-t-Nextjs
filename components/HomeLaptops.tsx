// import React from "react";
// import Link from "next/link";
// import LaptopCard from "./LaptopCard";
// import { fetchLaptops } from "@/utils/requests";

// const HomeLaptops = async () => {
//   const laptops = await fetchLaptops();
//   // console.log('Fetched Laptops:', laptops);
//   const recentLaptops = laptops
//     .sort(() => Math.random() - Math.random())
//     .slice(0, 3);
//   return (
//     <>
//       <section className="px-4 py-6">
//         <div className="container-xl lg:container m-auto">
//           <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
//             Recent Laptops
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {recentLaptops.length === 0 ? (
//               <p>No Laptops Found</p>
//             ) : (
//               recentLaptops.map((laptop) => (
//                 <LaptopCard key={laptop._id} laptop={laptop} />
//               ))
//             )}
//           </div>
//         </div>
//       </section>

//       <section className="m-auto max-w-lg my-10 px-6">
//         <Link
//           href="/laptops"
//           className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
//         >
//           View All Laptops
//         </Link>
//       </section>
//     </>
//   );
// };

// export default HomeLaptops;

import React from 'react';
import Link from 'next/link';
import LaptopCard from './LaptopCard';
import { fetchLaptops } from '@/utils/requests';

const HomeLaptops = async () => {
  const laptops = await fetchLaptops();
  const recentLaptops = laptops
    .sort(() => Math.random() - Math.random())
    .slice(0, 3);

  return (
    <>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Recent Laptops
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentLaptops.length === 0 ? (
              <p>No Laptops Found</p>
            ) : (
              recentLaptops.map((laptop) => (
                <LaptopCard key={laptop._id} laptop={laptop} />
              ))
            )}
          </div>
        </div>
      </section>

      <section className="m-auto max-w-lg my-10 px-6">
        <Link
          href="/laptops"
          className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >
          View All Laptops
        </Link>
      </section>
    </>
  );
};

export default HomeLaptops;

