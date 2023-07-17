import Layout from "../Layout/Layout";
import { useCart, useCartActions } from "../Provider/CartProvider";
import * as data from "../data";
import { checkInCart } from "../utils/inCartCheck";
import { toast } from "react-toastify";

const HomePage = () => {
  const { cart } = useCart();
  
  
  const dispatch = useCartActions();
  const addProductHandler = (product) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    dispatch({ type: "ADD_TO_CART", payload: product });
    console.log(product);
    toast.success(`${product.name}added to cart`)
  };
  return (
    <Layout>
      <main>
        <section className="mt-20 mb-20 mx-40 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data.products.map((product) => {
            return (
              // eslint-disable-next-line react/jsx-key
              <section key={product.id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  ></img>
                </div>
                <div className="mt-4 flex justify-between">
                  <h3 className="text-sm text-gray-700">{product.name}</h3>
                  <p className="text-sm font-medium text-gray-900">
                    {product.price}$
                  </p>
                </div>
                <button
                  onClick={() => addProductHandler(product)}
                  className="flex items-center justify-center w-full px-2 py-2 mt-4 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 mx-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                  </svg>
                  <span className="mx-1">{checkInCart(cart,product)?"in cart": "Add to cart"}</span>
                </button>
              </section>
            );
          })}
        </section>
      </main>
    </Layout>
  );
};

export default HomePage;
