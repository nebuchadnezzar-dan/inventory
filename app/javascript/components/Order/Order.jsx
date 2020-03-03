import React, { Component } from "react";
import PropTypes from "prop-types";
import { Table, Button, ButtonGroup, Spinner } from "react-bootstrap";
import _ from "lodash";
import axios from "../../config/axios";
import { confirmAlert } from 'react-confirm-alert'

import 'react-confirm-alert/src/react-confirm-alert.css'

import ProductForm from './ProductForm'

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderItems: _.mapKeys(props.orderItems, orderItem => orderItem.id),
      products: props.products,
      id: props.id,
      loading: false
    };
  }
  
  deleteOrderItem = async orderItemId => {
    try {
      this.setState({loading: true})
      let { data, status } = await axios.delete(`/orders/${this.state.id}/order_items/${orderItemId}`);
      if (status === 200) {
        this.setState(({ orderItems }) => ({
          orderItems: _.omitBy(
            orderItems,
            orderItem => orderItem.id === data.id
          ),
          message: "Successfully deleted order item.",
          variant: "danger",
          loading: false
        }));
      }
    } catch (error) {
      alert("Can't delete item.");
    }
  }

  createOrderItem = async (quantity, productId, e) => {
    e.preventDefault();
    // console.log(quantity, productId)
    // return null
    try {
      this.setState({loading: true})
      let { data, status } = await axios.post(
        `/orders/${this.props.id}/order_items`,
        {
          order_item: {
            product_id: +productId,
            quantity: quantity
          }
        }
      );
      if (status === 200) {
        const newData = _.keyBy(data.order_items, 'id')
        this.setState(({ orderItems }) => ({
          orderItems: {...orderItems, ...newData },
          message: "Successfully created order item.",
          variant: "success",
          loading: false
        }));
      }
    } catch (error) {
      alert("Can't create order item.");
    }
  };

  onConfirm = (toBePassed) => {
    confirmAlert({
      title: 'Confirm to delte',
      message: 'Are you sure you want to do this?',
      buttons: [
        {
          label: 'Yes',
          onClick: this.deleteOrderItem.bind(null, toBePassed)
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    })
  }


  render() {
    const tableBody = _.map(
      this.state.orderItems,
        orderItem => orderItem.id && (
            <tr key={orderItem.id}>
              <th scope="row">{orderItem.product.sku}</th>
              <td>{orderItem.product.name}</td>
              <td>{orderItem.quantity}</td>
              <td>
                <ButtonGroup>
                  <Button variant="primary">&#9998;</Button>
                  <Button
                    variant="danger"
                    onClick={this.onConfirm.bind(null, orderItem.id)}
                  >
                    &#128465;
                  </Button>
                </ButtonGroup>
              </td>
            </tr>
          )
        )

    const table = (
      <Table hover variant="light" size="sm">
        <thead className="text-white">
          <tr className="bg-danger">
            <th>SKU</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.state.loading ? <tr><td><Spinner animation="border" /></td></tr> : tableBody}
        </tbody>
      </Table>
    )

    return (
      <>
        <ProductForm products={this.props.products} submitForm={this.createOrderItem} />
        <h4>List of Order Items</h4>
        <hr/>
        {table}
      </>
    )
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
