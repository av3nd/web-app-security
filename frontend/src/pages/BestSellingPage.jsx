import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import ProductCard from "../components/Route/ProductCard/ProductCard";
import styles from "../styles/styles";

const BestSellingPage = () => {
  const [data, setData] = useState([]);
  const {allFoods,isLoading} = useSelector((state) => state.foods);

  useEffect(() => {
    const allFoodsData = allFoods ? [...allFoods] : [];
    const sortedData = allFoodsData?.sort((a,b) => b.sold_out - a.sold_out); 
    setData(sortedData);
  }, [allFoods]);

  return (
   <>
   {
    isLoading ? (
      <Loader />
    ) : (
      <div>
      <Header activeHeading={2} />
      <br />
      <br />
      <div className={`${styles.section}`}>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
          {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
        </div>
      </div>
      <Footer />
    </div>
    )
   }
   </>
  );
};

export default BestSellingPage;
