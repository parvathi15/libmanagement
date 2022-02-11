import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Books = props => (
    <tr>
      <td>{props.book.bookid}</td>
      <td>{props.book.name}</td>
      <td>{props.book.author}</td>
      <td>{props.book.subject}</td>
      <td>{props.book.date.substring(0, 10)}</td>
      <td>
      <button
        onClick = {() => this.AddRequest(props.book._id)}
       
      >
       add
      </button>
      </td>
    </tr>
  );

export default class Booklist extends Component {
    constructor(props) {
        super(props);
        this.AddRequest = this.AddRequest.bind(this);
        this.state = { books: [] };
      }

      AddRequest(id) {
        console.log(id);
      }

      componentDidMount() {
        axios
          .get("http://localhost:2500/books/")
          .then(response => {
            this.setState({ books: response.data });
          })
          .catch(error => {
            console.log(error);
          });
      }

      RequestList() {
        return this.state.books.map(currentbook => {
          return (
            <Books
              book={currentbook}
              key={currentbook._id}
            />
          );
        });
      }
    render() {
        return (
            <div className = "container">
            <h3>Booklist</h3>
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>Book No</th>
                  <th>Name</th>
                  <th>Author</th>
                  <th>Subject</th>
                  <th>Last Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>{this.RequestList()}</tbody>
            </table>
          </div>
        )
    }
}



