import React, { useState, useEffect } from "react";
import { unapproved, approvalAction } from "api/login";
import { Table } from "reactstrap";
import Header from "../Header";

export default function EmployeeApproval() {
  const [users, setUsers] = useState([]);
  const userDetails = localStorage.user ? JSON.parse(localStorage.user) : null;
  const type = userDetails?.type;