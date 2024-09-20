import React from "react";

function Currencyformat({ amount }) {
  // Changed from 'price' to 'amount'
  // Format the amount as currency
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);

  return (
    <div>
      <span>{formattedPrice}</span>
    </div>
  );
}

export default Currencyformat;
