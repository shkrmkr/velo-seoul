import React from "react";
import { BiCurrentLocation } from "react-icons/bi";
import logo from "../assets/images/logo.png";

interface Props {}

const SearchBar = (props: Props) => {
  return (
    <div className="top-bar">
      <img className="top-bar__logo" src={logo} alt="velo seoul logo" />

      <button className="top-bar__btn">
        <span>내 주변 정류소</span>
        <BiCurrentLocation className="top-bar__locate-icon" />
      </button>
    </div>
  );
};

export default SearchBar;
