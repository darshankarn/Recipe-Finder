import React from "react";
import { CiPizza } from "react-icons/ci";
import { GiNoodles } from "react-icons/gi";
import { GiFruitBowl, GiCheckMark } from "react-icons/gi";
import { MdOutlineIcecream } from "react-icons/md";
import { useState, useEffect } from "react";
import { fetchData, fetchTabData } from "../service";

const Tabs = (props) => {
  const [active, setActive] = useState("Pizza");
  const [tabData, setTabData] = useState("");

  useEffect(() => {
    fetchTabData(TabLabel[0].id).then((response) => {
      setTabData(response);
      props.setLoader(false);
    });
  }, []);

  const [TabLabel, setTabLabel] = useState([
    {
      name: "Pizza",
      icons: <CiPizza />,
      id: "0209cb28fc05320434e2916988f47b71",
    },
    {
      name: "Noodles",
      icons: <GiNoodles />,
      id: "f7a9e54a5d4577e26acd72c0c9bc94ed",
    },
    {
      name: "Desert",
      icons: <GiFruitBowl />,
      id: "acf7299fa308bd152c97eb098960a183",
    },
    {
      name: "Ice Cream",
      icons: <MdOutlineIcecream />,
      id: "74525a37d75de54869d0703c26c401de",
    },
  ]);

  const handelClick = (name, id) => {
    setActive(name);
    fetchData(name).then((response) => {
      setTabData(response.hits[idx]);
      props.setLoader(false);
    });
  };
  const idx = Math.floor((Math.random() * 20) + 1);
  return (
    <div className="container">
      <h1 className="recipeHeading">What would you like to have!</h1>
      <div className="tabs">
        {TabLabel.map((item, index) => (
          <div
            onClick={() => (handelClick(item.name, item.id),props.setLoader(true))}
            key={index}
            className={`tablist ${active === item.name ? "active" : ""}`}
          >
            {item.icons}
            <span>{item.name}</span>
          </div>
        ))}
      </div>
      <div className="recipe_banner">
        {tabData !== "" && (
          <>
            <div className="left-col">
              <span className="badge">
                {tabData.recipe.cuisineType[0].toUpperCase()}
                {console.log(tabData.recipe)}
              </span>
              <h1>{tabData.recipe.label}</h1>
              <p>
                <strong>Recipe by:</strong>
                <small>{tabData.recipe.source}</small>
              </p>
              <h3>Ingredients</h3>
              <div className="ingredients">
                <ul>
                  {tabData.recipe.ingredientLines.map((item, index) => (
                    <li key={index}>
                      <GiCheckMark size="18px" color="#6fcb9f" />
                      &nbsp;<span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="right-col">
              <div className="image-wrapper">
                <img
                  src={tabData.recipe.image}
                  alt={tabData.recipe.label}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Tabs;
