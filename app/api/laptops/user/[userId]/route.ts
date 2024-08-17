import Laptop from "@/app/models/Laptop";
import connectDB from "@/config/database";

// GET /api/laptops/user/:userid
export const GET = async (request, { params }) => {
  try {
    await connectDB();
    // console.log(laptops)
    const userId = params.userId;
    console.log(userId);

    if (!userId) {
      return new Response("User ID is required", { status: 400 });
    }

    const laptops = await Laptop.find({ owner: userId });
    return new Response(JSON.stringify(laptops), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", {
      status: 500,
    });
  }
};
