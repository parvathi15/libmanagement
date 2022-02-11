import React, { Component } from 'react';
import axios from "axios";
import { confirmAlert } from 'react-confirm-alert';
import { Route , withRouter} from 'react-router-dom';

import Moment from 'moment';
import { Link } from "react-router-dom";


class HomePage extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
      this.state = { 
        exercises: [],
        bookid:"",
        atoken: window.localStorage.getItem("MyUser"),
        user:"",
        fine:0,
        status:"reading",
        returnstatus:"false",
        message:"",
        show:false,
        display:"none",
        issue_date: new Date(),
        due_date:new Date(),
        bookrecord:[],
        data1:"",
        data2:"",
        result: "",
        };
        this.timerId = null;
      };

      

      // resetMessage()=> {
      //   this.timerId = setTimeout(() => {
      //     this.setState({
      //       message: ""
      //     });
      //     this.timerId = null;
      //   }, 2000);
      // }

      vanishMessage() {
          this.timerId = setTimeout(() => {
          this.setState({
            message: "",
            display:"none"
          });
          this.timerId = null;
        }, 1000); 
      }


      componentDidMount=() => {
 const username = this.props.location.state.user.username;
          if (username && username === "undefined") {            
            this.props.history.push({
              pathname: '/' 
            }); 
        }   
        // const fine=this.props.location.state.user.fine;
        this.setState({
          fine:this.props.location.state.user.fine
        })
        const token = JSON.parse(this.state.atoken);
        console.log(token.username);
        this.setState({ 
            user: token.username
        });
        axios
          .get("http://localhost:2500/books/sachu")
          .then(response => {
            this.setState({ exercises: response.data });
            console.log(this.state.exercises);
          })
          .catch(error => {
            console.log(error);
          });
 }


  close=()=>{
        console.log(this.state.show);
        if (!this.state.show) {
        this.setState({ display: "none" });
        }
      }


      handleOnClick= async (number) => {
        console.log(this.state.exercises.count)
        this.setState({ display: "block" });
        const username = this.props.location.state.user.username;
        console.log(username);
    const url = `http://localhost:2500/books/`+number;
            const api_call = await fetch(url);
            const data = await api_call.json();
            console.log(data);
                 const bookrecord = {
                bookid: data.bookid,
                title: data.title,
                subject:data.subject,
                author:data.author,
                date: data.createdAt,
                user:this.props.location.state.user.username,
                status: this.state.status,
                copies: data.copies,
                returnstatus:this.state.returnstatus,
                issue_date:this.state.issue_date,
                due_date:this.state.due_date
              };
              // console.log(bookrecord)
           if(this.state.bookrecord.length <= 2 ) {
            axios
            .post("http://localhost:2500/requests/add", bookrecord)
            .then(res => 
            this.setState({ message: res.data.message }),
            this.setState({ bookrecord: [...this.state.bookrecord, bookrecord] }),
            console.log(this.state.bookrecord.length)
            ).catch(err=>{
              this.setState({ message: err })
            })
          } else {
            this.setState({ message: "Your request for books has exceeded the limit" })
          }
            this.vanishMessage()
        }

      //   window.addEventListener('beforeunload', (event) => {
      //     if (!(window.confirm("DO YOU really want to exit a fun page like this?"))) {
      //         event.preventDefault();
      //     }
      // });
   
    render() {
         // className={this.state.fine > 0 ? 'disabled':'active'}
      //  window.history.pushState(null, null, '/homepage');
        return (
      <div>
       {this.state.message === "Your request is Successful" ?(
        <p className = "alert-success" style={{ display: this.state.display }}>{this.state.message}</p> 
       ):(
        <p className = "notifymsg" style={{ display: this.state.display }}>{this.state.message}</p>
       )}
      <div className = "container mt-5">
     {this.state.fine > 0 ? (
       <div class="alert alert-warning" role="alert" style={{ display: "block" }}>
         <a class="panel-close close"  onClick = {this.close} data-dismiss="alert">×</a> 
       A fine of {this.state.fine}rs has been issued for keeping book above due date.
     </div>
  //  <div class="alert alert-info alert-dismissable">
  //         <a class="panel-close close" data-dismiss="alert">×</a> 
  //         This is an <strong>{this.state.fine}</strong>. Use this to show important messages to the user.
  //       </div>
     ):(
      <p></p>
     )}
   <form method="POST" action="#" class="mt-5">
       <div class="row mt-5">
         <div class="col-md-8 mt-1" style={{ margin: "0 auto" }}>
           <input
             className="search"
             name="search"
             type="text"
             placeholder="Find the Book"
            
           />
           <span>
             <i
               class="fa fa-search form-control-feedback"
               style={{
                 position: "relative",
                 top: "-44px",
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
              <th>Copies</th>
              <th>Published Date</th>
              <th>Actions</th>
            </tr>
          </thead>
<tbody>
{this.state.exercises.map(book => {
  return (
<tr>
<td >{book.bookid}</td>
<td>{book.title}</td>
<td>{book.author}</td>
<td>{book.subject}</td>
{book.count < 0 ? (
<td>0</td>
):(
<td>{book.count}
</td>
)}
<td>{Moment(book.createdAt).format('DD MMM YYYY')}</td>
{/* <Link to={"/viewbook/" + book._id}>View</Link>  */}
<td style = {{color: "#3b2341",fontWeight:"600"}}
        onClick={() => {
          const confirmBox = window.confirm(
            "Do you really want to send request"
          )
          if (confirmBox === true) {
            this.handleOnClick(book._id)}
          }
        }
      >
       Request Book
       </td>
</tr>
  )
})}
</tbody>
</table>
 </div>
 </div>
        )
    }
}

export default withRouter(HomePage)

    // window.addEventListener('popstate', (event) => {
        //   alert("You message");
        // });
        // const { match } = this.props;
        // if(match.url === "/homepage"){
        //   window.history.pushState(null, document.title, window.location.href);
        //   window.addEventListener('popstate', function (event){
        //      window.history.pushState(null, document.title,  window.location.href);
        //   });
        // }      
        // window.addEventListener("popstate", () => {
        //   this.props.history.go(1);
        // });