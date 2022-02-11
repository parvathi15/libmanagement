import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { Route , withRouter} from 'react-router-dom';
import validator from 'validator';


class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      status: 'pending',
      email: "",
      fine:0,
      date: new Date(),
      password:"",
      errorMessage: "",
      reEnterPassword: "",
       users: [],
       reg_message:"",
       validation_msg:""
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
      message: ""
    });
    this.timerId = null;
  }, 150000); 
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

  emailValidation(){
   const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(!this.state.email || regex.test(this.state.email) === false){
        this.setState({
          validation_msg: "Email is not valid"
        });
        return false;
    }
    return true;
}

passwordValidation() {
  const passwordRegex = /(?=.*[0-9])/;
    if(!this.state.password || passwordRegex.test(this.state.password) === false){
      this.setState({
        validation_msg: "Password is not valid"
      });
      return false;
  }
  return true;
}

  // emailValidation() {
  //   const regex =
  //     /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  //   return !(!this.state.email || regex.test(this.state.email) === false);
  // }



  onSubmit(e) {
    e.preventDefault();
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const passwordRegex = /(?=.*[0-9])/;
    this.emailValidation()
    this.passwordValidation()
    // const isEmailValid = this.emailValidation();
   console.log(this.state.validation_msg)
    const member = {
      username: this.state.username,
      status: this.state.status,
      email: this.state.email,
      password: this.state.password,
      fine: this.state.fine
     
    };
    const passlen = this.state.password.length
    console.log(passlen)
    // console.log(validator.isEmail(this.state.email));
    if( this.state.username && this.state.email && this.state.password &&  this.state.status && (this.state.password === this.state.reEnterPassword) 
    && (regex.test(this.state.email) === true) && (passwordRegex.test(this.state.password) === true)){
      axios
      .post("http://localhost:2500/members/add", member)
      .then(res => this.setState({validation_msg:""})) 
      .catch(err=>{
        this.setState({ reg_message: err })
      })
      // window.location = "/";
      this.vanishMessage()
    } else if(this.state.username === "" || this.state.email === "" || this.state.password === "" || this.state.reEnterPassword === "") {
      this.setState({ errorMessage: "Please Fill the fields" })
    } else if(this.state.password !== this.state.reEnterPassword) {
      this.setState({ errorMessage: "Passwords do not match" })
      } else if(this.state.password === "" && this.state.reEnterPassword === "" ) {
        this.setState({ errorMessage: "Please enter the password" })
      } else if(passwordRegex.test(this.state.password) === false){
        this.setState({ errorMessage: "Please enter valid password" })
      } else if(passlen <= 5){
        this.setState({ errorMessage: "Password must be greater" })
      }
      else {
        console.log(this.state.validation_msg)
      // this.setState({ errorMessage: "Invalid input" })
    }
    // console.log(new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(this.state.email))
  }

  render() {
    console.log(this.state.errorMessage)
    return (
      <div class="login_wrapper">
                             {this.state.reg_message === 200 ? (
       <p className='successmsg'>Your request is Successful</p>
     ):(
       <p></p>
     )}
  
        <form className="register_box mb-1"  onSubmit={this.onSubmit}>
        <div class="login_header">Register</div>
        <div class="register_content">
        <div class="ip_container userType">
        <label class="ip_label">Username</label>
        <input placeholder="Name" class="input" name="name" type="text" value={this.state.username} onChange={this.onChangeUsername}/>
          </div>
          <div class="ip_container userType">
                            <label class="ip_label">Email</label>
                            <input placeholder="name@email.com" class="input" name="email" type="text" value={this.state.email} onChange={ this.onChangeEmail } />
                            <span className="text-danger">{this.state.validation_msg}</span>
                            </div>
                            <div class="ip_container userType">
                            <label class="ip_label">Password</label>
                            <input placeholder="Password" class="input" name="password" type="password" value={this.state.password} onChange={this.onChangePassword}/>
                            <span className="text-danger">{this.state.validation_msg}</span>
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
          <p className = "errormsg">{this.state.errorMessage}</p>
        </form>
      </div>
    );
  }
}

export default withRouter(Register);