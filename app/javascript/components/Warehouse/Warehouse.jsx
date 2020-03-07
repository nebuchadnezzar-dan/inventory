import React, {Component} from 'react'
import _ from 'lodash'
import axios from '../../config/axios'
import { FormControl, InputGroup, Button, Spinner } from 'react-bootstrap'
import PropTypes from 'prop-types'

import DynamicTable from '../Table/DynamicTable'
import Search from './Search'
import ModalDisplay from '../ModalDisplay'

const mergeObject = (arr1, arr2) => _.mapKeys(_([...arr1, ...arr2]).groupBy('id').map((g) => _.mergeWith({}, ...g, (obj, src) => _.isArray(obj) ? obj.concat(src) : undefined)).value(), item => item.id)

class Warehouse extends Component {
  constructor(props){
    super(props)
    this.state = {
      products: mergeObject(this.props.products, this.props.counts) ,
      search:'',
      loading: false,
      add: false,
      addId: -1,
      count: 1,
      show: false,
      responseHead: '',
      message: ''
    }
  }

  searchHandler = async e => {
    try {
      this.setState({loading: true, search: e.target.value})
      let { data, status } = await axios.get(
        `/warehouses/${this.props.id}/search?search=${e.target.value}`
      );
      if (status === 200) {
        const newData = mergeObject(data.products, data.counts)
        this.setState({
          products: newData,
          variant: "success",
          loading: false,
        });
      }
    } catch (error) {
      console.log(error)
      this.setState({loading:false, show:true, message: error.message, responseHead: 'error'})
    }
  }

  addStock = async productId => {
    try {
      this.setState({loading: true})
      let { data, status } = await axios.post(
        `/warehouses/${this.props.id}/stocks`,
        {
          stock: {
            product_id: +productId,
            warehouse_id: this.props.id,
            count: this.state.count
          }
        }
      );
      if (status === 200) {
        // console.log(data)
        // return null
        // const newData = { ...data.product, count: data.count }
        this.setState(({ products }) => ({
          products: {...products, [data.product.id]: data.product },
          message: "Successfully created order item.",
          variant: "success",
          loading: false,
          show: true,
          add: false,
          responseHead: 'success'
        }));
      }
    } catch (error) {
      console.log(error)
      this.setState({loading:false, show:true, message: error.message, responseHead: 'error'})
    }
  };

  buttonToggler = (bool, id) => this.setState({ add: bool, addId: id })

  handleClose = () => this.setState({show:false})


  render(){
    const tableBody = _.map(this.state.products, product => (
      <tr key={product.id}>
        <td>{product.name}</td>
        <td>{product.count}</td>
        <td>
          { this.state.add && this.state.addId === product.id ? (
            <InputGroup size="sm" className="mb-3">
              <FormControl
                type="number"
                placeholder="0"
                aria-describedby="basic-addon2"
                value={this.state.count}
                onChange={e=>this.setState({count:e.target.value})}
              />
              <InputGroup.Append>
                <Button variant="success" onClick={this.addStock.bind(null, product.id)} >&#x002B;</Button>
                <Button variant="danger" onClick={this.buttonToggler.bind(null, false, product.id)}>&#10006;</Button>
              </InputGroup.Append>
            </InputGroup>) :
          ( <Button variant="primary" size="sm" onClick={this.buttonToggler.bind(null, true, product.id)}>	&#x002B; Add Stock</Button> )}        
        </td>
      </tr>
    ))

    const search = <Search search={this.state.search} onChange={this.searchHandler} /> 
    const modal = <ModalDisplay show={this.state.show} onHide={this.handleClose} responseHead={this.state.responseHead} message={this.state.message} />

   return (
    <>
      {search}
      {modal}
      <h4>List of Products</h4>
      <hr/>
      <DynamicTable headers={['Product', 'Quantity', 'Actions']} hover={true} variant="light" size="sm" headerColor="bg-primary">
        {this.state.loading ? <tr><td><Spinner animation="border" /></td></tr> : tableBody}
      </DynamicTable>
    </>)
  }
}

Warehouse.propTypes = {
  id: PropTypes.number,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    })
  ),
  count: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      count: PropTypes.number
    })
  ),
  loading: PropTypes.bool,
  search: PropTypes.string,
  addId: PropTypes.number,
  count: PropTypes.number
}

export default Warehouse