import React, { useState } from 'react'
import Button from './Button'

const HelloWorld = () => {
  const [show, setShow] = useState(true)
  const [greeting, setGreeting] = useState("Hello World!")

  // return show && <h1>Hello World</h1>
  return (
    <>
      <Button onClick = {() => setShow(!show)} color='danger'>Toggle the greeting</Button>
        {show && <h1>{greeting}</h1>}
      <input onChange={(e)=> setGreeting(e.target.value)} className="form-control" value={greeting}/>
    </>
  )

}

// class HelloWorld extends React.Component {
//   render = () => <h1>Hello World</h1>
// }

export default HelloWorld