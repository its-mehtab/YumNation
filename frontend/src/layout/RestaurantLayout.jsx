import RestaurantHeader from "../components/owner/RestaurantHeader";
import RestaurantSidebar from "../components/owner/RestaurantSidebar";

const RestaurantLayout = ({ children }) => (
  <div className="flex h-screen bg-white">
    <RestaurantSidebar />
    <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#ea6a12]">
      <RestaurantHeader />
      <main className="flex-1 overflow-y-auto p-8 bg-white z-10 shadow-[-5px_-5px_20px_rgba(0,0,0,0.02)]">
        {children}
      </main>
    </div>
  </div>
);

export default RestaurantLayout;
