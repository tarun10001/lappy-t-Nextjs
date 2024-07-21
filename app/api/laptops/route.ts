import Laptop from "@/app/models/Laptop";
import connectDB from "@/config/database";


// GET /api/laptops
export const GET = async (request) => {
  try {
    await connectDB();
    const laptops = await Laptop.find({});
    return new Response(JSON.stringify(laptops), { status: 200 });
  } catch (error) {
    console.log(error)
    return new Response("Something went wrong", {
      status: 500,
    });
  }
};
