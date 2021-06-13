import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Header from "../../components/Header";
import styles from "./styles.module.scss";

function Home() {
  const [categoriesList, setCategoriesList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8888/api/V1/categories/list")
      .then((res) => res.json())
      .then((res) => setCategoriesList(res.items));
  }, []);

  return (
    <>
      <Header></Header>
      <div className={styles.container}>
        <div className={styles.content}>
          <ul>
            <li>
              <Link className={styles.link} to="/">
                PÁGINA INICIAL
              </Link>
            </li>
            {categoriesList.map((categorie, index) => (
              <li key={index}>
                <Link
                  className={styles.link}
                  to={`/catologo/${categorie.path}`}
                >
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
          <aside>
            <div className={styles.greyBox}></div>
            <h1>Seja bem-vindo!</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
              laoreet libero ac diam luctus, ac commodo magna hendrerit. Vivamus
              dictum urna sit amet urna efficitur rhoncus. Suspendisse sit amet
              fringilla ante, in commodo nulla. Proin lacinia vehicula lacus non
              dignissim. Donec ultricies dolor dolor, sit amet sagittis ante
              interdum ut. Phasellus euismod felis ut scelerisque interdum. In
              dignissim aliquam eros sit amet pharetra. Praesent neque nisi,
              viverra in blandit a, dignissim nec elit. Morbi vel mi gravida,
              accumsan orci ullamcorper, congue augue. Sed dui est, accumsan et.
            </p>
          </aside>
        </div>
        <footer></footer>
      </div>
    </>
  );
}

export default Home;
