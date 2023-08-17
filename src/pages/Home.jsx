import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="fullview">
      <h5>Dev Maneger</h5>
      <div>
        <ul>
          <li>A small project for practicing React & Strapi</li>
          <li>Here, you have to register an account</li>
          <li>After registration, you can login</li>
          <li>Then you can add developers profile</li>
          <li>Also you can view, edit, delete, and search profiles</li>
          <li>You can change or reset your password</li>
        </ul>
        <p>
          If you are already registerd, then <Link to="/login">Login</Link>,
          otherwise you can <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}
