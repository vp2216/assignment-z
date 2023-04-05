import { useContext, useEffect, useState } from "react";
import { dataContext } from "./App";
import Catogory from "./Catogory";
import "../Styles/Nav.css";
import { FaShoppingCart } from "react-icons/fa";

export default function Nav() {
  const [totalCart, setTotalCart] = useState(0);
  const { name, cart, setShowCart } = useContext(dataContext);

  useEffect(() => {
    let total = 0;
    cart.forEach((i) => {
      total += i.count;
    });
    setTotalCart(total);
  }, [cart]);

  return (
    <div className="nav">
      <div className="nav-div">
        <span className="name">{name}</span>
        <div
          count={totalCart}
          className="cart cart-content"
          onClick={() => setShowCart(true)}
        >
          <span style={{ cursor: "pointer" }}>Cart</span>
          <FaShoppingCart style={{ cursor: "pointer" }} />
        </div>
      </div>
      <Catogory />
    </div>
  );
}
