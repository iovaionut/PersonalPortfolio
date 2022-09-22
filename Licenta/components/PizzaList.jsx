import styles from "../styles/PizzaList.module.css";
import PizzaCard from "./PizzaCard";

const PizzaList = ({pizzaList}) => {
    return(
        <div className={styles.container}>
            <h1 className={styles.title}>PROBABIL CEA MAI BUNĂ PIZZA DIN ORADEA</h1>
            <p className={styles.description}>Te invităm la o experiență unică, în cel mai pur stil italian, să descoperi tradiția celei mai autentice pizza. În fiecare produs din acest meniu veți regăsi ingrediente proaspete și tradiția celei mai autentice pizza pe vatră.</p>
            <div className={styles.wrapper}>
                {pizzaList.slice(0,8).map((pizza)=>(
                    <PizzaCard key={pizza._id} pizza={pizza}/>
                ))}
            </div>
        </div>
    );
};

export default PizzaList;