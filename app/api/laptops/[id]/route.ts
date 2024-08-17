import Laptop from "@/app/models/Laptop";
import connectDB from "@/config/database";
import { getSessionUser } from "@/utils/getSessionUser";

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

export const DELETE = async (request, { params }) => {
  try {
    const laptopId = params.id;

    const sessionUser = await getSessionUser();

    // Check for session
    if (!sessionUser || !sessionUser.userId) {
      return new Response("User ID is required", { status: 401 });
    }

    const { userId } = sessionUser;
    await connectDB();
    const laptop = await Laptop.findById(laptopId);

    if (!laptop) {
      return new Response("Laptop not found", { status: 404 });
    }

    // Verify ownership
    if (laptop.owner.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    await laptop.deleteOne();

    return new Response("Laptop Deleted", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", {
      status: 500,
    });
  }
};
