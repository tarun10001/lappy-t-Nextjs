import Laptop from "@/app/models/Laptop";
import connectDB from "@/config/database";
import { getSessionUser } from "@/utils/getSessionUser";
import cloudinary from "@/config/cloudinary";

// GET /api/laptops
export const GET = async (request) => {
  try {
    await connectDB();
    const page = request.nextUrl.searchParams.get("page") || 1;
    const pageSize = request.nextUrl.searchParams.get("pageSize") || 6;

    const skip = (page - 1) * pageSize;

    const totalLaptops = await Laptop.countDocuments({});
    const laptops = await Laptop.find({}).skip(skip).limit(pageSize);
    // console.log(laptops);

    const result = {
      totalLaptops,
      laptops,
    };

    // console.log(laptops.length);

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", {
      status: 500,
    });
  }
};

export const POST = async (request) => {
  try {
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response("User ID is required", { status: 401 });
    }

    const { userId } = sessionUser;
    const formData = await request.formData();
    // console.log(formData.get('name'));

    // Access all values from features and images
    const features = formData.getAll("features");
    const images = formData
      .getAll("images")
      .filter((image) => image.name !== "");
    // console.log(features, images)

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
      ram: formData.get("ram"),
      storage: formData.get("storage"),
      brand: formData.get("brand"),
      cpu_brand: formData.get("cpu_brand"),
      operating_system: formData.get("operating_system"),
      weight: formData.get("weight"),
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
      // images
    };

    //upload images to cloudinary
    const imageUploadPromises = [];
    for (const image of images) {
      const imageBuffer = await image.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);

      // Convert image data to base64
      const imageBase64 = imageData.toString("base64");

      //Make request to upload to CLoudinary
      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${imageBase64}`,
        {
          folder: "lappyt",
        }
      );

      imageUploadPromises.push(result.secure_url);

      // Wait for all images to upload
      const uploadedImages = await Promise.all(imageUploadPromises);

      // Add uploaded images to the laptopData object
      laptopData.images = uploadedImages;
    }

    // console.log(laptopData);

    const newLaptop = new Laptop(laptopData);
    await newLaptop.save();
    // console.log(newLaptop)
    // console.log('Redirect URL:', `${process.env.NEXTAUTH_URL}/laptops/${newLaptop._id}`);

    return Response.redirect(
      `${process.env.NEXTAUTH_URL}/laptops/${newLaptop._id}`
    );

    // return new Response(JSON.stringify({ message: "Success" }), {
    //   status: 200,
    // });
  } catch (error) {
    return new Response("Failed to add laptop", { status: 500 });
  }
};
