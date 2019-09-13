import React, { useState, useEffect } from "react";

const Users = props => {
  console.log(props.users);
  return (
    <>
      {props.users.map(user => (
        <div key={user.id}>User: {user.name}</div>
      ))}
    </>
  );
};

export default Users;
