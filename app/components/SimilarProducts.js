"use client";

import { useEffect, useState } from "react";
import ProductComp from "./Product";
import { BiLoader } from "react-icons/bi";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function SimilarProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getRandomProducts = async () => {
    try {
      const response = await fetch("/api/products/get-random");
      const result = await response.json();

      if (result) {
        setProducts(result);
        setIsLoading(false);
        return;
      }

      setProducts([]);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRandomProducts();
  }, []);

  return (
    <div>
      <div className="border-b py-1 max-w-[1200px] mx-auto" />
      <div className="max-w-[1200px] mx-auto">
        <div className=" text-center justify-center font-bold text-2xl py-2 mt-4">
          Similar flowers
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center gap-4 font-semibold">
            <BiLoader size={30} className="text-blue-400 animate-spin" />
            Loading Products...
          </div>
        ) : (
          <div className="hidden sm:block">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {products.map((product) => (
                <ProductComp key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
        {/* Carousel for mobile devices */}
        {!isLoading && (
          <div className="sm:hidden mt-4">
            <Carousel showArrows={true} showThumbs={false} showStatus={false}>
              {products.map((product) => (
                <div
                  style={{ paddingBottom: "3rem", paddingTop: "4rem" }}
                  key={product.id}
                >
                  <ProductComp product={product} />
                </div>
              ))}
            </Carousel>
          </div>
        )}
      </div>
    </div>
  );
}
