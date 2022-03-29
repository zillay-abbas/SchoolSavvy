import React from 'react'
import { Button, Table } from "react-bootstrap";

import "./StudentSchedule.css"

const StudentSchedule = () => {
  return (
    <div className="container">
    <Table class="table mt-6 border:1"  bordered hover>
  <thead >
    <tr>
      <th scope="col">Day</th>
      <th scope="col">Teacher Name</th>
      <th scope="col">Subject</th>
      <th scope="col">Class Time</th>
      <th scope="col">Classroom Link</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Zillay</td>
      <td>Programming Fundamental</td>
      <td>9:50 to 10:50</td>
      <td>
      <Button type="submit" className='a_LinkHeight'>Join Class</Button>
      </td>

    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Class one</td>
      <td>B</td>
      <td>9:50 to 10:50</td>
      <td>
      <Button type="submit" className='a_LinkHeight'>Join Class</Button>
      </td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Class one</td>
      <td>B</td>
      <td>9:50 to 10:50</td>
      <td>
      <Button type="submit" className='a_LinkHeight'>Join Class</Button>
      </td>
    </tr>
    <tr>
      <th scope="row">4</th>
      <td>Class one</td>
      <td>B</td>
      <td>9:50 to 10:50</td>
      <td>
      <Button type="submit" className='a_LinkHeight'>Join Class</Button>
      </td>
    </tr>
    <tr>
      <th scope="row">5</th>
      <td>Class one</td>
      <td>B</td>
      <td>9:50 to 10:50</td>
      <td>
      <Button type="submit" className='a_LinkHeight'>Join Class</Button>
      </td>
    </tr>
    <tr>
      <th scope="row">6</th>
      <td>Class one</td>
      <td>B</td>
      <td>9:50 to 10:50</td>
      <td>
      <Button type="submit" className='a_LinkHeight'>Join Class</Button>
      </td>
    </tr>
  </tbody>
</Table>
    </div>
  )
}

export default StudentSchedule