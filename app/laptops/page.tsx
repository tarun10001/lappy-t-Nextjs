import Laptops from "@/components/Laptops";
import LaptopSearchForm from "@/components/LaptopSearchForm";

const LaptopsPage = async () => {
  return (
    <>
      <section className="bg-blue-700 py-24 pb-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <LaptopSearchForm />
        </div>
      </section>
      <Laptops />
    </>
  );
};

export default LaptopsPage;
