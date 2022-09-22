import Image from "next/image";
import styles from "../styles/About.module.css";

const About = () => {
    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.cardbg}>

                </div>
                <div className={styles.card}>
                    <div className={styles.imgContainer}>
                        <Image src="/image/restaurant2.jpg" alt="" layout="fill" objectFit="cover" />
                    </div>
                </div>
            </div>
            <div className={styles.right}>
                <h1 className={styles.title}>Despre noi</h1>
                <p className={styles.desc}>Pizzeria noastră cu atmosferă mediteraneană este foarte populară în rândul locuitorilor din Oradea, întrucât ne străduim să pregătim pizza cu ingrediente de înaltă calitate.</p>
                <p className={styles.desc}>Materia primă este importată din Italia, inclusiv făina pentru pizza. Gătim exclusiv cu ulei de măsline extravirgin de o calitate superioară.</p>
                <p className={styles.desc}>Misiunea noastră este să transformăm orice întâlnire, fie că este vorba de o cină în doi, sau o seară de grup, într-o experiență memorabilă. Pregătim totul în cel mai mic detaliu, astfel încât tu să te simți special de fiecare dată când treci pe la noi.</p>
                <p className={styles.desc}>Localul are un ambient modern care pune accent pe calitatea produselor, servire și curățenie. Poți savura pizza noastră făcută pe vatră chiar și la tine acasă, datorită serviciului de livrări la domiciliu.</p>
                <p className={styles.desc}>Decorul unic, mâncarea savuroasă, atmosfera rafinată și serviciile excelente sunt condimentele unei petreceri pe care oaspeții tăi nu o vor uita prea curând!</p>
            </div>
        </div>
    );
};

export default About;