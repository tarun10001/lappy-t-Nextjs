import LaptopCard from "@/components/LaptopCard";
import LaptopSearchForm from "@/components/LaptopSearchForm";
import { fetchLaptops } from "@/utils/requests";

const LaptopsPage = async () => {
  const laptops = await fetchLaptops();

  laptops.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  // console.log(laptops);

  return (
    <>
      <section className="bg-blue-700 py-24 pb-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <LaptopSearchForm />
        </div>
      </section>
     
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
    </>
  );
};

export default LaptopsPage;
