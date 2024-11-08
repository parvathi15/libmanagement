import React, { Component } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import { Route , withRouter} from 'react-router-dom';
import Moment from 'moment';
import moment from 'moment';


class BookRecords extends Component {
    constructor(props) {
        super(props);
        this.state = { 
        bookrecords:[],
        data:"",
        searchTerm: '',
        showModal: false,
        show:false
      };
    }

    showModal = (e) => {
      this.setState(prevState => ({
          showModal: !prevState.showModal 
      }));
    }

    handleModal() {
      this.setState({show:!this.state.show})
    }


    search=e=> {
        this.setState({
            searchTerm: e.target.value
        });
      }

   
      componentDidMount = async () => {
 
        axios
          .get("http://localhost:5000/requests/")
          .then(response => {
            this.setState({ bookrecords: response.data });
          
          })
          .catch(error => {
            
          });
      }

      handleOnClick= async (number) => {
       
  
    const url = `http://localhost:5000/books/`+number;
            const api_call = await fetch(url);
            const data = await api_call.json();
            
                 const bookrecord = {
                bookid: data.bookid,
                title: data.title,
                subject:data.subject,
                author:data.author,
                date: data.date,
                user:this.props.location.state.user.username
              };
              
            
            axios
            .post("http://localhost:5000/requests/add", bookrecord)
            .then(res => console.log(res.data));
        }

        deleteuserRequest(id) {
         
          axios.delete("http://localhost:5000/requests/" + id).then(response => {
           
          });
      
          this.setState({
            bookrecords: this.state.bookrecords.filter(el => el._id !== id)
          });
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

  
   
            

<table className="table" style = {{marginTop:"56px",cursor: "pointer"}}>
<caption>List of users</caption>
          <thead className="thead-light">
            <tr >
            <th>User</th>
              <th>Name</th>
              <th>Author</th>
              <th>Subject</th>
              <th>Issue Date</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
<tbody>
{this.state.bookrecords.filter(user => {
   return user.title.toLowerCase().includes(this.state.searchTerm.toLowerCase())
   || user.author.toLowerCase().includes(this.state.searchTerm.toLowerCase())
        })
.map(req => {
  
      const dueTime = Moment(req.due_date).format('MM-DD-YYYY')
      const issueTime = Moment(req.issue_date).format('MM-DD-YYYY')
      const todayDateFormat = Moment(new Date()).format('MM-DD-YYYY');
      // var new_date = moment(dateTime, "MM-DD-YYYY");
      // new_date.subtract(5, 'days'); //Add 5 days to start date
      // var futureDate = Moment(new_date).format('MM-DD-YYYY')
  return (
<tr>
<td >{req.user}</td>
<td>{req.title}</td>
<td>{req.author}</td>
<td>{req.subject}</td>
<td>{issueTime}</td>
<td>{dueTime}</td>
<td>{req.status}</td>
{dueTime < todayDateFormat?(
   <td><Link to={"/libmanagement/fine/" + req._id}>
   <button type="button" class="btn btn-warning">Add Fine</button>
   </Link>
   </td> 
):(

   <td>Within Due</td> 
)}

{/* <td>
      <Link to={"/editreturn/" + req._id}><i className="fa fa-edit" onClick={()=>{this.handleModal()}}></i></Link> |{" "}

      <a
        onClick={() => {
          const confirmBox = window.confirm(
            "Do you really want to delete this Return"
          )
          if (confirmBox === true) {
            this.deleteuserRequest(req._id);
          }
        }}
      >
       <i class="fa fa-trash"></i>
      </a>
    </td> */}
   
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

export default withRouter(BookRecords);
