import React from 'react';
import AllFoods from '../../components/Shop/AllFoods';
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader';
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar';

const ShopAllFoods = () => {
  return (
    <div>
        <DashboardHeader />
        <div className="flex justify-between w-full">
            <div className="w-[80px] 800px:w-[330px]">
              <DashboardSideBar active={3} />
            </div>
            <div className="w-full justify-center flex">
                <AllFoods />
            </div>
          </div>
    </div>
  )
}

export default ShopAllFoods