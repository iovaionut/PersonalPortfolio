import { useState } from "react";
import styles from "../styles/Add.module.css";
import axios from "axios";
import { useRouter } from "next/router";

const Add = ({ setClose }) => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [prices, setPrices] = useState([]);
    const [extraOptions, setExtraOptions] = useState([]);
    const [extra, setExtra] = useState(null);

    const changePrice = (e, index) =>{
        const currentPrices = prices;
        currentPrices[index] = e.target.value;
        setPrices(currentPrices);
    }

    const handleExtraInput = (e) => {
        setExtra({ ...extra, [e.target.name]: e.target.value });
    };

    const handleExtra = (e) => {
        setExtraOptions((prev) => [...prev, extra]);
    };

    const handleCreate = async () => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "uploads")
        try{
            const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dc2cperem/image/upload", data);

            const { url } = uploadRes.data;
            const newProduct = {
                title, description, prices, extraOptions, image: url,
            };

            await axios.post("http://localhost:3000/api/products", newProduct);
            setClose(true);
        }catch(err){
            console.log(err);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <span onClick={() => setClose(true)} className={styles.close}>
                    X
                </span>
                <h1>Adăugați un nou produs</h1>
                <div className={styles.item}>
                    <label className={styles.label}>Alegeți o imagine</label>
                    <input type="file" onChange={(e) => setFile(e.target.files[0])}/>
                </div>
                <div className={styles.item}>
                    <label className={styles.label}>Titlu</label>
                    <input
                        className={styles.input}
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className={styles.item}>
                    <label className={styles.label}>Descriere</label>
                    <textarea
                        rows={4}
                        type="text"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className={styles.item}>
                    <label className={styles.label}>Prețuri</label>
                    <div className={styles.priceContainer}>
                        <input
                            className={`${styles.input } ${styles.inputSm}`} 
                            type="number" 
                            placeholder="Small" 
                            onChange={(e) => changePrice(e, 0)}
                        />
                        <input
                            className={`${styles.input } ${styles.inputSm}`} 
                            type="number" 
                            placeholder="Medium" 
                            onChange={(e) => changePrice(e, 1)}
                        /><input
                            className={`${styles.input } ${styles.inputSm}`} 
                            type="number" 
                            placeholder="Large" 
                            onChange={(e) => changePrice(e, 2)}
                        />
                    </div>
                </div>
                <div className={styles.item}>
                    <label className={styles.label}>Opțiuni extra</label>
                    <div className={styles.extra}>
                        <input
                            className={`${styles.input} ${styles.inputSm}`}
                            type="text"
                            placeholder="Item"
                            name="text"
                            onChange={handleExtraInput}
                        />
                        <input
                            className={`${styles.input} ${styles.inputSm}`}
                            type="text"
                            placeholder="Price"
                            name="price"
                            onChange={handleExtraInput}
                        />
                        <button className={styles.extraButton} onClick={handleExtra}>
                            Adăugați
                        </button>
                    </div>
                    <div className={styles.extraItems}>
                        {extraOptions.map((option) => (
                            <span key={option.text} className={styles.extraItem}>
                                {option.text}
                            </span>
                        ))}
                    </div>
                </div>
                <button className={styles.addButton} onClick={handleCreate}>
                    Creați produs
                </button>
            </div>
        </div>
    );
};

export default Add;