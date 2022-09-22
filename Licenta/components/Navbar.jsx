import Image from "next/image";
import styles from "../styles/Navbar.module.css";
import { useSelector } from "react-redux";
import Link from "next/link";

const Navbar = () => {
    const quantity = useSelector((state) => state.cart.quantity);
    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <div className={styles.callButton}>
                    <Image src="/image/telephone.png" alt="" width="32" height="32" />
                </div>
                <div className={styles.texts}>
                    <div className={styles.text}>COMANDĂ ACUM!</div>
                    <div className={styles.text}>0744 497 422</div>
                </div>
            </div>
            <div className={styles.item}>
                <ul className={styles.list}>
                    <Link href="/" passHref>
                        <li className={styles.listItem}>Home</li>
                    </Link>
                    <Link href="/products" passHref>
                        <li className={styles.listItem}>Produse</li>
                    </Link>
                    <Image src="/image/rologo.png" alt="" width="150px" height="150px" />
                    <Link href="/about" passHref>
                        <li className={styles.listItem}>Despre noi</li>
                    </Link>
                    <Link href="/contact" passHref>
                        <li className={styles.listItem}>Contact</li>
                    </Link>
                </ul>
            </div>
            <Link href="/cart" passHref>
                <div className={styles.item}>
                    <div className={styles.cart}>
                        <Image src="/image/cart.png" alt="" width="30px" height="30px" />
                        <div className={styles.counter}>{quantity}</div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default Navbar;