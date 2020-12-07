import { useState } from "react";
import { List, Avatar, Button, InputNumber } from "antd";
import { ButtonS } from "./styledComponents/antdStyled";

const ProductListItem = ({ product, HandlerAddQuantity }) => {
  const [quantity, setQuantity] = useState(1);
  const onNumberChange = (value) => {
    setQuantity(value);
  };

  return (
    <List.Item
      actions={[
        <InputNumber min={1} value={quantity} onChange={onNumberChange} />,
        <ButtonS
          type="primary"
          onClick={() => HandlerAddQuantity({ ...product, quantity })}
        >
          +
        </ButtonS>,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={product.image} alt={product.name} size="large" />}
        title={product.name}
        description={`$${product.salePrice}`.replace(
          /\B(?=(\d{3})+(?!\d))/g,
          ","
        )}
      />
    </List.Item>
  );
};

export default ProductListItem;
