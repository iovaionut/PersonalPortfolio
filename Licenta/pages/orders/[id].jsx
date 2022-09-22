import styles from "../../styles/Order.module.css";
import Image from "next/image";
import axios from "axios";

const Order = ({order}) => {

    const status = order.status;

    const statusClass = (index) => {
        if(index-status <1) return styles.done;
        if(index-status === 1) return styles.inProgress;
        if(index-status >1) return styles.undone;
    };

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.row}>
                <table className={styles.table}>
                    <tbody>
                        <tr className={styles.trTitle}>
                            <th>ID Comandă</th>
                            <th>Client</th>
                            <th>Adresă</th>
                            <th>Total</th>
                        </tr>
                        <tr className={styles.tr}>
                            <td>
                                <span className={styles.id}>{order._id}</span>
                            </td>
                            <td>
                                <span className={styles.name}>{order.customer}</span>
                            </td>
                            <td>
                                <span className={styles.address}>{order.address}</span>
                            </td>
                            <td>
                                <span className={styles.total}>{order.total} lei</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
                </div>
                <div className={styles.row}>
                    <div className={statusClass(0)}>
                        <Image src="/image/paid.png" width={30} height={30} alt=""/>
                        <span>Comandă recepționată</span>
                        <div className={styles.checkedIcon}>
                            <Image className={styles.checkedIcon} src="/image/checked.png" width={20} height={20} alt=""/>
                        </div>
                    </div>
                    <div className={statusClass(1)}>
                        <Image src="/image/bake.png" width={30} height={30} alt=""/>
                        <span>În curs de preparare</span>
                        <div className={styles.checkedIcon}>
                            <Image className={styles.checkedIcon} src="/image/checked.png" width={20} height={20} alt=""/>
                        </div>
                    </div>
                    <div className={statusClass(2)}>
                        <Image src="/image/bike.png" width={30} height={30} alt=""/>
                        <span>În curs de livrare</span>
                        <div className={styles.checkedIcon}>
                            <Image className={styles.checkedIcon} src="/image/checked.png" width={20} height={20} alt=""/>
                        </div>
                    </div>
                    <div className={statusClass(3)}>
                        <Image src="/image/delivered.png" width={30} height={30} alt=""/>
                        <span>Livrată</span>
                        <div className={styles.checkedIcon}>
                            <Image className={styles.checkedIcon} src="/image/checked.png" width={20} height={20} alt=""/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.right}>
                <div className={styles.wrapper}>
                    <h2 className={styles.title}>TOTAL COȘ</h2>
                    <div className={styles.totalText}>
                        <b className={styles.totalTextTitle}>Subtotal:</b>{order.total} lei
                    </div>
                    <div className={styles.totalText}>
                        <b className={styles.totalTextTitle}>Livrare:</b>5 lei
                    </div>
                    <div className={styles.totalText}>
                        <b className={styles.totalTextTitle}>Total:</b>{order.total + 5} lei
                    </div>
                    <button disabled className={styles.button}>PLĂTITĂ</button>
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps = async ({params}) => {
    const res = await axios.get(`http://localhost:3000/api/orders/${params.id}`);
    return {
        props: { order: res.data },
    };
};

export default Order;