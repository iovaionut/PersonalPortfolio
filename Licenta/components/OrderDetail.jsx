import { useState } from "react";
import styles from "../styles/OrderDetail.module.css";

const OrderDetail = ({ total, createOrder }) => {
    const [customer, setCustomer ] = useState("");
    const [address, setAddress ] = useState("");

    const handleClick = () => {
        createOrder({customer, address, total, method:0 });
    };

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h1 className={styles.title}>Veți avea de plătit 5 lei pentru livrare.</h1>
                <div className={styles.item}>
                    <label className={styles.label}>Nume Prenume</label>
                    <input 
                        placeholder="Ion Popescu" 
                        type="text" 
                        className={styles.input} 
                        onChange={(e) => setCustomer(e.target.value)}
                    />
                </div>
                <div className={styles.item}>
                    <label className={styles.label}>Telefon</label>
                    <input 
                        placeholder="+0123 456 789" 
                        type="text" 
                        className={styles.input} 
                    />
                </div>
                <div className={styles.item}>
                    <label className={styles.label}>Adresa</label>
                    <textarea 
                        rows={5} 
                        placeholder="Strada Frizereski"
                        type="text"
                        className={styles.textarea}
                        onChange={(e) => setAddress(e.target.value)}
                     />
                </div>
                <button className={styles.button} onClick={handleClick}>
                    Comandă
                </button>
            </div>
        </div>
    );
};

export default OrderDetail;