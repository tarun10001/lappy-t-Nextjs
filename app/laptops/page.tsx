import LaptopCard from "@/components/LaptopCard";
import { fetchLaptops } from "@/utils/requests";

const page = async () => {
  const laptops = await fetchLaptops();

  laptops.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  console.log(laptops)
  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {laptops.length === 0 ? (
          <p>No Laptops found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-16">
            {laptops.map((laptop) => (
              <LaptopCard key={laptop._id} laptop={laptop} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default page;
