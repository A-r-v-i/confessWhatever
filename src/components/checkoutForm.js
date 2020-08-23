import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  injectStripe,
} from "react-stripe-elements";
import axios from "axios";
// import { products } from "./datas/products";

const CheckoutForm = ({ product, stripe, history }) => {
  console.log(product);
  if (product === null) {
    history.push("/");
  }
  const [receiptUrl, setReceiptUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { token } = await stripe.createToken();

    const order = await axios.post("http://localhost:9000/api/stripe/pay", {
      amount: product.price.toString().replace(".", ""),
      source: token.id,
      mail: "mahewaran18@gmail.com",
    });
    console.log(order);
    setReceiptUrl(order.data.payment.reciept_url);
  };
  if (receiptUrl) {
    return (
      <div className="success">
        <h2>Payment Successful!</h2>
        <a href={receiptUrl}>View Receipt</a>
        <Link to="/">Home</Link>
      </div>
    );
  }

  return (
    <div className="checkout-form">
      <p>Amount: ${product.price}</p>
      <form onSubmit={handleSubmit}>
        <label>
          Card details
          <CardNumberElement />
        </label>
        <label>
          Expiration date
          <CardExpiryElement />
        </label>
        <label>
          CVC
          <CardCVCElement />
        </label>
        <button type="submit" className="order-button">
          Pay
        </button>
      </form>
    </div>
  );
};
export default injectStripe(CheckoutForm);
