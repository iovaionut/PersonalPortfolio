import Image from "next/image";
import styles from "../styles/Contact.module.css";

const Contact = () => {
    return (
        <div className={styles.container}>
            <div className={styles.sus}>
                <div className={styles.text}>
                    <h1 className={styles.hendo}>
                        <span>Ia legătura cu noi</span>
                    </h1>
                </div>
            </div>
            <div className={styles.jos}>
                <div className={styles.left}>
                    <div className={styles.imgContainer}>
                        <Image src="/image/contact1.png" width="100" height="100" alt=""/>
                    </div>
                    <h3 className={styles.title}>Scrie!</h3>
                    <span>pizzeriaionut@yahoo.com</span>
                </div>
                <div className={styles.middle}>
                    <div className={styles.imgContainer}>
                        <Image src="/image/contact2.png" width="100" height="100" alt=""/>
                    </div>
                    <h3 className={styles.title}>Sună!</h3>
                    <span className={styles.number}>0744 497 422</span>
                    <span className={styles.number}>0745 459 505</span>
                    <span className={styles.number}>0744 506 027</span>
                </div>
                <div className={styles.right}>
                    <div className={styles.imgContainer}>
                        <Image src="/image/contact3.png" width="100" height="100" alt=""/>
                    </div>
                    <h3 className={styles.title}>Vizitează!</h3>
                    <span className={styles.number}>Ștefan cel Mare 86/A, Oradea</span>
                    <span className={styles.number}>Principală 391A, Sântandrei</span>
                    <span className={styles.number}>Băile Felix 171, Sînmartin</span>
                </div>
            </div>
        </div>
    );
};

export default Contact;