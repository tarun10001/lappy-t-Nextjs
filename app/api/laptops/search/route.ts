import Laptop from "@/app/models/Laptop";
import connectDB from "@/config/database";

//GET /api/laptops/search
export const GET = async (request) => {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const laptopBrand = searchParams.get("laptopBrand");
    const laptopType = searchParams.get("laptopType");

    const laptopBrandPattern = new RegExp(laptopBrand, "i");

    let query = {
      $or: [
        { name: laptopBrandPattern },
        { description: laptopBrandPattern },
        { processor: laptopBrandPattern },
        { storage: laptopBrandPattern },
      ],
    };

    // Only check for laptop if its not 'All'
    if (laptopType && laptopType !== "All") {
      const typePattern = new RegExp(laptopType, "i");
      query.type = typePattern;
    }

    const laptops = await Laptop.find(query);

    // console.log(laptopBrand, laptopType);

    return new Response(JSON.stringify(laptops), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
