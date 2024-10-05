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

export const PUT = async (request, { params }) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("User ID is required", { status: 401 });
    }

    const { id } = params;
    const { userId } = sessionUser;
    const formData = await request.formData();
    // console.log(formData.get('name'));

    // Access all values from features
    const features = formData.getAll("features");

    // Get laptop to update
    const existingLaptop = await Laptop.findById(id);

    if (!existingLaptop) {
      return new Response("Laptop does not exist", { status: 404 });
    }

    //Verify ownership
    if (existingLaptop.owner.toString() !== userId) {
      return new Response("Unauthorised", { status: 401 });
    }
    // Create laptopData object for database
    const laptopData = {
      type: formData.get("type"),
      name: formData.get("name"),
      description: formData.get("description"),
      store_location: {
        street: formData.get("store_location.street"),
        city: formData.get("store_location.city"),
        state: formData.get("store_location.state"),
        zipcode: formData.get("store_location.zipcode"),
      },
      screen_size: formData.get("screen_size"),
      processor: formData.get("processor"),
      storage: formData.get("storage"),
      brand: formData.get("brand"),
      cpu_brand: formData.get("cpu_brand"),
      operating_system: formData.get("operating_system"),
      ram: formData.get("ram"),
      graphics_card_memory: formData.get("graphics_card_memory"),
      warranty: formData.get("warranty"),
      features,
      rates: {
        regular_price: formData.get("rates.regular_price"),
        discount_price: formData.get("rates.discount_price"),
      },
      seller_info: {
        name: formData.get("seller_info.name"),
        email: formData.get("seller_info.email"),
        phone: formData.get("seller_info.phone"),
      },
      owner: userId,
    };
    // console.log(laptopData);

    // Update property to database
    const updatedLaptop = await Laptop.findByIdAndUpdate(id, laptopData);

    // console.log(newLaptop)
    return new Response(JSON.stringify(updatedLaptop), {
      status: 200,
    });
  } catch (error) {
    return new Response("Failed to add laptop", { status: 500 });
  }
};
