import RestaurantHeader from "../components/restaurant/RestaurantHeader";
import RestaurantSidebar from "../components/restaurant/RestaurantSidebar";

const RestaurantLayout = ({ children }) => (
  <>
    <RestaurantHeader />
    <div className="grid grid-cols-11 h-screen">
      <RestaurantSidebar />
      <div className="col-span-9 flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  </>
);

export default RestaurantLayout;
