import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootLayout } from "./root/Root";
import Home from "./pages/Home";
import Products from "./pages/Products";
import { Error } from "./error/Error";
import ProductDetail from "./pages/ProductDetail";

const router = createBrowserRouter([
  {
    path: '/', element: <RootLayout />, errorElement: <Error />, children: [
      {
        index: true, element: <Home />
      },
      {
        path: 'products', element: <Products />
      },
      {
        path: 'products/:productId', element: <ProductDetail />
      }
    ]
  }
])

function App() {
  return <RouterProvider router={router}/>;
}

export default App;
