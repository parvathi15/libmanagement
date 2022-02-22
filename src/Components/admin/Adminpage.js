import React, { Component } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import booklist from "../img/booklist.png";
import member from "../img/member.png";
import drinka from "../img/drinka.png";
import requestbook from "../img/requestbook.png";
import users from "../img/users.png";
import addbook from "../img/addbook.png";


export default class Adminpage extends Component {
  constructor(props) {
    super(props);
    
  this.state = { 
   users:[]
    };
  };

  componentDidMount() {
    axios
      .get("https://library-api123.herokuapp.com/members/")
      .then(response => {
        this.setState({ users: response.data });
       
      })
      .catch(error => {
        
      });
  }
    render() {
      const total = this.state.users.length

        return (
    
          <div className="container mt-5">
            <div class="row">
            <div class="col-md-4">
            <div class="quiz-topic">
            <div className='img-corner'>
            <img src={users} alt="" className="mt-5" width = "80px" height = "80px" />
            </div>
            <p>
            <a href= "#" className = "ml-5" style = {{ marginRight: "25px"}}>{total} Users</a>
            </p>
            </div>
            </div>
            <div class="col-md-4">
            <div class="quiz-topic">
              <div className='img-corner'>
            <img src={member} alt="" className="mt-5" width = "80px" height = "80px" />
            </div>
            <p>
            <Link to= {{
              pathname:'/userreqs',
            }}>
            Member Requests
            </Link>
            </p>
            </div>
            </div>
            <div class="col-md-4">
            <div class="quiz-topic">
            <div className='img-corner'>
            <img src={requestbook} alt="" className="mt-5" width = "80px" height = "80px" />
            </div>
            <p>
            <Link className = "ml-5" style = {{ marginLeft: "12px"}} to= {{
              pathname:'/records',
            }}>
            Book Requests
            </Link>
            </p>
            </div>
            </div>
            </div>
            <div class="row">
            <div class="col-md-4">
            <div class="quiz-topic">
            <div className='img-corner'>
            <img src={addbook} alt="" className="mt-5" width = "80px" height = "80px" />
            </div>
            <p>
            <Link className = "ml-5" style = {{ marginLeft: "12px"}} to= {{
              pathname:'/addbook',
            }}>
             Add Book 
            </Link>
            </p>
            </div>
            </div>
            <div class="col-md-4">
            <div class="quiz-topic">
            <div className='img-corner'>
            <img src={drinka} alt="" className="mt-5" width = "80px" height = "80px" />
            </div>
            <p>
            <Link className = "ml-5" style = {{ marginLeft: "12px"}} to= {{
              pathname:'/return',
            }}>
            Issued Books
            </Link>
            </p>
            </div>
            </div>
            <div class="col-md-4">
            <div class="quiz-topic">
            <div className='img-corner'>
            <img src={booklist} alt="" className="mt-5" width = "80px" height = "80px" />
            </div>
            <p>
            <Link className = "ml-5" style = {{ marginLeft: "12px"}} to= {{
              pathname:'/list',
            }}>
            List of Books
            </Link>
            </p>
            </div>
            </div>
            </div>
         </div>
        )
    }
}
