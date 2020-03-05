import React, {Component} from 'react'
import _ from 'lodash'

import DynamicTable from '../Table/DynamicTable'

class Warehouse extends Component {
  constructor(props){
    super(props)
    this.state = {
      products: _([...this.props.products, ...this.props.counts]).groupBy('id').map((g) => _.mergeWith({}, ...g, (obj, src) => _.isArray(obj) ? obj.concat(src) : undefined)).value()
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
   return (
    <>
      <DynamicTable headers={['Product', 'Quantity', 'Actions']} hover={true} variant="light" size="sm" headerColor="bg-primary">
        {tableBody}
      </DynamicTable>
    </>)
  }
}

export default Warehouse