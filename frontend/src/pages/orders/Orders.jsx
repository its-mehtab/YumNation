import { Table } from "@radix-ui/themes";
import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { useOrders } from "../../context/OrderContext";
import dayjs from "dayjs";
import { ChevronRightIcon, LocationIcon } from "../../assets/icon/Icons";

const Orders = () => {
  const { orders } = useOrders();

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
          {orders?.map((order) => {
            return (
              <Table.Row align="center" key={order._id}>
                <Table.RowHeaderCell px="5" py="5">
                  <div className="flex gap-3 items-center">
                    <Link
                      to={`/product/${order.items[0].product.slug}`}
                      className={`w-16 min-w-16 h-16 rounded-lg border flex justify-center items-center border-[#fc8019]`}
                    >
                      {/* <img src={currProd.image} alt="" className="w-full" /> */}
                      <img src={assets.product2} alt="" className="w-full" />
                    </Link>
                    <div>
                      <h3 className="flex gap-2 text-sm font-semibold text-gray-700 hover:text-[#fc8019] transition-all">
                        <Link to={`/product/${order.items[0].product.slug}`}>
                          {order.items[0].name}
                        </Link>
                        {order.items.length > 1 && (
                          <div className="text-lg text-[#fc8019]">
                            +{order.items.length - 1}
                          </div>
                        )}
                      </h3>
                      <p className="text-xs text-gray-500 font-medium mt-2">
                        {order.items[0].variant} × {order.items[0].quantity}
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
                  <Link className="hover:translate-x-2">
                    <ChevronRightIcon
                      size={18}
                      addClass="text-gray-400 hover:text-gray-700"
                    />
                  </Link>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default Orders;
