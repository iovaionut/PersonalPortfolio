import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import styles from "../../styles/Admin.module.css";

const Index = ({ orders, products }) => {

    const [pizzaList, setPizzaList] = useState(products);
    const [orderList, setOrderList] = useState(orders);
    const status = ["În curs de preparare", "În curs de livrare", "Livrată"];

    const handleDelete = async (id) => {
        try{
            const res = await axios.delete("http://localhost:3000/api/products/" + id);
            setPizzaList(pizzaList.filter((pizza) => pizza._id !== id));
        }catch(err){
            console.log(err);
        }
    };

    const handleStatus = async (id) => {

        const item = orderList.filter((order) => order._id === id)[0];
        const currentStatus = item.status;

        try{
            const res = await axios.put("http://localhost:3000/api/orders/" + id, {status: currentStatus+1});
            setOrderList([
                res.data,
                ...orderList.filter((order) => order._id !== id),
            ])
        }catch(err){
            console.log(err);
        }
    }

    return(
        <div className={styles.container}>
            <div className={styles.item}>
                <h1 className={styles.title}>Produse</h1>
                <table className={styles.table}>
                    <tbody>
                        <tr className={styles.trTitle}>
                            <th>Imagine</th>
                            <th>Id Produs</th>
                            <th>Titlu</th>
                            <th>Preț</th>
                            <th>Acțiune</th>
                        </tr>
                    </tbody>
                    {pizzaList.map((product) => (
                        <tbody key={product._id}>
                            <tr className={styles.trTitle}>
                                <td>
                                    <Image
                                        src={product.image}
                                        width={50}
                                        height={50}
                                        objectFit="cover"
                                        alt=""
                                    />
                                </td>
                                <td>{product._id.slice(0,5)}...</td>
                                <td>{product.title}</td>
                                <td>{product.prices[0]} lei</td>
                                <td>
                                    <button 
                                        className={styles.button} 
                                        onClick={() => handleDelete(product._id)}
                                    >
                                        Șterge
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    ))}
                        
                    
                </table>
            </div>
            <div className={styles.item}>
                <h1 className={styles.title}>Comenzi</h1>
                <table className={styles.table}>
                    <tbody>
                        <tr className={styles.trTitle}>
                            <th>Id Comandă</th>
                            <th>Client</th>
                            <th>Total</th>
                            <th>Modalitate de plată</th>
                            <th>Status</th>
                            <th>Acțiune</th>
                        </tr>
                    </tbody>
                    {orderList.map((order) => (
                        <tbody key={order._id}>
                            <tr className={styles.trTitle}>
                                <td>{order._id.slice(0,5)}...</td>
                                <td>{order.customer}</td>
                                <td>{order.total} lei</td>
                                <td>{order.method === 0 ? (<span>cash</span>) : <span>card</span>}</td>
                                <td>{status[order.status]}</td>
                                <td>
                                    <button onClick={() => handleStatus(order._id)}>Următorul Stagiu</button>
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </div>
        </div>
    )
}

export const getServerSideProps = async (ctx) => {
    const myCookie = ctx.req?.cookies || "";

    if(myCookie.token !== process.env.TOKEN){
        return{
            redirect:{
                destination: "/admin/login",
                permanent: false,
            },
        };
    }
    const productRes = await axios.get("http://localhost:3000/api/products");
    const orderRes = await axios.get("http://localhost:3000/api/orders");

    return{
        props: {
            orders: orderRes.data,
            products: productRes.data,
        },
    };
};

export default Index;