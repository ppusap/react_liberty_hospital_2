import React, { useState, useEffect, useRef } from "react";
import Header from "../Header";
import "./grant.scss";
import { Formik, Field } from "formik";
import { create, get, update } from "api/grant";
import { GrantSchema } from "./validations";
import { Input } from "reactstrap";
import DatePicker from "react-datepicker";
import * as Yup from "yup";
import "react-datepicker/dist/react-datepicker.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { options } from "./file-options";
import { Helmet } from "react-helmet";
import { numberChange } from "lib/number";

export default function Grant({ match }) {
  let userDetails = JSON.parse(localStorage.user);
  const [grant, setGrant] = useState(null);
  const [grant_id] = useState(match.params.id);
  const [success, setSuccess] = useState(false);
  const [initial, setInitial] = useState({
    agency: "",
    primary: "",
    tax_id: "",
    contact: "",
});