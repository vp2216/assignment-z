import { createContext, useState, useEffect } from "react";
import "../Styles/App.css";
import Dish from "./Dish";
import Nav from "./Nav";

export const dataContext = createContext();

function App() {
  const [cart, setCart] = useState([]);
  const [menuData, setMenuData] = useState(null);
  const [getDishes, setDishes] = useState(null);
  const [active, setActive] = useState("");
  const [name, setName] = useState("");

  const value = {
    name,
    cart,
    setCart,
    menuData,
    getDishes,
    setDishes,
    active,
    setActive,
  };

  useEffect(() => {
    if (localStorage.getItem("cart")) setCart(JSON.parse(localStorage.cart));
  }, []);

  useEffect(() => {
    fetch("https://run.mocky.io/v3/a67edc87-49c7-4822-9cb4-e2ef94cb3099")
      .then((res) => res.json())
      .then((data) => {
        setName(data[0].restaurant_name);
        setMenuData(data[0].table_menu_list);
      });
  }, []);

  useEffect(() => {
    if (cart.length !== 0) localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <dataContext.Provider value={value}>
      <div className="app">
        <Nav />
        <Dish />
      </div>
    </dataContext.Provider>
  );
}

export default App;
