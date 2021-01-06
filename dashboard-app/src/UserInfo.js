import React, { useEffect, useState } from 'react';

const UserInfo = (props) => {

  const [user, setUser] = useState({name: "", id: ""});
  
  useEffect(() => {
    props.keycloak.loadUserInfo()
      .then((userInfo) => {
        console.log(userInfo);
        setUser({name: userInfo.name, email: userInfo.email, id: userInfo.sub});
      })
      .catch((error) => {
        console.log(error);
      });
  },[props.keycloak]);

    return (
      <div>
        <p className="margin"> Name: {user.name} </p>
        <p className="margin"> Email: {user.email} </p>
        <p className="margin"> ID: {user.id} </p>
      </div>
    );
}

export default UserInfo;
