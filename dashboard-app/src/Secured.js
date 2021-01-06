import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserInfo from './UserInfo';
import Logout from './Logout';
import Keycloak from 'keycloak-js';
import axios from "axios";

const Secured = () => {

  var [state, setState] = useState({keycloak: null, authenticated: false});

  useEffect(() => {
    axios.get('http://localhost:5000/api/xxx', //proxy uri
{
   headers: {
      authorization: ' xxxxxxxxxx' ,
      'Content-Type': 'application/json'
   } 
}).then(function (response) {
   console.log(response);
});
    const keycloak = Keycloak('/keycloak.json');
    keycloak.init({
      onLoad: 'login-required', 
    })
      .then(authenticated => {
        console.log(keycloak);
        setState({ keycloak: keycloak, authenticated: authenticated })
      })
      .catch((error) => {
        console.log(error);
      });
  },[]);

  const Check = (props) => {
    if(props.keycloak) {
      if(props.authenticated) {
        return (
          <div className="center bt upper-margin">
            <UserInfo keycloak={props.keycloak} />
            <Logout keycloak={props.keycloak} />
            <Link to="/charts"> See Charts </Link>
          </div>
        )
      }
      else return (<div className="center"> Unable to authenticate! </div>)
    }
    else return (<div className="center"> Unable to authenticate! </div>)
}

  return (<Check keycloak={state.keycloak} authenticated={state.authenticated} />);
}

export default Secured;
