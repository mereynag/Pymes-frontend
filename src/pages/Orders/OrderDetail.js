import React, { useEffect, useState } from "react";
import { getOrderDetail } from "../../services/orders";
import { Divider, List } from "antd";
import { TextS, TitleS } from "../../components/styledComponents/Typography";
import { ButtonS } from "../../components/styledComponents/antdStyled";
import { Link } from "react-router-dom";
import Avatar from "antd/lib/avatar/avatar";

const OrderDetail = ({
  match: {
    params: { ordersID },
  },
}) => {
  const [orders, setOrders] = useState({});

  useEffect(() => {
    async function getDetails() {
      const { data } = await getOrderDetail(ordersID);
      setOrders(data);
    }
    getDetails();
  }, [ordersID]);

  const {
    date,
    customer,
    total,
    payment,
    fulfillment,
    items,
    extra,
    itemsQuantity,
    itemsSalePrice,
    itemsSubtotal,
    orderNum,
  } = orders;

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
        }}
      >
        <div>
          <TitleS level={2}>ORDER # {orderNum}</TitleS>
          <TitleS level={5}>Customer: {customer}</TitleS>
        </div>
        <div>
          <TitleS level={5}>{date}</TitleS>
        </div>
      </div>
      <Divider />
      <div>
        <TitleS level={5} style={{ textAlign: "left" }}>
          Order Summary
        </TitleS>
        <div style={{ height: "400px" }}>
          <List
            style={{
              margin: "0.5rem",
              marginTop: "1rem",
            }}
            pagination={{
              pageSize: 4,
            }}
            itemLayout="horizontal"
            dataSource={items}
            renderItem={(item, index) => {
              return (
                <List.Item
                  actions={[
                    <p>
                      Subtotal:{" "}
                      {`$${itemsSubtotal[index]}`.replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ","
                      )}
                    </p>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        shape="square"
                        size={64}
                        src={item.image}
                        style={{ marin: "auto" }}
                      />
                    }
                    title={<a href="https://ant.design">{item.name}</a>}
                    description={
                      <TextS>
                        <small>
                          {`Price: $${itemsSalePrice[index]}`.replace(
                            /\B(?=(\d{3})+(?!\d))/g,
                            ","
                          )}{" "}
                          <br />
                          Quantity: {itemsQuantity[index]}
                        </small>
                      </TextS>
                    }
                  />
                </List.Item>
              );
            }}
          />
        </div>
        <br />
        <TitleS level={4} style={{ float: "right" }}>
          TOTAL ${total}
        </TitleS>
      </div>
      <br />
      <br />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex" }}>
          <div>
            {payment === "PAID" ? (
              <p
                style={{
                  backgroundColor: "#A3BE8C",
                  color: "white",
                  padding: "5px 10px",
                  margin: "10px",
                }}
              >
                PAID
              </p>
            ) : (
              <p
                style={{
                  backgroundColor: "#BF616A",
                  color: "white",
                  padding: "5px 10px",
                  margin: "10px",
                }}
              >
                UNPAID
              </p>
            )}
          </div>
          <div>
            {fulfillment === "PENDING" ? (
              <p
                style={{
                  backgroundColor: "#EBCB8B",
                  color: "white",
                  padding: "5px 10px",
                  margin: "10px",
                }}
              >
                PENDING
              </p>
            ) : fulfillment === "FULFILLED" ? (
              <p
                style={{
                  backgroundColor: "#A3BE8C",
                  color: "white",
                  padding: "5px 10px",
                  margin: "10px",
                }}
              >
                FULFILLED
              </p>
            ) : (
              <p
                style={{
                  backgroundColor: "#BF616A",
                  color: "white",
                  padding: "5px 10px",
                  margin: "10px",
                }}
              >
                CANCELLED
              </p>
            )}
          </div>
        </div>
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}
          >
            <ButtonS type="secondary" style={{ margin: "10px" }}>
              Export Invoice
            </ButtonS>
            <Link to={`/orders/${orders._id}/edit`}>
              <ButtonS type="primary" style={{ margin: "10px" }}>
                Edit Order
              </ButtonS>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;