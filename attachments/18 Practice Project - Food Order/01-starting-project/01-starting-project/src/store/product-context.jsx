import { createContext, useState, useEffect } from "react";

export const ProductContext = createContext({
    products: [],
    addToCart: (id, name, price) => {},
    cart: {
        items: [],
        total: 0,
        count: 0
    },
    decreaseItemCount: (id) => {},
    increaseItemCount: (id) => {},
    removeFromCart: (id) => {},
    placeOrder: async (orderData) => {}
});

export function ProductProvider({children}) {

    const [products, setProducts] = useState([])
    const [cart, setCart] = useState({
        items: [],
        total: 0,
        count: 0
    })

    useEffect(() => {
        console.log("fetching products")
        async function fetchProducts() {
            const response = await fetch("http://localhost:3000/meals");
            if (!response.ok) {
                throw new Error("Failed to fetch products");
            }
            const data = await response.json();
            setProducts(data);
        }
        fetchProducts();
        console.log("products fetched")
    }, []);

    function addToCart(id, name, price) {
        const existingItem = cart.items.find((item) => item.id === id)
        if (existingItem) {
            setCart((prevCart) => {
                return {
                    ...prevCart,
                    items: prevCart.items.map((item) => item.id === id ? {...item, count: item.count + 1} : item),
                    total: Number(prevCart.total) + Number(price),
                    count: prevCart.count + 1
                }
            })
        } else {
            setCart((prevCart) => {
                return {...prevCart, 
                    items: [...prevCart.items, {id, name, price, count: 1}],
                    total: Number(prevCart.total) + Number(price),
                    count: prevCart.count + 1
                }
            })
        }
    }

    function removeFromCart(id) {
        const existingItem = cart.items.find((item) => item.id === id)
        setCart((prevCart) => {
            return {
                ...prevCart,
                items: prevCart.items.filter((item) => item.id !== id),
                total: Number(prevCart.total) - Number(existingItem.price),
                count: prevCart.count - existingItem.count
            }
        })
    }

    function decreaseItemCount(id) {
        const existingItem = cart.items.find((item) => item.id === id)
        if (existingItem.count === 1) {
            removeFromCart(id)
        } else {
            setCart((prevCart) => {
                return {
                    ...prevCart,
                    items: prevCart.items.map((item) => item.id === id ? {...item, count: item.count -1} : item),
                    total: Number(prevCart.total) - Number(existingItem.price),
                    count: prevCart.count - 1
                }
            })
        }
    }

    function increaseItemCount(id) {
        const existingItem = cart.items.find((item) => item.id === id)
        addToCart(id, existingItem.name, existingItem.price)
    }

    async function placeOrder(orderData) {
        const response = await fetch("http://localhost:3000/orders", {
            method: "POST",
            body: JSON.stringify(orderData),
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (!response.ok) {
            throw new Error("Failed to post order")
        }

        const data = await response.json();

        setCart({
            items: [],
            total: 0,
            count: 0
        })

        return data
    }

    return (
        <ProductContext.Provider value={{
            products, 
            addToCart, 
            cart, 
            decreaseItemCount, 
            increaseItemCount,
            removeFromCart,
            placeOrder
        }}>
            {children}
        </ProductContext.Provider>
    )
}