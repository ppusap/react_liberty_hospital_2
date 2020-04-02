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
    person_title: "Mr",
    address: "",
    phone: "",
    fax: "",
    email: "",
    annual: false,
    roster: false,
    audit: false,
    proof: false,
    income: false,
    letters: false,
    info: "",
    docs: "",
    title: "",
    new_or_current: false,
    funding_past: "",
    synopsis: "",
    priority: "",
    main_outcomes: "",
    outcomes: "",
    collaborative: "",
    sources: "",
    sustainability: "",
    describe: "",
    no_of_people: 0,
    socio: "",
    age: "",
    gender: "",
    clients: "",
    budget: "",
    isAdditional: "",
    additional: "",
    head: "",
    head_title: "",
    date: new Date(),
    signature: "",
    director: "",
    funding: 0,
    implementation: "",
    rfp: "",
    zip: "",
    equity: "",
    population: "",
    annual_file: "",
    roster_file: "",
    audit_file: "",
    proof_file: "",
    letters_file: "",
    budget_file: "",
    additional_file: "",
    score: "",
    comments: "",
    isEmployee: false,
    user_id: userDetails.id
});
const [loading, setLoading] = useState(false);
const [disabled, setDisabled] = useState(false);
const [actions, setActions] = useState(true);
const [type, setType] = useState("user");
const [user, setUser] = useState({});
const [fileOptions] = useState(options);
const [defaultOption, changeOption] = useState(options[0]);
const fileRef = useRef();
const [submitting, setSubmitting] = useState(false);
const [allActionsDisable, setAllActionsDisable] = useState(false);
const budgetRef = useRef();

const isObjectEmpty = obj => {
  return Object.keys(obj).length === 0;
};