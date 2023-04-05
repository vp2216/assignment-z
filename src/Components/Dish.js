import { useContext, useEffect, useState } from "react";
import { dataContext } from "./App";
import "../Styles/Dish.css";
import load from "../Assets/load.gif";

export default function Dish() {
  const [showData, setShowData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { menuData, active, cart, setCart } = useContext(dataContext);

  useEffect(() => {
    if (active) {
      setLoading(true);
      const findData = menuData?.find((data) => {
        return data.menu_category === active;
      });
      setShowData(findData.category_dishes);
      setTimeout(() => {
        setLoading(false);
      }, 500);
      window.scrollTo(0, 0);
    }
  }, [active]);

  return (
    <>
      {loading ? (
        <div className="loading">
          <img className="load-image" src={load} alt="load" />
          <span>Loading</span>
        </div>
      ) : (
        <div className="dish">
          {showData?.map((data, i) => {
            return (
              <div className="dish-items" key={i}>
                <div className="dish-detais">
                  <span className="dish-name">{data.dish_name}</span>
                  <div className="dish-price">
                    <span style={{ fontWeight: "600" }}>
                      {data.dish_price + " " + data.dish_currency}
                    </span>
                    <span style={{ fontWeight: "600" }}>
                      {data.dish_calories} calories
                    </span>
                  </div>
                  <p>{data.dish_description}</p>
                  {data.dish_Availability ? (
                    <div className="dish-order">
                      <button
                        className="dish-btn"
                        disabled={
                          cart.find((i) => {
                            return i.id === data.dish_id;
                          })?.count === 0 ||
                          !cart.find((i) => {
                            return i.id === data.dish_id;
                          })
                            ? true
                            : false
                        }
                        onClick={() => {
                          const dish = cart.find((i) => {
                            return i.id === data.dish_id;
                          });
                          dish.count -= 1;
                          setCart(
                            cart.map((i) => {
                              if (i.id === data.dish_id) {
                                return dish;
                              } else return i;
                            })
                          );
                        }}
                      >
                        -
                      </button>
                      <span style={{ fontWeight: "600",width:"40%",textAlign:"center" }}>
                        {cart.find((i) => {
                          return i.id === data.dish_id;
                        })?.count || 0}
                      </span>
                      <button
                        className="dish-btn"
                        onClick={() => {
                          const dish = cart.find((i) => {
                            return i.id === data.dish_id;
                          });
                          if (dish) {
                            dish.count += 1;
                            setCart(
                              cart.map((i) => {
                                if (i.id === data.dish_id) {
                                  return dish;
                                } else return i;
                              })
                            );
                          } else {
                            const newDish = {
                              id: data.dish_id,
                              count: 1,
                            };
                            setCart([...cart, newDish]);
                          }
                        }}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <span style={{ color: "red", fontWeight: "600" }}>
                      Not Available
                    </span>
                  )}
                  {data.dish_Availability && data.addonCat.length !== 0 ? (
                    <span style={{ color: "red", fontWeight: "600" }}>
                      Customizations Available
                    </span>
                  ) : null}
                </div>
                <img
                  src={data.dish_image}
                  alt={data.dish_name}
                  className="dish-image"
                />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
