import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const menuItems = [
  { id: 1, name: "electronics" },
  { id: 2, name: "jewelery" },
  { id: 3, name: "men's clothing" },
  { id: 4, name: "women's clothing" },
];

const Sidebar = ({ onFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCheckboxChange = (category) => {
    setSelectedCategories((prevSelected) => {
      const updatedCategories = prevSelected.includes(category)
        ? prevSelected.filter((c) => c !== category)
        : [...prevSelected, category];
      onFilter(updatedCategories);
      return updatedCategories;
    });
  };

  return (
    <div className="relative flex flex-col md:w-auto">
      {/* Mobile Toggle Button */}
      <div className="flex items-center justify-between w-full md:hidden p-2 bg-white shadow-md">
        <button
          className="text-gray-900 bg-white rounded focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <MenuIcon fontSize="large" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 md:w-60 lg:w-72 p-4 
          ${isOpen ? "bg-gray-900 text-white" : "bg-white"} 
          transition-transform transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } 
          md:relative md:translate-x-0 md:min-w-[14rem] md:max-w-[18rem] 
          overflow-hidden`}
      >
        {/* Close Button */}
        <button
          className="md:hidden absolute top-4 right-4 text-white"
          onClick={() => setIsOpen(false)}
        >
          <CloseIcon fontSize="large" />
        </button>

        {/* Menu Dropdown */}
        <div
          className={`flex items-center justify-between rounded p-4 
            ${isOpen && "mt-14"} cursor-pointer 
            hover:bg-orange-500 hover:text-white transition duration-300`}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <h3 className="text-xl font-bold">Menu</h3>
          <span
            className={`transform transition-transform duration-300 ${
              isDropdownOpen ? "rotate-180" : "rotate-0"
            }`}
          >
            ▼
          </span>
        </div>

        {/* Menu Items */}
        <ul>
          {isDropdownOpen &&
            menuItems.map((item) => (
              <li
                key={item.id}
                className="flex items-center p-3 rounded cursor-pointer 
                  hover:bg-orange-500 hover:text-white transition duration-300 
                  overflow-hidden break-words"
              >
                <Checkbox
                  checked={selectedCategories.includes(item.name)}
                  onChange={() => handleCheckboxChange(item.name)}
                />
                <p className="font-bold whitespace-normal">{item.name}</p>
              </li>
            ))}
          <li
            className="flex items-center p-5 rounded cursor-pointer 
                  hover:bg-orange-500 hover:text-white transition duration-300 
                  overflow-hidden break-words"
          >
            <ShoppingCartIcon />
            <Link className="px-3 font-bold" to="/cart">
              Your Cart
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
