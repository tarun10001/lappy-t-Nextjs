import Laptop from "@/app/models/Laptop";
import connectDB from "@/config/database";

// GET /api/laptops/:id
export const GET = async (request, { params }) => {
  try {
    await connectDB();
    const laptop = await Laptop.findById(params.id);

    if (!laptop) {
      return new Response("Laptop not found", { status: 404 });
    }
    return new Response(JSON.stringify(laptop), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", {
      status: 500,
    });
  }
};
