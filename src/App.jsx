import HomePage from "./Pages/HomePage";
import CartPage from "./Pages/CartPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CartProvider from "./Provider/CartProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckOutPage from "./Pages/CheckoutPage";
import signupPage from "./Pages/signupPage";
import loginPage from "./Pages/loginPage";
import AuthProvider from "./Provider/AuthProvider";
import ProfilePage from "./Pages/ProfilePage";

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <ToastContainer />
          <Switch>
            <Route path="/cart" component={CartPage} />
            <Route path="/checkout" component={CheckOutPage} />
            <Route path="/login" component={loginPage} />
            <Route path="/signup" component={signupPage} />
            <Route path="/profile" component={ProfilePage} />
            <Route path="/" component={HomePage} />
          </Switch>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
