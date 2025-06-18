import Header from "./components/Header";
import Products from "./components/Products";
import { ProductProvider } from "./store/ProductContext";
import { Cart } from "./components/Cart";
import { CheckoutForm } from "./components/CheckoutForm";
import { UserProgressProvider } from "./store/UserProgressContext";

function App() {

  return (
    <UserProgressProvider>
      <ProductProvider>
        <Header/>
        <Products />
        <Cart/>
        <CheckoutForm/>
      </ProductProvider>
    </UserProgressProvider>
  );
}

export default App;
