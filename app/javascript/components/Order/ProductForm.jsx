import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, InputGroup, FormControl, Col, Button } from 'react-bootstrap'

class ProductForm extends Component {

  constructor(props) {
    super(props)

    this.state = {
      products: props.products,
      quantity: 1,
      productId: 1,
    }
  }


  render() {
    return (
      <Form onSubmit={this.props.submitForm.bind(this, this.state.quantity, this.state.productId)}>
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
      </Form>
    )
  }

}

ProductForm.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    })
  ),
  quantity: PropTypes.number,
  submitForm: PropTypes.func,
  quantity: PropTypes.number,
  productId: PropTypes.number,
}

export default ProductForm