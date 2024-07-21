import React from "react";
import InfoBox from "./InfoBox";

const InfoBoxes = () => {
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <InfoBox
            heading="For Professionals"
            backgroundColor="bg-gray-100"
            buttonInfo={{
              text: "Browse Laptops",
              link: "/laptops",
              backgroundColor: "bg-black",
            }}
          >
            Find your laptop. Bookmark laptop and contact stores.
          </InfoBox>
          <InfoBox
            heading="For Store Owners"
            backgroundColor="bg-blue-100"
            buttonInfo={{
              text: "Add Laptop",
              link: "/laptops/add",
              backgroundColor: "bg-blue-500",
            }}
          >
            List your properties and reach potential tenants. Rent short or long
            term.
          </InfoBox>
        </div>
      </div>
    </section>
  );
};

export default InfoBoxes;
