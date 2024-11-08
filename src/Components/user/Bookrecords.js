import React, { Component } from 'react';
import axios from "axios";
import { Route , withRouter} from 'react-router-dom';
import Moment from 'moment';

 class Bookrecords extends Component {
    constructor(props) {
        super(props);
      
      this.state = { 
        records: [],
        };
       
      };
      
    
      componentDidMount() {
        axios
          .get("http://localhost:5000/books/")
          .then(response => {
            this.setState({ records: response.data });
            
          })
          .catch(error => {
            
          });
      }
    
    
      handleOnClick= async (number) => {
         ;

      }
    
        render() {
            return (
         <div>
       <div className = "container mt-5">
       {this.state.bookrecords.length === 0 ? (
      <h3 style = {{color: "#3b2341"}} className='mt-3'>No Issued Books</h3> 
      ):(
        <div>
         <form method="POST" action="#" class="mt-5">
           <div class="row mt-5">
             <div class="col-md-8 mt-1" style={{ margin: "0 auto" }}>
               <input
                 className="form-control"
                 name="search"
                 type="text"
                 placeholder="Find the Book"
                
               />
               <span>
                 <i
                   class="fa fa-search form-control-feedback"
                   style={{
                     position: "relative",
                     top: "-30px",
                     right: "44px",
                     float: "right",
                     fontSize: "21px",
                     fontWeight: "400",
                     color: "#585555" 
                     // transform: "translateY(-50%)"
                   }}
                 ></i> 
                 </span>
                 </div>
                 </div>
                 </form>
                
    
    <table className="table" style = {{marginTop:"56px",cursor: "pointer"}}>
    <caption>List of users</caption>
              <thead className="thead-light">
                <tr >
                  <th>Book No</th>
                  <th>Name</th>
                  <th>Author</th>
                  <th>Subject</th>
                  <th>Last Date</th>
                  <th>Facility</th>
                  <th>Actions</th>
                </tr>
              </thead>
    <tbody>
    {this.state.records.map(record => {
      return (
    <tr onClick = {() => this.handleOnClick(record._id)}>
    <td >{record.bookid}</td>
    <td>{record.name}</td>
    <td>{record.author}</td>
    <td>{record.subject}</td>
    <td>{Moment(record.date).format('DD MMM YYYY')}</td>
    
    <td>{record.status}</td>
    <td><button onClick = {() => this.handleOnClick(record._id)}>Request</button></td>
    </tr>
      )
    })}
    </tbody>
    </table>
    </div>
 )} 
     </div>
     </div>
            )
        }
    }
    
    export default withRouter(Bookrecords)