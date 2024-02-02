import React, { useState } from "react";
import { useSelector } from "react-redux";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import ProfileContent from "../components/Profile/ProfileContent";
import ProfileSideBar from "../components/Profile/ProfileSidebar";
import styles from "../styles/styles";

const ProfilePage = () => {
  const { loading } = useSelector((state) => state.user);
  const [active, setActive] = useState(1);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Header />
          <div className={`${styles.section} flex bg-[#f5f5f5] py-10`}>
          <ProfileContent active={active} />

            <div className="w-[50px] 800px:w-[335px] sticky 800px:mt-0 mt-[18%]">
              <ProfileSideBar active={active} setActive={setActive} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
