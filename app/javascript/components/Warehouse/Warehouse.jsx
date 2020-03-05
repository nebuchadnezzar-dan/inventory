import React, {Component} from 'react'
import _ from 'lodash'
import axios from '../../config/axios'
import { FormControl, InputGroup, Button, Spinner } from 'react-bootstrap'
import { FaSearch } from 'react-icons/fa'
import PropTypes from 'prop-types'

import DynamicTable from '../Table/DynamicTable'
import Search from './Search'

class Warehouse extends Component {
  constructor(props){
    super(props)
    this.state = {
      products: _([...this.props.products, ...this.props.counts]).groupBy('id').map((g) => _.mergeWith({}, ...g, (obj, src) => _.isArray(obj) ? obj.concat(src) : undefined)).value(),
      search:'',
      loading: false,
      add: false,
      addId: -1
    }
  }

  searchHandler = async e => {
    try {
      this.setState({loading: true, search: e.target.value})
      let { data, status } = await axios.get(
        `/warehouses/${this.props.id}/search?search=${e.target.value}`
      );
      if (status === 200) {
        console.log(data)
        const newData = _([...data.products, ...data.counts]).groupBy('id').map((g) => _.mergeWith({}, ...g, (obj, src) => _.isArray(obj) ? obj.concat(src) : undefined)).value()
        this.setState({
          products: newData,
          message: "Successfully created order item.",
          variant: "success",
          loading: false,
          show: true,
          responseHead: 'success'
        });
      }
    } catch (error) {
      console.log(error)
      // this.setState({loading:false, show:true, message: error.message, responseHead: 'error'})
    }
  }

  buttonToggler = (bool, id) => this.setState({ add: bool, addId: id })

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
              />
              <InputGroup.Append>
                <Button variant="success">&#x002B;</Button>
                <Button variant="danger" onClick={this.buttonToggler.bind(null, false, product.id)}>&#10006;</Button>
              </InputGroup.Append>
            </InputGroup>) :
          ( <Button variant="primary" size="sm" onClick={this.buttonToggler.bind(null, true, product.id)}>	&#x002B; Add Stock</Button> )}        
        </td>
      </tr>
    ))

    const search = <Search search={this.state.search} onChange={this.searchHandler} /> 

   return (
    <>
      {search}
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
  search: PropTypes.string
}

export default Warehouse