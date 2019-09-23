import React from "react";

const Users = props => {
  console.log(props.users);
  return (
    <div>
      {props.users.map(user => (
        <div key={user.id}>
          <h2>{user.name}</h2>
        </div>
      ))}
    </div>
  );
};

export default Users;
