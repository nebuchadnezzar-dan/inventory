import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, ButtonGroup, Spinner, Form } from "react-bootstrap";
import _ from "lodash";
import axios from "../../config/axios";
import { confirmAlert } from 'react-confirm-alert'

import 'react-confirm-alert/src/react-confirm-alert.css'

import ProductForm from './ProductForm'
import DynamicTable from '../Table/DynamicTable'
import ModalDisplay from '../ModalDisplay'

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderItems: _.mapKeys(props.orderItems, orderItem => orderItem.id),
      products: props.products,
      id: props.id,
      loading: false,
      edit: false,
      editId: -1,
      editQuantity: 0,
      show: false,
      message: '',
      responseHead: ''
    };
  }
  
  deleteOrderItem = async orderItemId => {
    // console.log(orderItemId)
    // console.log(axios)
    // try {
    //   this.setState({loading: true})
    //   // let response = await axios.get('http://dummy.restapiexample.com/api/v1/employees')
    //   let response = await fetch(`http://localhost:3000/orders/${this.state.id}/order_items/${orderItemId}`, {
    //     method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
    //     mode: 'cors', // no-cors, *cors, same-origin
    //     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    //     credentials: 'same-origin', // include, *same-origin, omit
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Accept': 'application/json',
    //       'X-CSRF-TOKEN': document.querySelector('[name="csrf-token"]').content
    //     },
    //     redirect: 'follow', // manual, *follow, error
    //     referrerPolicy: 'no-referrer', // no-referrer, *client
    //     // body: JSON.stringify(data) // body data type must match "Content-Type" header
    //   })
    //   const data = await response.json()
    //   this.setState(({ orderItems }) => ({
    //     orderItems: _.omitBy(
    //       orderItems,
    //       orderItem => orderItem.id === data.id
    //     ),
    //     message: "Successfully deleted order item.",
    //     variant: "danger",
    //     loading: false,
    //     show: true,
    //     responseHead: 'success'
    //   }));
    //   console.log(data)
    // }catch(error) {
    //   this.setState({loading:false, show:true, message: error.message, responseHead: 'error'})
    // }

    // return

    try {
      this.setState({loading: true})
      let {data, status} = await axios.delete(`/orders/${this.state.id}/order_items/${orderItemId}`);
      if (status === 200) {
        this.setState(({ orderItems }) => ({
          orderItems: _.omitBy(
            orderItems,
            orderItem => orderItem.id === data.id
          ),
          message: "Successfully deleted order item.",
          variant: "danger",
          loading: false,
          show: true,
          responseHead: 'success'
        }));
      }
    } catch (error) {
      console.log('[error]', error)
      this.setState({loading:false, show:true, message: error.message, responseHead: 'error'})
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
        // console.log(this.state.orderItems, {[data.order_items.id]: data.order_items})
        // return null
        // const newData = _.keyBy(data.order_items, 'id')
        this.setState(({ orderItems }) => ({
          orderItems: {...orderItems, [data.order_items.id]: data.order_items },
          message: "Successfully created order item.",
          variant: "success",
          loading: false,
          show: true,
          responseHead: 'success'
        }));
      }
    } catch (error) {
      this.setState({loading:false, show:true, message: error.message, responseHead: 'error'})
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
        // const newData = _.keyBy(data.order_items, 'id')
        this.setState(({ orderItems }) => ({
          orderItems: {...orderItems, [data.order_items.id]: data.order_items },
          loading: false,
          edit: false,
          show: true,
          responseHead: 'success',
          message: "Successfully updated order item.",
        }));
      }
    } catch (error) {
      this.setState({loading:false, show:true, message: error.message, responseHead: 'error'})
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
        <Button variant="danger" size="sm"  onClick={this.editHandler.bind(null, false, '')}>&#10006;</Button>
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
        <Button variant="primary" size="sm" id={`order--${id}_edit`} onClick={this.editHandler.bind(null, true, id, qty)}>&#9998;</Button>
        <Button
          variant="danger"
          size="sm"
          onClick={this.onConfirm.bind(null, id)}
          id={`order--${id}_delete`}
        >
          &#128465;
        </Button>
      </ButtonGroup>
    )
  )

  handleClose = () => this.setState({show:false})

  render() {

    const tableBody = _.map(
      this.state.orderItems,
        orderItem => orderItem.id && (
            <tr id={`order--${orderItem.id}`} key={orderItem.id}>
              <th scope="row">{orderItem.product.sku}</th>
              <td id={`order--${orderItem.id}_product_name`} >{orderItem.product.name}</td>
              <td id={`order--${orderItem.id}_quantity`} >{(this.state.edit && orderItem.id === this.state.editId) ? <Form.Control type="number" value={this.state.editQuantity} onChange={e=>this.setState({editQuantity: e.target.value})} /> : orderItem.quantity}</td>
              <td id={`order--${orderItem.id}_actions`}>{this.buttonHandler(orderItem.id, orderItem.quantity, orderItem.product.id)}</td>
            </tr>
          )
        )

    const table = (
      <DynamicTable headers={['SKU', 'Product Name', 'Quantity', 'Actions']} hover={true} variant="light" size="sm" headerColor="bg-danger">
        {this.state.loading ? <tr><td><Spinner animation="border" /></td></tr> : tableBody}
      </DynamicTable>)

    const modal = <ModalDisplay show={this.state.show} onHide={this.handleClose} responseHead={this.state.responseHead} message={this.state.message} />
      console.log('[props]', this.props)
      console.log('[count]', window.pendingRequestCount)
    return (
      <>
        <ProductForm products={this.props.products} submitForm={this.createOrderItem} />
        <h4>List of Order Items</h4>
        <hr/>
        {table}
        {modal}
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
  loading: PropTypes.bool,
  editId: PropTypes.bool,
  editQuantity: PropTypes.number,
  show: PropTypes.bool,
  message: PropTypes.string,
  responseHead: PropTypes.string

};
export default Order;
