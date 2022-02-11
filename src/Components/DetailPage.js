import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export default class DetailPage extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            bookid:"",
            name: "",
            author:"",
            subject: "",
            username:"",
            // language:"",
            date: new Date(),
            status: 'available',
          };
    }

    onChangeBookId=e=> {
        this.setState({
          bookid: e.target.value
        });
      }
    
      onChangeName = e => {
        this.setState({
          name: e.target.value
        });
      }
      onChangeStatus(e) {
        this.setState({
          status: 'available'
        });
      }
      onChangeAuthor=(e)=> {
        this.setState({
          author: e.target.value
        });
      }
      onChangeSubject=(e)=> {
        this.setState({
          subject: e.target.value
        });
      }
      onChangeDate(date) {
        this.setState({
          date: date
        });
      }

    componentDidMount = async () => {
        const id = this.props.location.state.bookid
        const localuser = this.props.location.state.user
        console.log(localuser);
        this.setState({ 
            username: localuser
        });
        const req = await fetch(`http://localhost:2500/books/${id}`);
        const res = await req.json();
        console.log(res);
        this.setState({
            bookid: res.bookid,
            name: res.name,
            author:res.author,
            subject:res.subject,
            date: new Date(res.date)
          });
    }

    onSubmit(e) {
        e.preventDefault();
        const exercise = {
            bookid: this.state.bookid
            // name: this.state.name,
            // subject:this.state.subject,
            // author:this.state.author,
            // date: this.state.date,
            // status: this.state.status,
            // username:localuser
          };
          console.log(exercise)
        //  axios
        //     .post("http://localhost:2500/books/add", exercise)
        //     .then(res => console.log(res.data));
        }
    render() {
        return (
            <div className = "container">
            <h3>detailpage</h3>
            <form onSubmit={this.onSubmit}>
            <div className="form-group">
            <label>BookId: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.bookid}
              onChange={this.onChangeBookId}
            />
          </div>
              <div className="form-group">
                <label>Username: </label>
                <input
                  type="text"
                  required
                  className="form-control"
                  value={this.state.name}
           />
              </div>
              <div className="form-group">
            <label>Author: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.author}
             
            />
          </div>
              <div className="form-group">
            <label>Subject: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.subject}
             
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


          <div className="form-group mt-4">
            <input
              type="submit"
              value="Request Book"
              className="btn btn-primary"
            />
          </div>
        </form> 
      </div>
        )
    }
}
