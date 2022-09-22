import styles from "../styles/Add.module.css";

const AddButton = ({setClose}) => {
    return(
        <div onClick={() => setClose(false)} className={styles.mainAddButton}>
            Adăugați un produs nou
        </div>
    )
};

export default AddButton;