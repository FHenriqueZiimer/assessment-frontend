import React, { useState, useLayoutEffect, useEffect } from "react";
import { Link } from "react-router-dom";

// import logo from "../../media/logo_webjump.png";

import { FaSearch } from "react-icons/fa";

import styles from "./styles.module.scss";

function HandleHeader() {
  const [width, setWidth] = useState(window.innerWidth);

  useLayoutEffect(() => {
    function updateSize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return width;
}

function Header() {
  const [categoriesList, setCategoriesList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8888/api/V1/categories/list")
      .then((res) => res.json())
      .then((res) => setCategoriesList(res.items));
  }, []);

  const width = HandleHeader();

  if (width <= "425") {
    return (
      <header>
        <div className={styles.accountContainer}>
          <Link className={styles.link}>Acesse sua conta</Link>
          <span>ou</span>
          <Link className={styles.link}>Cadastre-se</Link>
        </div>
        <div className={styles.child}>
          <div className={styles.menuToggle}>
            <input type="checkbox" />
            <span></span>
            <span></span>
            <span></span>
            <ul className={styles.menu}>
              <li>
                <Link className={styles.link} to="/">
                  PÁGINA INICIAL
                </Link>
              </li>
              {categoriesList.map((categorie) => (
                <>
                  <li>
                    <Link
                      className={styles.link}
                      to={`/catologo/${categorie.path}`}
                    >
                      {categorie.name.toUpperCase()}
                    </Link>
                  </li>
                </>
              ))}
              <li>
                <Link className={styles.link} to="/contato">
                  CONTATO
                </Link>
              </li>
            </ul>
          </div>
          <Link>
            <img src={`http://localhost:3000/media/logo_webjump.png`} alt="logo" />
          </Link>
          <FaSearch size={25} color={"#cb0d1f"}></FaSearch>
        </div>
      </header>
    );
  }

  return (
    <header>
      <div className={styles.accountContainer}>
        <Link className={styles.link}>Acesse sua conta</Link>
        <span>ou</span>
        <Link className={styles.link}>Cadastre-se</Link>
      </div>
      <div className={styles.searchContainer}>
        <Link to="/">
          <img src={`http://localhost:3000/media/logo_webjump.png`} alt="logo" />
        </Link>
        <div className={styles.searchContent}>
          <input type="text"></input>
          <button>BUSCAR</button>
        </div>
      </div>
      <nav className={styles.menuContainer}>
        <ul>
          <li>
            <Link className={styles.link} to="/">
              PÁGINA INICIAL
            </Link>
          </li>
          {categoriesList.map((categorie) => (
            <li>
              <Link className={styles.link} to={`/catologo/${categorie.path}`}>
                {categorie.name.toUpperCase()}
              </Link>
            </li>
          ))}
          <li>
            <Link className={styles.link} to="/contato">
              CONTATO
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
