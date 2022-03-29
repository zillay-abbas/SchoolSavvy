import React from 'react'
import { Button, Form, Row, Col, Table } from "react-bootstrap";

import "./TeacherSchedule.css"

const TeacherSchedule = () => {
  return (
    <div className="container ">
    <Form >
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Teacher Id</Form.Label>
          <Form.Control
            
            required
            type="text"
            placeholder="Search ..."

          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        
      </Row> 
      <Button type="submit">Search</Button>
    </Form>
    <p className= 'teacher-name text-center col-12' >Teacher Name</p>
    <p className= 'table-lable ' >Detail </p>
    <Table class="table mt-6 border:1" bordered hover>
  <thead >
    <tr>
      <th scope="col">Day</th>
      <th scope="col">Class</th>
      <th scope="col">Class Section</th>
      <th scope="col">Class Time</th>
      <th scope="col">Classroom Link</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Class one</td>
      <td>B</td>
      <td>9:50 to 10:50</td>
      <td>       
      <Button type="submit" className='a_LinkHeight'>Create Class</Button>
      <Button type="submit" className='a_LinkHeight'>Join Class</Button>

      </td>

    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Class one</td>
      <td>B</td>
      <td>9:50 to 10:50</td>
      <td>       
      <Button type="submit" className='a_LinkHeight'>Create Class</Button>
      <Button type="submit" className='a_LinkHeight'>Join Class</Button>

      </td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Class one</td>
      <td>B</td>
      <td>9:50 to 10:50</td>
      <td>       
      <Button type="submit" className='a_LinkHeight'>Create Class</Button>
      <Button type="submit" className='a_LinkHeight'>Join Class</Button>

      </td>
    </tr>
    <tr>
      <th scope="row">4</th>
      <td>Class one</td>
      <td>B</td>
      <td>9:50 to 10:50</td>
      <td>       
      <Button type="submit" className='a_LinkHeight'>Create Class</Button>
      <Button type="submit" className='a_LinkHeight'>Join Class</Button>

      </td>
    </tr>
    <tr>
      <th scope="row">5</th>
      <td>Class one</td>
      <td>B</td>
      <td>9:50 to 10:50</td>
      <td>       
      <Button type="submit" className='a_LinkHeight'>Create Class</Button>
      <Button type="submit" className='a_LinkHeight'>Join Class</Button>

      </td>
    </tr>
    <tr>
      <th scope="row">6</th>
      <td>Class one</td>
      <td>B</td>
      <td>9:50 to 10:50</td>
      <td>       
      <Button type="submit" className='a_LinkHeight'>Create Class</Button>
      <Button type="submit" className='a_LinkHeight'>Join Class</Button>

      </td>
    </tr>
  </tbody>
</Table>
    </div>
  )
}

export default TeacherSchedule