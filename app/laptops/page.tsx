import LaptopCard from "@/components/LaptopCard";

async function fetchLaptops() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/laptops`);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

const page = async () => {
  const laptops = await fetchLaptops();
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
