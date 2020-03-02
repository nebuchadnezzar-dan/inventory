import React, { Component } from "react";
import PropTypes from "prop-types";
import { Table, Button, ButtonGroup } from "react-bootstrap";
import _ from "lodash";
import axios from "../config/axios";
class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderItems: props.orderItems
    };
  }
  
  deleteOrderItem = async orderItemId => {
    try {
      let { data, status } = await axios.delete(`/orders/${this.props.id}/order_items/${orderItemId}`);
      if (status === 200) {
        this.setState(({ orderItems }) => ({
          orderItems: _.remove(
            orderItems,
            orderItem => !(orderItem.id === data.id)
          )
        }));
      }
    } catch (error) {
      alert("Can't delete item.");
    }
  }

  render() {
    return (
      <Table striped hover variant="light">
        <thead className="text-white">
          <tr className="bg-danger">
            <th>SKU</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.state.orderItems.map(
            orderItem =>
              orderItem.id && (
                <tr key={orderItem.id}>
                  <td>{orderItem.product.sku}</td>
                  <td>{orderItem.product.name}</td>
                  <td>{orderItem.quantity}</td>
                  <td>
                    <ButtonGroup>
                      <Button variant="primary">&#9998;</Button>
                      <Button
                        variant="danger"
                        onClick={this.deleteOrderItem.bind(null, orderItem.id)}
                      >
                        &#128465;
                      </Button>
                    </ButtonGroup>
                  </td>
                </tr>
              )
          )}
        </tbody>
      </Table>
    );
  }
}
Order.propTypes = {
  id: PropTypes.number,
  orderItems: PropTypes.arrayOf(
    PropTypes.shape({
      quantity: PropTypes.number,
      id: PropTypes.number,
      product: PropTypes.shape({
        name: PropTypes.string,
        sku: PropTypes.string
      })
    })
  )
};
export default Order;
