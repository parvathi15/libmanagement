import React, { Component } from 'react';

export default class demoform extends Component {
    constructor() {
        super()
        this.state ={
             name:'',
             email: '',
             message: '',
           errors: {},
           disabled : false
        }
        this.onChangename = this.onChangename.bind(this);
        this.onChangeMessage = this.onChangeMessage.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
      }
    
      handleValidation(){
        //    let fields = this.state.fields;
           let errors = {};
           let formIsValid = true;
    
           if(!this.state.name){
              formIsValid = false;
              errors["name"] = "Name field cannot be empty";
           }
    
         
              if(!this.state.name.match(/^[a-zA-Z]+$/)){
                 formIsValid = false;
                 errors["name"] = "Only letters";
              }
           
    
           if(!this.state.email){
              formIsValid = false;
              errors["email"] = "Email field cannot be empty";
           }
    
           if(typeof this.state.email !== "undefined"){
              let lastAtPos = this.state.email.lastIndexOf('@');
              let lastDotPos = this.state.email.lastIndexOf('.');
    
              if (!(lastAtPos < lastDotPos && lastAtPos > 0 && this.state.email.indexOf('@@') === -1 && lastDotPos > 2 && (this.state.email.length - lastDotPos) > 2)) {
                 formIsValid = false;
                 errors["email"] = "Email is not valid";
               }
          }
    
          if(!this.state.message){
             formIsValid = false;
             errors["message"] = " Message field cannot be empty";
          }
    
          this.setState({errors: errors});
          return formIsValid;
      }
    
      onChangename(e) {
        this.setState({
          name: e.target.value
        });
      }
      onChangeMessage(e) {
        this.setState({
          message: e.target.value
        });
      }
    
      onChangeEmail(e) {
        this.setState({
          email: e.target.value
        });
    }
    
      handleSubmit(e){
          e.preventDefault();
          if(this.handleValidation()){
              console.log('validation successful')
            }else{
              console.log('validation failed')
            }
      }
    

  render() {

    return ( 
        <div>
       <form onSubmit={this.handleSubmit.bind(this)} method="POST">
          <div className="row">
            <div className="col-25">
                <label htmlFor="name">Name</label>
            </div>
            <div className="col-75">
                <input type="text" placeholder="Enter Name"  refs="name" onChange={this.onChangename} value={this.state.name}/>
                <span style={{color: "red"}}>{this.state.errors["name"]}</span>
            </div>
          </div>
          <div className="row">
            <div className="col-25">
              <label htmlFor="exampleInputEmail1">Email address</label>
            </div>
            <div className="col-75">
                <input type="email" placeholder="Enter Email" refs="email" aria-describedby="emailHelp" onChange={this.onChangeEmail} value={this.state.email}/>
                <span style={{color: "red"}}>{this.state.errors["email"]}</span>
            </div>
          </div>
          <div className="row">
            <div className="col-25">
                <label htmlFor="message">Message</label>
            </div>
            <div className="col-75">
                <textarea type="text" placeholder="Enter Message" rows="5" refs="message" onChange={this.onChangeMessage} value={this.state.message}></textarea>
                <span style={{color: "red"}}>{this.state.errors["message"]}</span>
            </div>
          </div>
          <div className="row">
            <button type="submit" disabled={this.state.disabled}>{this.state.disabled ? 'Sending...' : 'Send'}</button>
          </div>
      </form>
          </div>
    );
  }
}