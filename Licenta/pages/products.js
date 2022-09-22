import Meniu from "../components/Meniu";
import PizzaList from "../components/PizzaList";
import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import styles from "../styles/Produse.module.css";

export default function Produse({ pizzaList }) {
    const [close, setClose] = useState(true);
  
    return (
      <div className={styles.container}>
        <Meniu pizzaList={pizzaList}/>
      </div>
    );
};

export const getServerSideProps = async(ctx) => {
  
    const res = await axios.get("http://localhost:3000/api/products");
    return{
      props:{
        pizzaList: res.data,
      },
    };
};