import React from 'react';
import { withRouter } from 'react-router-dom'

const Logout = (props) => {

  const logout = () => {
    props.history.push('/login');
    props.keycloak.logout();
  }

  return (
    <button onClick={logout} className="box expand">
      Logout
    </button>
  );
}

export default withRouter(Logout);
