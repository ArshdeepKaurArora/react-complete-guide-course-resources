import { Fragment, useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import { sendCartData } from './store/cart';

function App() {
  const cart = useSelector(state => state.cart);
  const toggleCart = useSelector(state => state.cart.toggleCart);
  const notification = useSelector(state => state.ui.notification);
  const dispatch = useDispatch();

  const isInitial = useRef(true);

  useEffect(() => {
    if (isInitial.current) {
      isInitial.current = false;
      return;
    }
    dispatch(sendCartData(cart));
  }, [cart, dispatch])

  return (
    <Fragment>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message}/>}
      <Layout>
        { toggleCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
