import React, {Component} from 'react'
import _ from 'lodash'
import axios from '../../config/axios'
import { FormControl, InputGroup, Button, Spinner } from 'react-bootstrap'
import { FaSearch } from 'react-icons/fa'
import PropTypes from 'prop-types'

import DynamicTable from '../Table/DynamicTable'

class Warehouse extends Component {
  constructor(props){
    super(props)
    this.state = {
      products: _([...this.props.products, ...this.props.counts]).groupBy('id').map((g) => _.mergeWith({}, ...g, (obj, src) => _.isArray(obj) ? obj.concat(src) : undefined)).value(),
      search:'',
      loading: false
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

  render(){
    // const data = [...this.props.products, ...this.props.counts]
    // const mapped = _(data).groupBy('id').map((g) => _.mergeWith({}, ...g, (obj, src) => _.isArray(obj) ? obj.concat(src) : undefined)).value();
    // console.log(mapped)
    const tableBody = _.map(this.state.products, product => (
      <tr key={product.id}>
        <td>{product.name}</td>
        <td>{product.count}</td>
        <td>A</td>
      </tr>
    ))

    const search = (
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1"><FaSearch/></InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              type="search"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="basic-addon2"
              value={this.state.search}
              onChange={this.searchHandler}
            />
          </InputGroup>
        </div>
      </div>
    )

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