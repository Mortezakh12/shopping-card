import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Layout from "../Layout/Layout";
import { useCart, useCartActions } from "../Provider/CartProvider";

const CartPage = () => {
  const { cart, total } = useCart();
  const dispatch = useCartActions();
  const incrHandler = (cartItem) => {
    dispatch({ type: "ADD_TO_CART", payload: cartItem });
  };
  const decHandler = (cartItem) => {
    dispatch({ type: "REMOVE_PRODUCT", payload: cartItem });
  };
  const delHandler = (cartItem) => {
    dispatch({ type: "DELET_PRODUCT", payload: cartItem });
  };
  if (!cart.length) {
    return (
      <Layout>
        <h2 className="text-lg font-bold text-gray-900">Cart is empaty</h2>
      </Layout>
    );
  }
  return (
    <Layout>
      <main className="">
        <div>
          <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
          {cart.map((item) => {
            return (
              // eslint-disable-next-line react/jsx-key
              <div className="h-full bg-gray-100 pt-20 ">
                <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 ">
                  <div className="rounded-lg md:w-2/3 ">
                    <div className="gap-2 mb-2  h-full rounded-lg bg-white p-4 shadow-md sm:flex sm:justify-start">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-42 h-32 rounded-lg sm:w-40"
                      />
                      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                        <div className="mt-5 sm:mt-0">
                          <h2 className="text-lg font-bold text-gray-900">
                            {item.name}
                          </h2>
                          <p className="mt-1 text-xs text-gray-700">
                            <p className="text-gray-700 text-lg"> discount:
                            {item.discount}$
                            </p>
                          </p>
                        </div>
                        <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                          <div className="flex items-center border-gray-100 gap-2">
                            <span
                              onClick={() => decHandler(item)}
                              className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                            >
                              {" "}
                              -{" "}
                            </span>
                            <button className="h-8 w-8 border bg-white text-center text-xs outline-none">
                              {item.quantity}
                            </button>
                            <span
                              onClick={() => incrHandler(item)}
                              className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                            >
                              {" "}
                              +{" "}
                            </span>
                          </div>
                          <div className="flex items-center space-x-4">
                            <p className="text-sm">
                              {item.price * item.quantity}$
                            </p>
                            <svg
                              onClick={() => delHandler(item)}
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="currentColor"
                              className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!-- Sub total --> */}
                </div>
              </div>
            );
            // eslint-disable-next-line no-unreachable
          })}
        </div>
        <CartSummery total={total} cart={cart} />
      </main>
    </Layout>
  );
};

export default CartPage;

// eslint-disable-next-line react/prop-types
const CartSummery = ({ total, cart }) => {
  // eslint-disable-next-line no-unused-vars, react/prop-types
  const originalTotalPrice = cart.length
    ? // eslint-disable-next-line react/prop-types
      cart.reduce((acc, curr) => acc + curr.quantity * curr.price, 0)
    : 0;
  return (
    <div className="h-screen bg-gray-100 pt-20">
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Cart total</p>
            <p className="text-gray-700">{originalTotalPrice} $</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Discount</p>
            <p className="text-gray-700">{originalTotalPrice - total} $</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Net price</p>
            <div className="">
              <p className="mb-1 text-lg font-bold">{total}$ USD</p>
              <p className="text-sm text-gray-700"></p>
            </div>
          </div>
          <Link to="/checkout">
            <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
              Check out
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
