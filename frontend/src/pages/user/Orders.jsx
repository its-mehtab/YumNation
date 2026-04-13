import React, { useEffect, useState } from "react";
import { Skeleton, Table } from "@radix-ui/themes";
import { assets } from "../../assets/assets";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useOrders } from "../../context/user/OrderContext";
import dayjs from "dayjs";
import { ChevronRightIcon, LocationIcon } from "../../assets/icon/Icons";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { useAuth } from "../../context/user/AuthContext";

const Orders = () => {
  const { serverURL } = useAuth();
  const { orders, setOrders, loading, setLoading } = useOrders();
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);

  const handlePageChange = async (e, value) => {
    setPage(value);
    setSearchParams({ page: value });
  };

  const fetchOrders = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const { data } = await axios.get(`${serverURL}/api/order?page=${page}`, {
        withCredentials: true,
      });

      setOrders(data);
    } catch (error) {
      console.log("Order Error:", error?.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page]);

  if (!loading && (!orders?.orders || orders?.orders?.length === 0)) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="text-6xl mb-4">🛍️</div>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          No orders yet
        </h2>
        <p className="text-sm text-gray-400 mb-6">
          Looks like you haven't placed any orders yet.
        </p>
        <Link
          to="/restaurants"
          className="bg-[#fc8019] text-white px-6 py-2.5 rounded-md text-sm font-semibold hover:bg-[#e5721f] transition-colors"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row align="center">
            <Table.ColumnHeaderCell px="5" py="4">
              <p className="text-gray-600 font-medium">Menu</p>
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>
              <p className="text-gray-600 font-medium">Date</p>
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>
              <p className="text-gray-600 font-medium">Address</p>
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>
              <p className="text-gray-600 font-medium">Total</p>
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>
              <p className="text-gray-600 font-medium">Status</p>
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
                <Table.Row key={i} align="center">
                  {Array.from({ length: 6 }).map((_, j) => (
                    <Table.Cell key={j}>
                      <Skeleton loading={true}>
                        <div className="h-4 w-24 rounded" />
                      </Skeleton>
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))
            : orders?.orders?.map((order) => {
                return (
                  <Table.Row
                    onClick={() => navigate(`/order/${order._id}`)}
                    align="center"
                    key={order._id}
                    className="fade-up cursor-pointer"
                  >
                    <Table.RowHeaderCell px="5" py="5">
                      <div className="flex gap-3 items-center">
                        <div
                          className={`w-16 min-w-16 h-16 rounded-lg border flex justify-center items-center border-[#fc8019]`}
                        >
                          {/* <img src={currProd.image} alt="" className="w-full" /> */}
                          <img src={assets.dish2} alt="" className="w-full" />
                        </div>
                        <div>
                          <h3 className="flex gap-2 text-sm font-semibold text-gray-700 hover:text-[#fc8019] transition-all">
                            <div to={``}>{order.items[0].name}</div>
                            {order.items.length > 1 && (
                              <div className="text-lg text-[#fc8019]">
                                +{order.items.length - 1}
                              </div>
                            )}
                          </h3>
                          <p className="text-xs text-gray-500 font-medium mt-2">
                            {order.items[0].variant?.name}
                            {order.items[0].addOns?.length > 0 && (
                              <>
                                {" "}
                                |{" "}
                                {order.items[0].addOns
                                  ?.map((a) => a.name)
                                  .sort()
                                  .join("+")}
                              </>
                            )}{" "}
                            × {order.items[0].quantity}
                          </p>
                        </div>
                      </div>
                    </Table.RowHeaderCell>
                    <Table.Cell>
                      {dayjs(order.createdAt).format("MMM D, YYYY h:mm A")}
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex gap-2 items-center">
                        <LocationIcon color={"#fc8019"} />
                        {`${order.deliveryAddress.city}, ${order.deliveryAddress.state}, ${order.deliveryAddress.pinCode}`}
                      </div>
                    </Table.Cell>
                    <Table.Cell className="text-base font-semibold text-[#fc8019]">
                      ${order.totalAmount.toFixed(2)}
                    </Table.Cell>
                    <Table.Cell>
                      <div className="font-medium capitalize py-2 rounded-lg bg-gray-100 border border-[#fc8019] text-center text-[#fc8019]">
                        {order.orderStatus}
                      </div>
                    </Table.Cell>
                    <Table.Cell px="3">
                      <ChevronRightIcon
                        size={18}
                        addClass="text-gray-400 hover:text-gray-700"
                      />
                    </Table.Cell>
                  </Table.Row>
                );
              })}
        </Table.Body>
      </Table.Root>
      <div className="mt-8 flex justify-center">
        <Stack spacing={2}>
          <Skeleton loading={loading}>
            <Pagination
              page={page}
              onChange={handlePageChange}
              count={orders?.pages}
              variant="outlined"
              shape="rounded"
            />
          </Skeleton>
        </Stack>
      </div>
    </div>
  );
};

export default Orders;
