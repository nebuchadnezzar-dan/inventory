import React, { Component } from "react";
import PropTypes from "prop-types";
import { Table, Button, ButtonGroup, Spinner, Form } from "react-bootstrap";
import _ from "lodash";
import axios from "../../config/axios";
import { confirmAlert } from 'react-confirm-alert'

import 'react-confirm-alert/src/react-confirm-alert.css'

import ProductForm from './ProductForm'
import DynamicTable from '../Table/DynamicTable'

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderItems: _.mapKeys(props.orderItems, orderItem => orderItem.id),
      products: props.products,
      id: props.id,
      loading: false,
      edit: false,
      editId: '',
      editQuantity: 0
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

  editProductItem = async (orderItemId, productId) => {
    try {
      this.setState({loading: true})
      let { data, status } = await axios.put(
        `/orders/${this.props.id}/order_items/${orderItemId}`,
        {
          order_item: {
            product_id: +productId,
            quantity: +this.state.editQuantity
          }
        }
      );
      if (status === 200) {
        const newData = _.keyBy(data.order_items, 'id')
        this.setState(({ orderItems }) => ({
          orderItems: {...orderItems, ...newData },
          loading: false,
          edit: false
        }));
      }
    } catch (error) {
      alert("Can't edit order item.");
    }
  }

  onConfirm = (toBePassed) => {
    confirmAlert({
      title: 'Confirm to delete',
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

  editHandler = (bool, id, qty) => this.setState({edit: bool, editId: id, editQuantity: qty})

  buttonHandler = (id, qty, productId) => (
    (this.state.edit && +this.state.editId === +id ) ? (
      <ButtonGroup>
        <Button variant="danger" size="sm" onClick={this.editHandler.bind(null, false, '')}>&#10006;</Button>
        <Button
          variant="success"
          size="sm"
          onClick={this.editProductItem.bind(null, id, productId)}
        >
          &#10004;
        </Button>
      </ButtonGroup>
    ) : (
      <ButtonGroup>
        <Button variant="primary" size="sm" onClick={this.editHandler.bind(null, true, id, qty)}>&#9998;</Button>
        <Button
          variant="danger"
          size="sm"
          onClick={this.onConfirm.bind(null, id)}
        >
          &#128465;
        </Button>
      </ButtonGroup>
    )
  )

  render() {

    const tableBody = _.map(
      this.state.orderItems,
        orderItem => orderItem.id && (
            <tr key={orderItem.id}>
              <th scope="row">{orderItem.product.sku}</th>
              <td>{orderItem.product.name}</td>
              <td>{(this.state.edit && orderItem.id === this.state.editId) ? <Form.Control type="number" value={this.state.editQuantity} onChange={e=>this.setState({editQuantity: e.target.value})} /> : orderItem.quantity}</td>
              <td>{this.buttonHandler(orderItem.id, orderItem.quantity, orderItem.product.id)}</td>
            </tr>
          )
        )

    const table = (
      <DynamicTable headers={['SKU', 'Product Name', 'Quantity', 'Actions']} hover={true} variant="light" size="sm" headerColor="bg-danger">
        {this.state.loading ? <tr><td><Spinner animation="border" /></td></tr> : tableBody}
      </DynamicTable>)

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
