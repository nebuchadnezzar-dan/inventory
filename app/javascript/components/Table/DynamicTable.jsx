import React from 'react'
import { Table } from 'react-bootstrap'

const DynamicTable = (props) => {
  const {headers, body, hover, bordered, striped, size, variant, headerColor, children} = props
  return (
    <Table hover={hover} variant={variant} size={size}>
      <thead className="text-white">
        <tr className={headerColor}>
          {headers.map(head => <th key={head}>{head}</th>)}
        </tr>
      </thead>
      <tbody>
        {children}
      </tbody>
    </Table>
  )


}

export default DynamicTable