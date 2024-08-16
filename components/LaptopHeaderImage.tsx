import Image from "next/image";
import React from "react";

interface LaptopHeaderImageProps {
  image: string;
  title: string;
}

const LaptopHeaderImage: React.FC<LaptopHeaderImageProps> = ({
  image,
  title,
}) => {
  return (
    <section>
      <div className="container-xl m-auto mt-28">
        <div className="grid grid-cols-1">
          <Image
            src={image}
            alt=""
            className="object-cover justify-self-center h-[450px] w-[600px]"
            width={10}
            height={10}
            sizes="100vw"
            priority={true}
          />
        </div>
      </div>
    </section>
  );
};

export default LaptopHeaderImage;
