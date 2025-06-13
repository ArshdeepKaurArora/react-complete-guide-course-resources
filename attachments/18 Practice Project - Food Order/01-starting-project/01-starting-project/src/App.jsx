import Header from "./components/Header";
import Products from "./components/Products";
import { ProductProvider } from "./store/product-context";
import { useRef } from "react";
import { Cart } from "./components/Cart";
import { CheckoutForm } from "./components/CheckoutForm";

function App() {

  const cartRef = useRef(null)
  const formRef = useRef(null)

  const handleCart = () => {
    cartRef.current.open()
  }

  const handleCheckout = () => {
    formRef.current.open()
  }

  return (
    <ProductProvider>
      <Header handleCart={handleCart} />
      <Products />
      <Cart ref={cartRef} handleCheckout={handleCheckout}/>
      <CheckoutForm ref={formRef} />
    </ProductProvider>
  );
}

export default App;
