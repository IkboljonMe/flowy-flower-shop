"use client";
import { useEffect, useState } from "react";
import Product from "./components/Product";
import MainLayout from "./layouts/MainLayout";
import useIsLoading from "@/app/hooks/useIsLoading";
import Typewriter from "typewriter-effect";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getProducts = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/products");
      const prods = await response.json();
      setProducts(prods);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <MainLayout>
      <div className="max-w-[1200px] mx-auto">
        <div className="py-4 flex justify-center text-2xl md:text-4xl font-bold mt-4 mb-6 px-4">
          Welcome to &nbsp;<span className="italic font-thin">Flowy</span>
        </div>
        <div className="flex justify-center pb-10 text-xl md:text-3xl">
          Where you can &nbsp; <span className="font-bold">buy</span> &nbsp;
          <span className="italic text-rose-500 font-light">
            <Typewriter
              options={{
                strings: [
                  "Eternal roses",
                  "Elegant bouquets",
                  "Flowerboxy",
                  "Premium Themes",
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </span>
        </div>
        {isLoading ? (
          <div>Loading products...</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-4">
            {products.map((product) => (
              <Product
                key={product.id}
                product={product}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
              />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
