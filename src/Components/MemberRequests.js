import React, { Component } from 'react';
// import axios from "axios";
import { Link } from "react-router-dom";
import Moment from 'moment';

export default class MemberRequests extends Component {
    constructor(props) {
        super(props);
      this.state = { 
        members: []
      }
    }

    componentDidMount = async () => {
        const url = `http://localhost:5000/members/requests/pending`;
        const api_call = await fetch(url);
        const data = await api_call.json();
        console.log(data);
        this.setState({
            members: data
          });
      }
    render() {
        return (
            <div className="container mt-3 ml-5">
            <div class="row">
            <table className="table">
            <thead className="thead-light">
              <tr>
                <th>Username</th>
                
                <th>Email</th>
                <th>Date</th>
                <th>status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
               {this.state.members.map((member, key) => {
                return (
                <tr>
                <td>{member.username}</td>
                <td>{member.email}</td>
                <td>{Moment(member.createdAt).format('DD MMM YYYY')}</td>
                <td>{member.status}</td>
                <td>
                 <Link to={"/edit/" + member._id}>edit</Link></td>
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
