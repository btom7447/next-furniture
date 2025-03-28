import React, { useEffect, useState } from "react";
import Image from "next/image";

interface Product {
  name: string;
  image: string;
  description: string;
  price: number;
  gallery: string[];
  reviews: number;
  reviewers: number;
}

interface ProductGalleryProps {
  products: Product;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ products }) => {
  const [gallery, setGallery] = useState(products.gallery);

  useEffect(() => {
    // Append timestamp to each image URL to refresh them
    setGallery(products.gallery.map(url => `${url}?timestamp=${Date.now()}`));
  }, [products.gallery]);

  return (
    <div className="flex-1 flex flex-col-reverse gap-5 items-start justify-start md:flex md:flex-row">
      <div className="flex flex-wrap gap-5 content-stretch md:flex-col">
        {gallery.slice(1).map((url, index) => (
          <div key={index} className="bg-[#FFF9E5]">
            <Image
              src={url}
              alt={`${products.name} ${index + 1}`}
              width={150}
              height={150}
              className="w-full h-auto md:w-60 md:h-60 object-contain"
              unoptimized
            />
          </div>
        ))}
      </div>
      <div className="bg-[#FFF9E5]">
        <Image
          src={gallery[0]}
          alt={products.name}
          width={400}
          height={400}
          className="object-contain"
          unoptimized
        />
      </div>
    </div>
  );
};

export default ProductGallery;