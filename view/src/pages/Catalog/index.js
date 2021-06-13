import React, { useEffect, useState } from "react";
import Header from "../../components/Header/index";

import { BsGrid3X3GapFill } from "react-icons/bs";

import { Link } from "react-router-dom";

import styles from "./styles.module.scss";

function Catalog() {
  let categorie = window.location.pathname.replace("/catologo/", "");
  const categories = ["camisetas", "calcas", "calcados"];
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(
      `http://localhost:8888/api/V1/categories/${
        categories.indexOf(categorie) + 1
      }`
    )
      .then((res) => res.json())
      .then((res) => {
        setProducts(res.items)
      });

    // eslint-disable-next-line
  }, [categorie]);


  const formatterCategorie = (categorie, CustomElement) => {
    if (categorie === "calcas") {
      return <CustomElement>Calças</CustomElement>;
    }

    if (categorie === "calcados") {
      return <CustomElement>Sapatos</CustomElement>;
    }

    return <CustomElement>{categorie}</CustomElement>;
  };

  return (
    <>
      <Header></Header>
      <div className={styles.index}>
        <Link className={styles.link} to="/">
          Página Inicial
        </Link>
        <span>{">"}</span>
        {formatterCategorie(categorie, "p")}
      </div>
      <div className={styles.container}>
        <div className={styles.content}>
          <aside className={styles.filter}>
            <h1>FILTRE POR</h1>
            <h2>CATEGORIAS</h2>
            <ul>
              <li>
                <button>Roupas</button>
              </li>
              <li>
                <button>Sapatos</button>
              </li>
              <li>
                <button>Acessórios</button>
              </li>
            </ul>
            <h2>CORES</h2>
            <div className={styles.containerFilterColor}>
              <button
                style={{ backgroundColor: "#cb0d1f" }}
                className={styles.filterColor}
              ></button>
              <button
                style={{ backgroundColor: "orange" }}
                className={styles.filterColor}
              ></button>
              <button
                style={{ backgroundColor: "rgb(121, 194, 194)" }}
                className={styles.filterColor}
              ></button>
            </div>
            {categorie === "calcas" && (
              <div>
                <h2>GENERO</h2>
                <ul>
                  <li>
                    <button className={styles.filterType}>Masculino</button>
                  </li>
                  <li>
                    <button className={styles.filterType}>Feminino</button>
                  </li>
                </ul>
              </div>
            )}
            {categorie === "calcados" && (
              <div>
                <h2>TIPO</h2>
                <ul>
                  <li>
                    <button className={styles.filterType}>Corrida</button>
                  </li>
                  <li>
                    <button className={styles.filterType}>Caminhada</button>
                  </li>
                  <li>
                    <button className={styles.filterType}>Casual</button>
                  </li>
                  <li>
                    <button className={styles.filterType}>Social</button>
                  </li>
                </ul>
              </div>
            )}
          </aside>
          <div className={styles.catalog}>
            {formatterCategorie(categorie, "h1")}
            <div className={styles.catalogGrid}>
              <div className={styles.grid}>
                <BsGrid3X3GapFill color={'rgb(121, 194, 194)'} />
                <BsGrid3X3GapFill />
              </div>
                <div className={styles.sort}>
                  <p style={{ fontWeight: '700', fontSize: '13px' }}>ORDERNAR POR:</p>
                  <select>
                    <option value='lowest price'>Preço</option>
                  </select>
                </div>
              </div>
              <ul className={styles.products}>
                {products.map((product, index) => (
                  <li key={index}>
                    <img
                      src={`http://localhost:3000/${product.image}`}
                      alt={product.name}
                    ></img>
                    <p>{product.name.toUpperCase()}</p>
                    <h2>
                      {Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      }).format(Number.parseFloat(product.price))}
                    </h2>
                    <button>COMPRAR</button>
                  </li>
                ))}
              </ul>
          </div>
        </div>
        <footer>

        </footer>
      </div>
    </>
  );
}

export default Catalog;
