import React, { useEffect } from "react";
import { StripeProvider, Elements } from "react-stripe-elements";
import CheckoutForm from "./checkoutForm";
// import { products } from "./datas/products";

let product = {
  name: "Rubber Duck",
  desc: `Rubber ducks can lay as many eggs as the best chicken layers, and they
are fun to watch with their antics in your backyard, your barnyard, or
your pond.`,
  price: 9.99,
  img:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSqkN8wkHiAuT2FQ14AsJFgihZDzKmS6OHQ6eMiC63rW8CRDcbK",
  id: 100,
};

const Checkout = ({ selectedProduct, history }) => {
  console.log(selectedProduct);
  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <StripeProvider apiKey="pk_test_51HD8tWJN8jdrIll5wm8SHAwvqBYQiFq3coQmibqX9ILJANJWQAFFWUOU50gDVJNbI1n2ogjSJX1ZnRxvm3vRZRkt00zKH8RShf">
      <Elements>
        <CheckoutForm product={product} history={history} />
      </Elements>
    </StripeProvider>
  );
};

export default Checkout;
