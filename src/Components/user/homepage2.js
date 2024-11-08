import React, { Component } from 'react';
import axios from "axios";
import { confirmAlert } from 'react-confirm-alert';
import { Route , withRouter} from 'react-router-dom';
import Moment from 'moment';
import { Link } from "react-router-dom";


class HomePage extends Component {
    constructor(props) {
        super(props);
       
      this.state = { 
        availablebooks: [],
        bookid:"",
        atoken: window.localStorage.getItem("MyUser"),
        user:"",
        fine:0,
        status:"Reading",
        returnstatus:"false",
        message:"",
        show:false,
        display:"block",
        issue_date: new Date(),
        due_date:new Date(),
        bookrecord:[],
        books_user:[],
        searchTerm: '',
        books_taken: "",
        };
        this.timerId = null;
      };


      vanishMessage() {
          this.timerId = setTimeout(() => {
          this.setState({
            message: "",
            display:"none"
          });
          this.timerId = null;
        }, 4000); 
      }

      search=e=> {
        this.setState({
            searchTerm: e.target.value
        });
      }


      componentDidMount=() => {
        var myCurrentDate=new Date();
        var myFutureDate=new Date(myCurrentDate);
         myFutureDate.setDate(myFutureDate.getDate()+ 30);
        const dueDate = Moment(myFutureDate).format('MM-DD-YYYY');
       
        this.setState({ 
          due_date: dueDate
      });
 const username = this.props.location.state.user.username;
        this.setState({
          fine:this.props.location.state.user.fine
        })
        const token = JSON.parse(this.state.atoken);
      
        this.setState({ 
            user: token.username
        });
        axios
          .get("http://localhost:5000/books")
          .then(response => {
            console.log(response)
            this.setState({ availablebooks: response.data });
          })
          .catch(error => {
           
          });

          axios
          .get(`http://localhost:5000/requests/user/${username}/Reading`)
          .then(response => {
            this.setState({ books_taken: response.data.length
            });
            
          })
          .catch(error => {
            
          });
 }

 close=()=>{
        
        if (!this.state.show) {
        this.setState({ display: "none" });
        }
      }


    //   handleOnClick= async (number,count) => {
    //     console.log(number)
    //     console.log(count)
    //     this.setState({ display: "block" });
        
    //     const todayDate = Moment(new Date()).format('MM-DD-YYYY');
    //     const username = this.props.location.state.user.username;
    // const url = `http://localhost:5000/books/sachu/${number}`;
    //         const api_call = await fetch(url)
    //         console.log(api_call)
    //         const data = await api_call.json();
          
    //         const bookrecord = {
    //           bookid: data.bookid,
    //           title: data.title,
    //           subject:data.subject,
    //           author:data.author,
    //           date: data.createdAt,
    //           user:this.props.location.state.user.username,
    //           status: this.state.status,
    //           copies: this.state.copies,
    //           returnstatus:this.state.returnstatus,
    //           issue_date:todayDate,
    //           due_date:this.state.due_date
    //         };
    //         console.log(bookrecord)
    //         if(this.state.books_taken < 1 && this.state.bookrecord.length < 1 && this.state.copies > 0) {
    //           axios
    //           .post("http://localhost:5000/requests/add", bookrecord)
    //           .then(res => 
    //           this.setState({ message: res.data.message }),
    //           this.setState({ bookrecord: [...this.state.bookrecord, bookrecord] }),
              
    //           ).catch(err=>{
    //             this.setState({ message: err })
    //           })
    //          } else if (this.state.books_taken >0){
    //           this.setState({ message: "You have to return the book before requesting a new book" })
    //         } else if (count === 0){
    //           this.setState({ message: "Currently We have no more copies of this book.Please wait until the user returns the book" })
    //         }else {
    //           this.setState({ message: "You can request one book at a time" })
    //         }
    //           this.vanishMessage()
    //       }


    handleOnClick = async (number, count) => {
      const todayDate = Moment(new Date()).format('MM-DD-YYYY');
      const username = this.props.location.state.user.username;
      const url = `http://localhost:5000/books/sachu/${number}`;
    
      try {
        // Fetch book details from the backend
        const api_call = await fetch(url);
        const data = await api_call.json();
        console.log(data)
        // Temporarily override `copies` for testing purposes
        const availableCopies = data.copies > 0 ? data.copies : 1;
    
        const bookrecord = {
          bookid: data.bookid,
          title: data.title,
          subject: data.subject,
          author: data.author,
          date: data.createdAt,
          user: username,
          status: this.state.status,
          copies: availableCopies,
          returnstatus: this.state.returnstatus,
          issue_date: todayDate,
          due_date: this.state.due_date,
        };
    
        console.log("Sending book request:", bookrecord);
    
        // Send request to backend to add the book request
        axios.post("http://localhost:5000/requests/add", bookrecord)
        .then(res => {
          if (res.status === 200) {
              // Show success message if status is 200
              this.setState({
                  message: "Your request is successful",
                  display: "block",
                  bookrecord: [...this.state.bookrecord, bookrecord]
              });
          } else {
              // Show an error message if status is not 200
              this.setState({
                  message: "Error: Could not complete request",
                  display: "block"
              });
          }
          // this.vanishMessage();  // Vanish message after some time
      })
      .catch(err => {
          console.error("Error with /add request:", err);
          this.setState({ 
              message: "Error: Could not complete request",
              display: "block"
          });
          this.vanishMessage();
      });

} catch (error) {
  console.error("Error fetching book data:", error);
  this.setState({ 
      message: "Error: Unable to retrieve book information",
      display: "block"
  });
  this.vanishMessage();
}
this.vanishMessage()
};
    
  


    render() {
   
    return (
      <div>
      {/* Conditionally render the message based on `this.state.message` */}
      {this.state.message && (
      <p 
        className={this.state.message.includes("successful") ? "alert alert-success" : "notifymsg"} 
        style={{ display: this.state.display }}  
      >
        {this.state.message}
    </p>
     )}
     <div className = "container mt-5">
     {this.state.fine > 0 ? (
       <div class="alert alert-warning" role="alert" style={{ display: "block" }}>
         <a class="panel-close close"  onClick = {this.close} data-dismiss="alert">×</a> 
       A fine of {this.state.fine}rs has been issued for keeping book above due date.
     </div>
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
             placeholder="Find the Book by Title or Author"
             value={this.state.searchTerm}
             onChange={this.search}
            
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
            

<table className="table table-responsive" style = {{marginTop:"56px",cursor: "pointer"}}>
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


   
<tbody className={this.state.fine > 0 ? 'disabled':'active'}>
{this.state.availablebooks.filter(user => {
 return user.title.toLowerCase().includes(this.state.searchTerm.toLowerCase())
 || user.author.toLowerCase().includes(this.state.searchTerm.toLowerCase())
})
.map(book => {
  console.log(book)
  return (
<tr>
<td >{book.bookid}</td>
<td>{book.title}</td>
<td>{book.author}</td>
<td>{book.subject}</td>
{book.copies < 0 ? (
  <td>0</td>
) : (
  <td>{book.copies}</td>
)}

<td>
        {book.copies > 0 ? (
          <button onClick={() => this.handleOnClick(book._id)}>Request Book</button>
        ) : (
          <span>Out of Stock</span>
        )}
      </td>
<td>{Moment(book.createdAt).format('DD MMM YYYY')}</td>
{/* <Link to={"/viewbook/" + book._id}>View</Link>  */}
<td style = {{color: "#3b2341",fontWeight:"600"}}
        onClick={() => {
          const confirmBox = window.confirm(
            "Do you really want to send request"
          )
          if (confirmBox === true) {
            this.handleOnClick(book._id,book.count)}
          }
        }
      >
        {book.copies > 0 ? (
       <span>Request Book</span> ):(
       <span>Not Available</span>
        )}
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

