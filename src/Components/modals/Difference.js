import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import moment from "moment";
import { Route , withRouter} from 'react-router-dom';


 class Difference extends Component {
    constructor(props) {
        super(props);
        this.state = {
          startDate: new Date(),
          endDate: new Date()
        };
        this.handleChangeEnd = this.handleChangeEnd.bind(this);
        this.handleChangeStart = this.handleChangeStart.bind(this);
      }
    
      handleChangeStart(date) {
        this.setState({
          startDate: date
        });
      }
    
      handleChangeEnd(date) {
        this.setState({
          endDate: date
        });
      }

      calculate() {
          
          console.log("nbcb")
    //   let prescriptionDate= new Date()  // Today
    //   const days = 7
    //   console.log(prescriptionDate);
    //   console.log(days);
    //   let date = new Date(new Date(prescription.prescriptionDate).setDate(prescription.prescriptionDate.getDate() + prescription.prescriptionExpirationDate)).toDateString();
      
    //   console.log(date);
      }
      
   
    
      calculateDaysLeft(startDate, endDate) {
        if (!moment.isMoment(startDate)) startDate = moment(startDate);
        if (!moment.isMoment(endDate)) endDate = moment(endDate);
    
        return endDate.diff(startDate, "days");
      }
    
    render() {
        const startDate = this.state.startDate;
        console.log(startDate)
        console.log(startDate+10)

        const endDate = this.state.endDate;
        const daysLeft = this.calculateDaysLeft(startDate, endDate);
        return (
      <div>
        <h3>Get Difference between two dates in days</h3>
        <b>Start Date</b>:
        <DatePicker
          selected={this.state.startDate}
          onChange={this.handleChangeStart}
        />
        &nbsp;&nbsp;&nbsp;
        <b>End Date</b>:
        <DatePicker
          selected={this.state.endDate}
          onChange={this.handleChangeEnd}
        />

        <button onclick = {this.calculate()}>calculate</button>
        <div className="amount">
        {daysLeft}</div>
         {/* <div className="amount">
        {daysLeft >= 10 ? (
        <p>exceeded</p>
        ):(
        <p>over</p>    
        )}</div> */}
      </div>
        )
    }
}

export default withRouter(Difference)

