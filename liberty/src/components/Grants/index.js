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
  const onSubmit = async values => {
    try {
      setSubmitting(true);
      if (!grant_id) {
        let res = await create(values);
        setGrant(res.data);
      } else {
        // values.status = "draft";
        let res = await update(values);
        setGrant(res.data);
      }
      setSuccess(true);
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
    }
  };

  const openFileSelector = () => {
    fileRef.current.click();
  };

  const optionChange = obj => {
    changeOption(obj);
  };

  const removeFile = file_type => { };

  const getFiles = (values, setFieldValue) => {
    return options.map((e, idx) => {
      if (values[e.file_name]) {
        return (
          <div className="file-container" key={idx}>
            <label>{e.label}</label>
            {typeof values[e.file_name] === "object" ? (
              <a>{values[e.file_name].name}</a>
            ) : (
                <a
                  target="blank"
                  href={`http://localhost:4000/${values[e.file_name]}`}
                >
                  {values[e.file_name].substr(37)}
                </a>
              )}
            <label
              className="remove-file"
              onClick={() => {
                setFieldValue(e.value, null);
                setFieldValue(e.file_name, null);
              }}
            ></label>
          </div>
        );
      } else return null;
    });
  };

  useEffect(() => {
    setUser(userDetails);
    setType(userDetails.type || "user");
    if (userDetails.type === "employee") {
      GrantSchema.shape({
        score: Yup.number().required("Required"),
        comments: Yup.string().required("Required")
      });
    }
    async function getData() {
      let res = await get(grant_id);
      if (res.data.status !== "draft") {
        setDisabled(true);
        setActions(false);
      }
      if (res.data.status === "accepted" || res.data.status === "rejected") {
        setAllActionsDisable(true);
      }
      setGrant(res.data);

      res.data = {
        ...res.data,
        date: new Date(res.data.date),
        isEmployee: userDetails.type === "employee"
      };
      setInitial(res.data);
      setLoading(false);
    }
    if (grant_id) {
      setLoading(true);
      getData();
    }
  }, [grant_id]);

  return (
    <div className="grants">
      <Helmet>
        <title>Liberty Hospital Foundation - Grant Application</title>
      </Helmet>
      <Header />
      {!success ? (
        <div className="main-container">
          <h3 className="title">LiveWell Grant Application Form</h3>
          {loading ? (
            <h3>Loading...</h3>
          ) : (
              <Formik
                initialValues={initial}
                validationSchema={GrantSchema}
                validateOnBlur={false}
                validateOnChange={false}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  validateForm,
                  setFieldValue
                }) => (
                    <form
                      onSubmit={e => e.preventDefault()}
                      className={disabled ? "disabled" : ""}
                    >
                      <div className="input-container row">
                        <label className="col-sm-8"></label>
                        <label className="col-sm-1 required">DATE:</label>
                        <DatePicker
                          selected={values.date}
                          dateFormat="MMMM d, yyyy"
                          name="date"
                          onChange={date => setFieldValue("date", date)}
                        />
                      </div>
                      <h5 className="sub-title">Agency Information:</h5>
                      <div className="agency-info">
                        <div className="input-container row ">
                          <label className="col-sm-4 required">
                            Name of Agency:
                    </label>
                          <input
                            className="col-sm-8"
                            type="text"
                            name="agency"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.agency}
                          />
                        </div>
                        <div className="input-container row">
                          <label className="col-sm-4 required">
                            Primary Agency Tax ID:
                    </label>
                          <input
                            className="col-sm-8"
                            type="text"
                            name="tax_id"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.tax_id}
                          />
                        </div>
                        <div className="flex-container row DNI">
                          <div className="input-container col-sm-6 row ">
                            <label className="col-sm-4 required">
                              Primary Agency:
                      </label>
                            <input
                              className="col-sm-8"
                              type="text"
                              name="primary"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.primary}
                            />
                          </div>
                        </div>
                        <div className="flex-container row">
                          <div className="input-container col-sm-6 row">
                            <label className="col-sm-4 required">
                              Contact Person:
                      </label>
                            <input
                              className="col-sm-8"
                              type="text"
                              name="contact"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.contact}
                            />
                          </div>
                          <div className="input-container col-sm-6 row">
                            <label className="col-sm-4 required">Title:</label>
                            {/* <input
                      className="col-sm-8"
                      type="text"
                      name="person_title"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.person_title}
                    /> */}
                            <Input
                              type="select"
                              id="exampleSelect"
                              name="person_title"
                              className="col-sm-8"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.person_title}
                            >
                              <option>Mr</option>
                              <option>Mrs</option>
                              <option>Ms</option>
                              <option>Others</option>
                            </Input>
                          </div>
                        </div>
                        <div className="input-container row">
                          <label className="col-sm-3 required">
                            Mailing Address:
                    </label>
                          <input
                            className="col-sm-9"
                            type="text"
                            name="address"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.address}
                          />
                        </div>
                        <div className="flex-container row">
                          <div className="input-container col-sm-4 row">
                            <label className="col-sm-4 required">Phone:</label>
                            <input
                              className="col-sm-8"
                              type="number"
                              name="phone"
                              onChange={e =>
                                numberChange(e, setFieldValue, "phone")
                              }
                              onBlur={handleBlur}
                              value={values.phone}
                            />
                            <span className="validation-error ML34">
                              {errors.phone || touched.phone}
                            </span>
                          </div>
                          <div className="input-container col-sm-4 row">
                            <label className="col-sm-4 required">Fax:</label>
                            <input
                              className="col-sm-8"
                              type="text"
                              name="fax"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.fax}
                            />
                          </div>
                          <div className="input-container col-sm-4 row ML34">
                            <label className="col-sm-4 required">E-Mail:</label>
                            <input
                              className="col-sm-8"
                              type="text"
                              name="email"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.email}
                            />
                            <span className="validation-error">
                              {errors.email || touched.email}
                            </span>
                          </div>
                        </div>
                        <div className="input-container row">
                          <label className="col-sm-4 required">
                            Briefly summarize the mission of your agency:
                    </label>
                          <input
                            className="col-sm-8"
                            type="text"
                            name="info"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.info}
                          />
                        </div>
                      </div>
                      <div className="copies-container separate-container">
                        <div className="p-text">
                          Please attach copies of the following documents with your
                          grant application for each of the requesting agencies:
                  </div>
                        {true ? null : (
                          <div className="check-container">
                            <div className="chk-container disable-chk">
                              <label htmlFor="annual">
                                <Field
                                  type="checkbox"
                                  value="true"
                                  id="annual"
                                  checked={values.annual}
                                />
                                Latest annual report
                        </label>
                              {values.annual_file && grant_id ? (
                                <a
                                  className="view-file"
                                  target="blank"
                                  href={`http://localhost:4000/${values.annual_file}`}
                                >
                                  View File
                          </a>
                              ) : (
                                  <input
                                    type="file"
                                    accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
                                    name="annual_file"
                                    onChange={e => {
                                      setFieldValue(
                                        "annual_file",
                                        e.currentTarget.files[0]
                                      );
                                      setFieldValue("annual", true);
                                    }}
                                  />
                                )}
                            </div>
                            <div className="chk-container disable-chk">
                              <label htmlFor="roster">
                                <Field
                                  type="checkbox"
                                  value="true"
                                  id="roster"
                                  checked={values.roster}
                                />
                                Current roster of Board of Directors and staff
                        </label>
                              {values.roster_file && grant_id ? (
                                <a
                                  className="view-file"
                                  target="blank"
                                  href={`http://localhost:4000/${values.roster_file}`}
                                >
                                  View File
                          </a>
                              ) : (
                                  <input
                                    type="file"
                                    accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
                                    name="roster_file"
                                    onChange={e => {
                                      setFieldValue(
                                        "roster_file",
                                        e.currentTarget.files[0]
                                      );
                                      setFieldValue("roster", true);
                                    }}
                                  />
                                )}
                            </div>
                            <div className="chk-container disable-chk">
                              <label htmlFor="audit">
                                <Field
                                  type="checkbox"
                                  value="true"
                                  id="audit"
                                  checked={values.audit}
                                />
                                Latest financial audit
                        </label>
                              {values.audit_file && grant_id ? (
                                <a
                                  className="view-file"
                                  target="blank"
                                  href={`http://localhost:4000/${values.audit_file}`}
                                >
                                  View File
                          </a>
                              ) : (
                                  <input
                                    type="file"
                                    accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
                                    name="audit_file"
                                    onChange={e => {
                                      setFieldValue(
                                        "audit_file",
                                        e.currentTarget.files[0]
                                      );
                                      setFieldValue("audit", true);
                                    }}
                                  />
                                )}
                            </div>
                            <div className="chk-container disable-chk">
                              <label htmlFor="proof">
                                <Field
                                  type="checkbox"
                                  value="true"
                                  id="proof"
                                  checked={values.proof}
                                />
                                Proof of organization’s active 501(c)(3) non-profit
                                status from the Internal Revenue Service
                        </label>
                              {values.proof_file && grant_id ? (
                                <a
                                  className="view-file"
                                  target="blank"
                                  href={`http://localhost:4000/${values.proof_file}`}
                                >
                                    View File
                            </a>
                          ) : (
                            <input
                              type="file"
                              accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
                              name="proof_file"
                              onChange={e => {
                                setFieldValue(
                                  "proof_file",
                                  e.currentTarget.files[0]
                                );
                                setFieldValue("proof", true);
                              }}
                            />
                          )}
                        </div>
                        <div className="chk-container disable-chk DNI">
                          <label htmlFor="income">
                            <Field
                              type="checkbox"
                              value="true"
                              id="income"
                              checked={values.income}
                            />
                             Last fiscal year income statement detailing sources
                            and use of funds
                          </label>
                        </div>
                        <div className="chk-container disable-chk">
                          <label htmlFor="letters">
                            <Field
                              type="checkbox"
                              value="true"
                              id="letters"
                              checked={values.letters}
                            />
                            Letters of Support/ Memorandums of Agreement from
                            collaborating agencies/ partners
                          </label>
                          {values.letters_file && grant_id ? (
                            <a
                              className="view-file"
                              target="blank"
                              href={`http://localhost:4000/${values.letters_file}`}
                            >
                              View File
                            </a>
                          ) : (
                            <input
                              type="file"
                              accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
                              name="letters_file"
                              onChange={e => {
                                setFieldValue(
                                  "letters_file",
                                  e.currentTarget.files[0]
                                );
                                setFieldValue("letters", true);
                              }}
                            />
                          )}
                            </div>
                      </div>
                    )}
                    <div>{getFiles(values, setFieldValue)}</div>
                    <div className="row files-dropdown">
                      <Dropdown
                        options={options}
                        onChange={optionChange}
                        value={defaultOption}
                        placeholder="Select an option"
                        className="col-sm-8"
                      />
                      <div className="col-sm-4">
                        <button className="file-btn" onClick={openFileSelector}>
                          Select Files
                        </button>
                        <input
                          ref={fileRef}
                          className="DNI"
                          type="file"
                          accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
                          name="file_upload"
                          onChange={e => {
                            setFieldValue(
                              `${defaultOption.value}_file`,
                              e.currentTarget.files[0]
                            );
                            setFieldValue(defaultOption.value, true);
                          }}
                        />