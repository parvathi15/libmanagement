import React, { Component } from 'react';
import axios from "axios";
import EditBookReq from './EditBookReq';
import { Link } from "react-router-dom";
import { Route , withRouter} from 'react-router-dom';
import Moment from 'moment';

 class Bookrequests extends Component {
    constructor(props) {
        super(props);
        this.state = { 
        userrequests:[],
        showModal: false,
        searchTerm: ''
      };
    }
      componentDidMount = async () => {
 
        axios
          .get("https://library-api123.herokuapp.com/requests/")
          .then(response => {
            this.setState({ userrequests: response.data });
           
          })
          .catch(error => {
           
          });
      }

      showModal = (e) => {
        this.setState(prevState => ({
            showModal: !prevState.showModal 
        }));
      }

      handleOnClick= async (number) => {
       
  
    const url = `https://library-api123.herokuapp.com/books/`+number;
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
            .post("https://library-api123.herokuapp.com/requests/add", bookrecord)
            .then(res => console.log(res.data));
        }

        deleteuserRequest(id) {
         
          axios.delete("https://library-api123.herokuapp.com/requests/" + id).then(response => {
           
          });
      
          this.setState({
            userrequests: this.state.userrequests.filter(el => el._id !== id)
          });
        }

        search=e=> {
          this.setState({
              searchTerm: e.target.value
          });
        }
      
    render() {
        return (
            <div>
   <div className = "container mt-5">
   {this.state.userrequests.length === 0 ? (
      <h3 style = {{color: "#3b2341"}} className='mt-3'>No  Book Requests</h3> 
      ):(
        <div>
     <form method="POST" action="#" class="mt-5">
       <div class="row mt-5">
         <div class="col-md-8 mt-1" style={{ margin: "0 auto" }}>
           <input
             className="search"
             name="search"
             type="text"
             placeholder="Find the User or Title"
             value={this.state.searchTerm}
             onChange={this.search}
            
           />
           <span>
             <i
               class="fa fa-search form-control-feedback"
               style={{
                 position: "relative",
                 top: "-40px",
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

{this.state.userrequests.filter(user => {
  return user.user.toLowerCase().indexOf(this.state.searchTerm) > -1
  || user.title.toLowerCase().indexOf(this.state.searchTerm) > -1;
})
.map(req => {
  
  const todayDateFormat = Moment(new Date()).format('DD MMM YYYY');
  const issueTime = Moment(req.issue_date).format('DD MMM YYYY');
  const DueTime = Moment(req.due_date).format('DD MMM YYYY')
  return (
<tr>
<td >{req.user}</td>
<td>{req.title}</td>
<td>{req.author}</td>
<td>{req.subject}</td>
<td>{Moment(req.issue_date).format('DD MMM YYYY')}</td>
{todayDateFormat === DueTime?(
<td><p>------</p></td>
):(
<td>{Moment(req.due_date).format('DD MMM YYYY')}</td>
)}
<td>{req.status}</td>
{/* <td onClick = {() => this.handleOnClick(req._id)}>request</td> */}
<td>
      {/* <Link to={"/editbkre/" + req._id}><i className="fa fa-edit"></i></Link> |{" "} */}
      <a
        onClick={() => {
          const confirmBox = window.confirm(
            "Do you really want to delete this Request"
          )
          if (confirmBox === true) {
          this.deleteuserRequest(req._id);
          }
        }}
      >
       <i class="fa fa-trash"></i>
      </a>
      {/* <a
        onClick={() => {
          this.deleteuserRequest(req._id);
        }}
      >
       <i class="fa fa-trash"></i>
      </a> */}
    </td>
    
   
</tr>
  )
})}
</tbody>
</table>
</div>
 )}
 </div>
 <div>
 {this.state.showModal && 
          <EditBookReq 
            onCloseModal={this.showModal} 
          />
        }
 </div>
 </div>
  )
}
}

export default withRouter(Bookrequests);

