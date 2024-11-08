import React, { Component } from 'react';
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class EditRequest extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
          username: "",
          email:"",
          date: new Date(),
          status: ""
        };
      }

      onChangeUsername(e) {
        this.setState({
          username: e.target.value
        });
      }
    
      onChangeStatus(e) {
        this.setState({
          status: e.target.value
        });
      }
    
      onChangeEmail(e) {
        this.setState({
          email: e.target.value
        });
      }
    
      onChangeDate(date) {
        this.setState({
          date: date
        });
      }

      componentDidMount() {
        axios
          .get("http://localhost:5000/exercises/" + this.props.match.params.id)
          .then(response => {
              console.log(response.data)
            this.setState({
              username: response.data.username,
              email: response.data.email,
              date: new Date(response.data.createdAt),
              status: response.data.status
            });
          })
          .catch(function(error) {
            console.log(error);
          });
        }

        onSubmit(e) {
          e.preventDefault();
      
          const exercise = {
            username: this.state.username,
            status: this.state.status,
            email: this.state.email,
            date: this.state.date
          };
      
          console.log(exercise);
      
          axios
            .post(
              "http://localhost:2500/exercises/update/" + this.props.match.params.id,
              exercise
            )
            .then(res => console.log(res.data));
      
          window.location = "/";
        }
    render() {
        return (
          <div className = "container">
          <h3>Edit Exercise Log</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Username: </label>
              <input
                type="text"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="form-group">
              <label>Email: </label>
              <input
                type="text"
                className="form-control"
                value={this.state.email}
                onChange={this.onChangeEmail}
              />
            </div>

            <div className="form-group">
              <label>Date: </label>
              <div>
                <DatePicker
                  selected={this.state.date}
                  onChange={this.onChangeDate}
                />
              </div>
            </div>

            <div className="form-group">
            <label>Status: </label>
            <select class="form-control" value={this.state.status} onChange={this.onChangeStatus}>
            <option value="select">Select</option>
            <option value="Accepted">Accepted</option>
            <option value="Rejected">Rejected</option>
            <option value="Pending">Pending</option>
          </select>
          </div>
       
      
  
            <div className="form-group">
              <input
                type="submit"
                value="Edit Exercise Log"
                className="btn btn-primary mt-5"
              />
            </div>
          </form>
        </div>
        )
    }
}
