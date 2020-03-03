import React, { Component } from "react";
import PropTypes from "prop-types";
import { Table, Button, ButtonGroup, Form, InputGroup, FormControl, Col, Spinner } from "react-bootstrap";
import _ from "lodash";
import axios from "../config/axios";
import { confirmAlert } from 'react-confirm-alert'

import 'react-confirm-alert/src/react-confirm-alert.css'

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderItems: _.mapKeys(props.orderItems, orderItem => orderItem.id),
      products: props.products,
      id: props.id,
      quantity: 1,
      productId: 1,
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

  createOrderItem = async e => {
    e.preventDefault();
    try {
      this.setState({loading: true})
      let { data, status } = await axios.post(
        `/orders/${this.props.id}/order_items`,
        {
          order_item: {
            product_id: this.state.productId,
            quantity: this.state.quantity
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

    const form = (
      <Form onSubmit={this.createOrderItem}>
        <Form.Row>
          <Form.Group as={Col}  md="4">
            <Form.Label className="sr-only">Product</Form.Label>
              <Form.Control as="select" value={this.state.productId} onChange={e =>{ this.setState({productId: e.target.value })}}>
                {this.state.products.map(product => <option key={product.id} value={product.id}>{product.name}</option>)}
              </Form.Control>
          </Form.Group>

          <Form.Group as={Col} md="4">
            <Form.Label className="sr-only">Quantity</Form.Label>
            <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="inputGroup-sizing-default">Qty</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              type="number"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              value={this.state.quantity}
              onChange={e => {this.setState({quantity: e.target.value})}}
            />
          </InputGroup>
          </Form.Group>

          <Form.Group as={Col}  md="4">
            <Button variant="success" type="submit">
              Save Item
            </Button>
          </Form.Group>
        </Form.Row>
      </Form>)
    return (
      <>
        {form}
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
  ),
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    })
  )
};
export default Order;
