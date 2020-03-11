import React from 'react'
import { InputGroup, FormControl } from 'react-bootstrap'
import { FaSearch } from 'react-icons/fa'
import PropTypes from 'prop-types'

const search = props => {

  const {search, onChange} = props

  return (
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
            value={search}
            onChange={onChange}
          />
        </InputGroup>
      </div>
    </div>
  )

}

search.propTypes = {
  search: PropTypes.string,
  onChange: PropTypes.func
}

export default search