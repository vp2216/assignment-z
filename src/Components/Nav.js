import { useContext, useEffect, useState } from "react";
import { dataContext } from "./App";
import Catogory from "./Catogory";
import "../Styles/Nav.css";
import { FaShoppingCart } from "react-icons/fa";

export default function Nav() {
  const [totalCart, setTotalCart] = useState(0);
  const { name, cart } = useContext(dataContext);

  useEffect(() => {
    let total = 0;
    cart.forEach(i => {
      total += i.count;
    });
    setTotalCart(total);
  }, [cart]);
  
  return (
    <div className="nav">
      <div className="nav-div">
        <span className="name">{name}</span>
        <div test={totalCart} className="cart cart-content">
          <span>Cart</span>
          <FaShoppingCart />
        </div>
      </div>
      <Catogory />
    </div>
  );
}
