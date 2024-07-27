const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

// Fetch all Laptops
async function fetchLaptops() {
  try {
    // handle the case where the domain is not available yet
    if (!apiDomain) {
        return [];
    }
    const res = await fetch(`${apiDomain}/laptops`);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};

// Fetch single Laptop
async function fetchLaptop(id) {
  try {
    // handle the case where the domain is not available yet
    if (!apiDomain) {
        return null;
    }
    const res = await fetch(`${apiDomain}/laptops/${id}`);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};

export {fetchLaptops,fetchLaptop};
