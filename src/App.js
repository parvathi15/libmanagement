import React, { Component } from 'react';
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import Features from "./Components/Features";
import Homepage from "./Components/user/Homepage";
import ViewBook from "./Components/user/ViewBook";
import Userbooks from "./Components/user/Userbooks";
import UserProfile from "./Components/user/UserProfile";
import BookHistory from "./Components/user/BookHistory";
import AddBook from "./Components/admin/AddBook";
import EditBook from "./Components/admin/EditBook";
import BookList from "./Components/admin/BookList";
import Adminpage from "./Components/admin/Adminpage";
import RequestList from "./Components/admin/RequestList";
import EditRequest from "./Components/admin/edit-request";
import Bookrequests from "./Components/admin/Bookrequests";
import Register from "./Components/admin/Register";
import EditBookReq from "./Components/admin/EditBookReq";
import Difference from "./Components/modals/Difference";
import ImpFine from "./Components/admin/ImpFine";
import BookRecords from "./Components/admin/Returnbooks/BookRecords";
import EditBookReturn from "./Components/admin/Returnbooks/EditBookReturn";
import Editform from "./Components/modals/Editform";
import demoform from "./Components/admin/demoform";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, HashRouter } from 'react-router-dom';
// import Viewbook from './Components/user/Viewbook';

export default class App extends Component {
  constructor(props) {
    super(props);

}
  render() {
    return (
      <div className='App'>
      <Router basename='/libmanagement'>

<Switch>
  <Route exact path="/" component={Login} />
  <Route exact path="/Register" component={Register} />
  <Route exact path="/features" component={Features} />
  <div>
    <Navbar />
    <Route path="/homepage" component={Homepage} />
    <Route exact path="/userbook" component={Userbooks} />
    <Route exact path="/addbook" component={AddBook} /> 
    <Route path="/history" component={BookHistory} /> 
    <Route exact path="/editbook/:id" component={EditBook} />
    <Route exact path="/list" component={BookList} />
    <Route path="/records" component={Bookrequests} />
    <Route exact path="/admin" component={Adminpage} />
    <Route path="/userreqs" component={RequestList} />
    <Route path="/edituser/:id" component={EditRequest} />
    <Route path="/editbkre/:id" component={EditBookReq} />
    <Route path="/diff" component={Difference} />
    <Route path="/modal" component={Editform} />
    <Route path="/fine/:id" component={ImpFine} />
    <Route path="/return" component={BookRecords} />
    <Route path="/profile" component={UserProfile} />
    <Route path="/editreturn/:id" component={EditBookReturn} />
    <Route path="/viewbook/:id" component={ViewBook} />
    </div>
    </Switch >
  </Router>
  </div>
    )
  }
}


