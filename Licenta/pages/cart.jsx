import styles from "../styles/Cart.module.css";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { 
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import axios from "axios";
import { useRouter } from "next/router";
import { reset } from "../redux/cartSlice";
import OrderDetail from "../components/OrderDetail";

const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const [open, setOpen] = useState(false);
    const [cash, setCash] = useState(false);
    const amount = cart.total;
    const currency = "USD";
    const style = { layout: "vertical"};
    const dispatch = useDispatch();
    const router = useRouter();

    const createOrder = async (data) =>{
        try{
            const res = await axios.post("http://localhost:3000/api/orders", data);
            res.status === 201 && router.push("/orders/"+res.data._id);
            dispatch(reset());
        }catch(err){
            console.log(err);
        }
    }

    const ButtonWrapper = ({ currency, showSpinner }) => {
        const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    
        useEffect(() => {
            dispatch({
                type: "resetOptions",
                value: {
                    ...options,
                    currency: currency,
                },
            });
        }, [currency, showSpinner]);
    
    
        return (<>
                { (showSpinner && isPending) && <div className="spinner" /> }
                <PayPalButtons
                    style={style}
                    disabled={false}
                    forceReRender={[amount, currency, style]}
                    fundingSource={undefined}
                    createOrder={(data, actions) => {
                        return actions.order
                            .create({
                                purchase_units: [
                                    {
                                        amount: {
                                            currency_code: currency,
                                            value: amount,
                                        },
                                    },
                                ],
                            })
                            .then((orderId) => {
                                // Your code here after create the order
                                return orderId;
                            });
                    }}
                    onApprove={function (data, actions) {
                        return actions.order.capture().then(function (details) {
                            const shipping = details.purchase_units[0].shipping;
                            createOrder({ 
                                customer: shipping.name.full_name, 
                                address: shipping.address.address_line_1,
                                total: cart.total,
                                method: 1,
                             });
                        });
                    }}
                />
            </>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <table className={styles.table}>
                    <tbody>
                        <tr className={styles.trTitle}>
                            <th>Produs</th>
                            <th>Nume</th>
                            <th>Extra Opțiuni</th>
                            <th>Preț</th>
                            <th>Cantitate</th>
                            <th>Total</th>
                        </tr>
                    </tbody>
                    <tbody>
                        {cart.products.map((product) => (
                            <tr className={styles.tr} key={product._id}>
                                <td>
                                    <div className={styles.imgContainer}>
                                        <Image src={product.image} layout="fill" objectFit="cover" alt=""/>
                                    </div>
                                </td>
                                <td>
                                    <span className={styles.name}>{product.title}</span>
                                </td>
                                <td>
                                    <span className={styles.extras}>
                                        {product.extras.map((extra) => (
                                            <span key={extra._id}>{extra.text}, </span>
                                        ))}
                                    </span>
                                </td>
                                <td>
                                    <span className={styles.price}>{product.price} lei</span>
                                </td>
                                <td>
                                    <span className={styles.quantity}>{product.quantity}</span>
                                </td>
                                <td>
                                    <span className={styles.total}>{product.price * product.quantity} lei</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={styles.right}>
                <div className={styles.wrapper}>
                    <h2 className={styles.title}>TOTAL COȘ</h2>
                    <div className={styles.totalText}>
                        <b className={styles.totalTextTitle}>Subtotal:</b>{cart.total} lei
                    </div>
                    <div className={styles.totalText}>
                        <b className={styles.totalTextTitle}>Livrare:</b>5 lei
                    </div>
                    <div className={styles.totalText}>
                        <b className={styles.totalTextTitle}>Total:</b>{cart.total + 5} lei
                    </div>
                    {open ? (
                        <div className={styles.paymentMethods}>
                            <button 
                                className={styles.payButton} 
                                onClick={() => setCash(true)}
                            >
                                PLATĂ CASH
                            </button>
                            <PayPalScriptProvider
                                options={{
                                    "client-id": "Ac6xJMFqTXennHOjq55EoMeRvXIa1fsaXQ5waH3tKvSYL1WnsTC11w1QdQWaQOK-4_AXfxX5LAQAccad",
                                    components: "buttons",
                                    currency: "USD",
                                }}
                            >
				                <ButtonWrapper currency={currency} showSpinner={false} />
			                </PayPalScriptProvider>
                        </div>
                    ) : (
                    <button onClick={() => setOpen(true)} className={styles.button}>FINALIZEAZĂ COMANDA!</button>
                    )}
                </div>
            </div>
            {cash && (
                <OrderDetail total={cart.total} createOrder={createOrder} />
            )}
        </div>
    );
};

export default Cart