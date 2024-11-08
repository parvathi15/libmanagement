import React, { Component } from 'react';
import axios from "axios";

export default class AddBook extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
          bookid: "",
          title: "",
          author: "",
          subject: "",
          errors: {},
          status: 'available',
          copies: 0,
          message: "", // Holds feedback message
          display: "none" 
        };
        
        this.timerId = null;
    }

    vanishMessage() {
    
        this.timerId = setTimeout(() => {
          this.setState({
            message: "",
            display: "none"
          });
          this.timerId = null;
        }, 3000);
    }
   
    onChangeBookId = (e) => this.setState({ bookid: e.target.value });
    onChangeName = (e) => this.setState({ title: e.target.value });
    onChangeCopies = (e) => this.setState({ copies: e.target.value });
    onChangeAuthor = (e) => this.setState({ author: e.target.value });
    onChangeSubject = (e) => this.setState({ subject: e.target.value });

    handleValidation = () => {
        const { bookid, title, author, subject } = this.state;
        let errors = {};
        let formIsValid = true;

        // Book ID validation
        if (!bookid) {
            formIsValid = false;
            errors["bookid"] = "BookID cannot be empty";
        } else if (!/^[0-9]+$/.test(bookid)) {
            formIsValid = false;
            errors["bookid"] = "BookID must contain only numbers";
        } else if (bookid.includes(' ')) {
            formIsValid = false;
            errors["bookid"] = "No spaces allowed in BookID";
        }

        // Title validation
        if (!title) {
            formIsValid = false;
            errors["title"] = "Title cannot be empty";
        } else if (!/^[a-zA-Z ]*$/.test(title)) {
            formIsValid = false;
            errors["title"] = "Title must contain only letters and spaces";
        }

        // Author validation
        if (!author) {
            formIsValid = false;
            errors["author"] = "Author cannot be empty";
        } else if (!/^[a-zA-Z ]*$/.test(author)) {
            formIsValid = false;
            errors["author"] = "Author must contain only letters and spaces";
        }

        // Subject validation
        if (!subject) {
            formIsValid = false;
            errors["subject"] = "Subject cannot be empty";
        } else if (!/^[a-zA-Z ]*$/.test(subject)) {
            formIsValid = false;
            errors["subject"] = "Subject must contain only letters and spaces";
        }

        this.setState({ errors });
        return formIsValid;
    };

    onSubmit = (e) => {
        e.preventDefault();
        if (!this.handleValidation()) {
            console.log('Validation failed');
            return;
        }
        const newBook = {
          bookid: this.state.bookid,
          title: this.state.title,
          subject: this.state.subject,
          author: this.state.author,
          copies: this.state.copies,
          status: this.state.status
        };

        // Send data to backend
        axios
          .post("http://localhost:5000/books/add", newBook)
          .then((res) => {
            this.setState({ 
              message: res.data.message,
              bookid: '', 
              title: '',
              subject: '',
              copies: '',
              author: '',
              display: "block" 
            });
            this.vanishMessage(); 
          })
          .catch((err) => {
            this.setState({ 
              message: err.response?.data?.message || "Error adding book",
              display: "block" 
            });
            this.vanishMessage(); 
          });
    };

    render() {
        const { errors, message, display, bookid, title, author, subject } = this.state;
        
        return (
          <div>
            {message && (
              <p className={`notifymsg ${message === "Book Added Successfully" ? "alert-success" : ""}`} style={{ display: display }}>
                {message}
              </p>
            )}
            <div className="container mt-5">
              <h3 style={{ color: "#3b2341" }}>Create New Book</h3>
              <form onSubmit={this.onSubmit}>
                
                <div className="form-group mt-4">
                  <label className="ip_label">BookId: </label>
                  <input 
                    placeholder="Enter Bookid" 
                    className="input" 
                    name="bookid" 
                    type="text" 
                    value={bookid}  
                    onChange={this.onChangeBookId}
                  />
                  <span style={{ color: "#db2525" }}>{errors["bookid"]}</span>
                </div>

                <div className="form-group">
                  <label className="ip_label mt-3">Title: </label>
                  <input 
                    placeholder="Enter Title" 
                    className="input" 
                    name="title" 
                    type="text" 
                    value={title}  
                    onChange={this.onChangeName}
                  />
                  <span style={{ color: "#db2525" }}>{errors["title"]}</span>
                </div>

                <div className="form-group">
                  <label className="ip_label mt-3">Author: </label>
                  <input 
                    placeholder="Enter Author" 
                    className="input" 
                    name="author" 
                    type="text" 
                    value={author}  
                    onChange={this.onChangeAuthor}
                  />
                  <span style={{ color: "#db2525" }}>{errors["author"]}</span>
                </div>

                <div className="form-group">
                  <label className="ip_label mt-3">Subject: </label>
                  <input 
                    placeholder="Enter Subject" 
                    className="input" 
                    name="subject" 
                    type="text" 
                    value={subject}  
                    onChange={this.onChangeSubject}
                  />
                  <span style={{ color: "#db2525" }}>{errors["subject"]}</span>
                </div>

                <div className="form-group mt-3">
                  <input type="submit" value="Add Book" className="add-book mt-3" />
                </div>
              </form> 
            </div>
          </div>
        );
    }
}
