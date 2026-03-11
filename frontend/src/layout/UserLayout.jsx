import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";

const UserLayout = ({ children }) => (
  <>
    <Header />
    <main className="w-full bg-white rounded-t-4xl rounded-tr-4xl mt-19 user-header">
      <span className="clip-box"></span>
      <div className="mx-auto px-4 sm:px-6 lg:pl-10 lg:pr-6 pt-10 relative">
        {children}
        <Footer />
      </div>
    </main>
  </>
);

export default UserLayout;
