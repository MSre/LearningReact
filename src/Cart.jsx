import { intlFormat } from "./intlFormatter.js";

export default function Cart({ cart, checkout }) {
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total += cart[i].pizza.sizes[cart[i].size];
  }

  return (
    <div className="cart">
      <h2>Cart</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            <span className="size">{item.size} - </span>
            <span className="type">{item.pizza.name} - </span>
            <span className="price">{item.price}</span>
          </li>
        ))}
      </ul>
      <p>Total: {intlFormat(total)}</p>
      <button onClick={checkout}>Checkout</button>
    </div>
  );
}
