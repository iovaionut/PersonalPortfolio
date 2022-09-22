import Image from "next/image";
import styles from "../styles/Footer.module.css";

const Footer = () => {
    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <Image src="/image/bg.png" layout="fill" alt="" />
            </div>
            <div className={styles.item}>
                <div className={styles.card}>
                    <h2 className={styles.motto}>PREGĂTIM CEA MAI BUNĂ PIZZA ÎN LOCALURILE NOASTRE SAU O ADUCEM LA TINE ACASĂ SAU LA BIROU!</h2>
                </div>
                <div className={styles.card}>
                    <h1 className={styles.title}>NE PUTEȚI GĂSI LA URMĂTOARELE LOCAȚII</h1>
                    <p className={styles.text}>
                        Bulevardul Ștefan cel Mare, Nr. 86/A
                        <br /> Oradea
                        <br /> 0744 497 422
                    </p>
                    <p className={styles.text}>
                        Strada Principală, Nr. 391A
                        <br /> Sântandrei
                        <br /> 0745 459 505
                    </p>
                    <p className={styles.text}>
                        Bulevardul Băile Felix, Nr. 171
                        <br /> Sînmartin
                        <br /> 0744 506 027
                    </p>
                </div>
                <div className={styles.card}>
                    <h1 className={styles.title}>PROGRAM</h1>
                    <p className={styles.text}>
                        LUNI - VINERI
                        <br /> 9:00 - 22:00
                    </p>
                    <p className={styles.text}>
                        SÂMBĂTĂ
                        <br /> 12:00 - 20:00
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Footer;