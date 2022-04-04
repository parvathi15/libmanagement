import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { Route , withRouter} from 'react-router-dom';



class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      status: 'pending',
      display:"none",
      email: "",
      fine:0,
      date: new Date(),
      password:"",
      errorMessage: "",
      reEnterPassword: "",
       users: [],
       reg_message:"",
       errors: {},
       disabled : false
    };
    this.timerId = null;
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeFine = this.onChangeFine.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  vanishMessage() {
    this.timerId = setTimeout(() => {
    this.setState({
      errorMessage: ""
    });
    this.timerId = null;
  }, 9000); 
}

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }
  onChangeStatus(e) {
    this.setState({
      status: 'pending'
    });
  }
  onChangeFine(e) {
    this.setState({
      fine:0
    });
  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
}


  onChangePassword = e => {
    this.setState({
      password: e.target.value
    });
  };
  onChangeEnterPassword = e => {
    this.setState({
        reEnterPassword: e.target.value
    });
  };


  handleValidation(){

       let errors = {};
       let formIsValid = true;
       let lastAtPos = this.state.email.lastIndexOf('@');
       let lastDotPos = this.state.email.lastIndexOf('.');
       if(!this.state.username){
          formIsValid = false;
          errors["username"] = "UserName field cannot be empty";
       } else if (!this.state.username.match(/^[a-z0-9]+([-_\s]{0}[a-z0-9]+)*$/i)){
             formIsValid = false;
             errors["username"] = "Please enter alphabets or alphanumerals";
      } else {
        formIsValid = false;
        // errors["password"] = " Please fill properly";
      }

      if(this.state.username.indexOf(' ') >= 0){
        formIsValid = false;
        errors["username"] = "Please avoid spaces";
    }
       

       if(!this.state.email){
          formIsValid = false;
          errors["email"] = "Email field cannot be empty";
       } else if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.email.indexOf('@@') === -1 && lastDotPos > 2 && (this.state.email.length - lastDotPos) > 2)) {
             formIsValid = false;
             errors["email"] = "Email is not valid";
           }
       else {
        formIsValid = false;
        // errors["password"] = " Please fill properly";
      }

    //  username validation /^[a-z0-9]+([-_\s]{0}[a-z0-9]+)*$/  (passwordRegex.test(this.state.password) === true)

      if(!this.state.password){
         formIsValid = false;
         errors["password"] = "Password field cannot be empty";
        } else if (!this.state.password.match(/^[a-z0-9]+([-_\s]{0}[a-z0-9]+)*$/i)){
          formIsValid = false;
          errors["username"] = "Please enter alphabets or alphanumerals";
      } else if(this.state.password.length < 8) {
        formIsValid = false;
        errors["password"] = " Please enter at least 8 character";
      } else {
        console.log(this.state.password)
      }
      this.setState({errors: errors});
      return formIsValid;
  }

  onSubmit(e) {
    e.preventDefault();
    if(this.handleValidation()){
      console.log('validation successful')
    }else{
      console.log('validation failed')
    }
    // var re =/^[a-z_A-Z\-0-9\.\*\#\$\!\~\%\^\&\-\+\?\|]+@+[a-zA-Z\-0-9]+(.com)$/i; 
    // password=/(?=.*[0-9])/i
    // password=/[0-9]/g
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const passwordRegex = /^[a-z0-9]+([-_\s]{0}[a-z0-9]+)*$/i;
    var usernameRegex = /^[a-z0-9]+([-_\s]{0}[a-z0-9]+)*$/i;
    const member = {
      username: this.state.username,
      status: this.state.status,
      email: this.state.email,
      password: this.state.password,
      fine: this.state.fine
     
    };
    if( this.state.username && this.state.email && this.state.password 
      && this.state.status && (this.state.password === this.state.reEnterPassword)
      && (regex.test(this.state.email) === true) && (passwordRegex.test(this.state.password) === true) && (this.state.password.length >= 8)
      && (usernameRegex.test(this.state.username) === true)){
      axios
      .post("https://library-api123.herokuapp.com/members/add", member)
      .then(res => this.setState({ reg_message: res.data }),
      ) 
      .catch(err=>{
        this.setState({ reg_message: err })
      })
      // window.location = "/";
    } else if(this.state.username === "" || this.state.email === "" || this.state.password === "" || this.state.reEnterPassword === "") {
      this.setState({ errorMessage: "Please Fill the fields" })
    } else if(this.state.password !== this.state.reEnterPassword) {
      this.setState({ errorMessage: "Passwords do not match" })
      } else if(this.state.password === "" && this.state.reEnterPassword === "" && this.state.password.length <= 3) {
        this.setState({ errorMessage: "Please enter proper password" })
      } else {
        console.log(this.state.errorMessage)
      // this.setState({ errorMessage: "Please enter proper detials" })
    }
    this.vanishMessage()
  }

  render() {
    return (
      <div class="login_wrapper">
      {this.state.reg_message === "Member added!" ? (
       
       <p className='successmsg'>Your request is Successfull.Go back to
       <b> Login Page</b></p>
      
     ):(
      <p className = "validation_msg" style={{ display: this.state.display }}>{this.state.errorMessage}</p>
     )}


{this.state.errorMessage === ""?(
 <p className = "validation_msg" style={{ display: this.state.display }}>{this.state.errorMessage}</p>
   ):(
 <p className = "validation_msg">{this.state.errorMessage}</p>
  )}
  
        <form className="register_box mb-1"  onSubmit={this.onSubmit}>
        <div class="login_header">Register</div>
        <div class="register_content">
        <div class="ip_container userType">
        <label class="ip_label">Username</label>
        <input placeholder="Name" class="input" name="name" type="text" value={this.state.username} onChange={this.onChangeUsername}/>
        <span style={{color: "#db2525"}}>{this.state.errors["username"]}</span>
          </div>
          <div class="ip_container userType">
                            <label class="ip_label">Email</label>
                            <input placeholder="name@email.com" class="input" name="email" type="text" value={this.state.email} onChange={ this.onChangeEmail } />
                            <span style={{color: "#db2525"}}>{this.state.errors["email"]}</span>
                            </div>
                            <div class="ip_container userType">
                            <label class="ip_label">Password</label>
                            <input placeholder="Password" class="input" name="password" type="password" value={this.state.password} onChange={this.onChangePassword}/>
                            <span style={{color: "#db2525"}}>{this.state.errors["password"]}</span>
                            </div>
   
                            <div class="ip_container userType">
                            <label class="ip_label">Re-enter Password</label>
                            <input placeholder="Re-enter Password" class="input" name="password" type="password" value={this.state.reEnterPassword} onChange={this.onChangeEnterPassword} />
                            </div>

          <div class="login_footer">
        <input type="submit"  value="Register" className="submitBtn button mt-4 mb-3" />
                             
        </div>
       <div class="register-path mb-3">
         <Link to="/">
        <a className ="register">Go Back</a> 
        </Link>
                            
          </div>
          
          </div>
        
        </form>
      </div>
    );
  }
}

export default withRouter(Register);