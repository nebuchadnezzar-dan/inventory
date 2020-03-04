import React, {Component} from 'react'
import _ from 'lodash'

import DynamicTable from '../Table/DynamicTable'

class Warehouse extends Component {
  constructor(props){
    super(props)
  }
  render(){
    const data = [...this.props.products, ...this.props.counts]
    const mapped = _(data).groupBy('id').map((g) => _.mergeWith({}, ...g, (obj, src) => _.isArray(obj) ? obj.concat(src) : undefined)).value();
    console.log(mapped)
   return (
    <>
      <DynamicTable headers={['Product', 'Quantity', 'Actions']} hover={true} varaint="light" size="sm" headerColor="bg-primary">
        <tr>
          <td>A</td>
          <td>B</td>
          <td>C</td>
        </tr>
      </DynamicTable>
    </>)
  }
}

export default Warehouse