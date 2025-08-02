import React, { useContext, useMemo } from "react";
import { ShopContext } from "@/context/ShopContext";
import Title from "@/components/Title";
import ProductItem from "@/features/shared/ProductItem";
import LoadingSkeletons from "./LoadingSkeletons";
import useWindowSize from '@/lib/useWindowSize'

const LatestCollection = () => {
  const { products = [], isLoading } = useContext(ShopContext);
  const { width } = useWindowSize()

  // useMemo to calculate product count based on screen size and slice products
  const latestProducts = useMemo(() => {
    let itemCount;
    
    if (width >= 1024) {        // lg - large screens  
      itemCount = 10;
    } else if (width >= 768) {  // md - medium screens
      itemCount = 8;
    } else {                    // sm - small screens
      itemCount = 6;
    }
    
    return products.slice(0, itemCount);
  }, [products, width]);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1="LATEST" text2="COLLECTIONS" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Discover our newest arrivals – curated to keep your wardrobe fresh, modern, and effortlessly cool.
        </p>
      </div>

      {
        isLoading ? (
          <LoadingSkeletons />
        ) : (
          latestProducts.length === 0 ? (
          <p className="text-center py-8 text-lg">No products available.</p>
        ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
              {latestProducts.map((item) => (
                <ProductItem
                  key={item._id}
                  id={item._id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                />
              ))}
            </div>
          )
        )
      }
    </div>
  );
};

export default LatestCollection;