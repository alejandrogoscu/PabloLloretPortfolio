import Header from '../Common/Header/Header';
import Footer from '../Common/Footer/Footer';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main className="main-content">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
