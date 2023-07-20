import React from "react";

const LoginComponent: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return <form onSubmit={(e) => handleSubmit(e)}></form>;
};

export default LoginComponent;
