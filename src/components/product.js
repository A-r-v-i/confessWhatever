import React from "react";

const Product = ({ products, selectedProduct, history }) => {
  const handlePurchase = (prod) => () => {
    console.log(prod)
    selectedProduct(prod);
    history.push("/checkout");
  };

  return products.map((prod) => {
    return (
      <div className="product" key={prod.id}>
        <section>
          <h2>{prod.name}</h2>
          <p>{prod.desc}</p>
          <h3>{"$" + prod.price}</h3>
          <button type="button" onClick={handlePurchase(prod)}>
            PURCHASE
          </button>
        </section>
        <img src={prod.img} alt={prod.name} />
      </div>
    );
  });
};

export default Product;
