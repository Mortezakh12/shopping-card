import Navigation from "../components/Navigation";

// eslint-disable-next-line react/prop-types
const Layout = ({ children }) => {
  return (
    <div>
      <Navigation />
      {children} 
    </div>
  );
};

export default Layout;
