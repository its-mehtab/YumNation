import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useParams } from "react-router-dom";

const RestaurantDishes = () => {
  const [restaurntDishes, setRestaurantDishes] = useState();
  const [loading, setLoading] = useState(false);

  const { serverURL } = useAuth();
  const { slug } = useParams();

  const fetchRestaurantDishes = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${serverURL}/api/dish/restaurants/${slug}/dishes`,
        { withCredentials: true },
      );

      setRestaurantDishes(data);
    } catch (error) {
      console.log(
        "Restaurant Dishes Error:",
        error?.response?.data || error.message,
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurantDishes();
  }, []);

  return <div>RestaurantDishes</div>;
};

export default RestaurantDishes;
