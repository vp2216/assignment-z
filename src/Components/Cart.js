import { useContext, useEffect, useState } from "react";
import { dataContext } from "./App";
import "../Styles/Cart.css";

export default function Cart() {
  const [total, setTotal] = useState(0);
  const [currency, setCurrency] = useState("");
  const { cart, setShowCart, menuData } = useContext(dataContext);

  useEffect(() => {
    let total = 0;
    menuData.map((data, i) => {
      return data.category_dishes.map((dish, j) => {
        const findDish = cart.find((k) => {
          return k.id === dish.dish_id;
        });
        if (findDish && findDish?.count != 0) {
          setCurrency(dish.dish_currency);
          total += parseInt(findDish.count) * parseFloat(dish.dish_price);
        }
      });
    });
    setTotal(total);
  }, []);

  return (
    <div className="show-cart">
      <span className="show-cart-close" onClick={() => setShowCart(false)}>
        X
      </span>
      <div className="cart-item-display">
        {menuData.map((data, i) => {
          return data.category_dishes.map((dish, j) => {
            const findDish = cart.find((k) => {
              return k.id === dish.dish_id;
            });
            if (findDish && findDish?.count != 0) {
              return (
                <div className="cart-item">
                  <span className="cart-dish-details cart-dish-name">
                    {dish.dish_name}
                  </span>
                  <span className="cart-dish-details">{findDish.count}</span>
                  <span className="cart-dish-details">
                    {dish.dish_price + " " + dish.dish_currency}
                  </span>
                </div>
              );
            }
          });
        })}
        <span className="total">
          Total : {total} {currency}
        </span>
      </div>
    </div>
  );
}
