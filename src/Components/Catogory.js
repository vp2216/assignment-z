import { useContext, useEffect } from "react";
import { dataContext } from "./App";
import "../Styles/Catogory.css";

export default function Catogory() {
  const { menuData, active, setActive } = useContext(dataContext);
  useEffect(() => {
    if (menuData) setActive(menuData[0].menu_category);
  }, [menuData]);
  return (
    <div className="catogory">
      <div className="catogory-items-div">
        {menuData?.map((data, i) => {
          return (
            <span
              className={
                active === data.menu_category
                  ? "catogory-items active"
                  : "catogory-items"
              }
              key={i}
              onClick={() => setActive(data.menu_category)}
            >
              {data.menu_category}
            </span>
          );
        })}
      </div>
    </div>
  );
}
