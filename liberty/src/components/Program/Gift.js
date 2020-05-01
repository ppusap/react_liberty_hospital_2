import React, { useState, useEffect } from "react";
import Header from "../Header";
import { Formik, Field, FieldArray } from "formik";
import { giftServices } from "./services";
import { get, update, create, download } from "api/program";
import { Helmet } from "react-helmet";
import { numberChange } from "lib/number";

export default function PatientAssistance() {
  const [key, setKey] = useState(+new Date());
  const [initial, setInitial] = useState({
    services: giftServices,
    no_of_unduplicated: null,
    story_patient: null,
    patient_contact: null,
    type: "gift"
  });
  const [submitting, setSubmitting] = useState(null);

  useEffect(() => {
    async function getData() {
      let res = await get("gift");
      if (Object.keys(res.data).length) {
        setInitial({ ...res.data, type: "gift" });
        setKey(+new Date());
      }
    }
    getData();
  }, []);

  const onSubmit = async values => {
    setSubmitting(true);
    if (initial.id) {
      let res = await update(values);
    } else {
      let res = await create(values);
    }
    setSubmitting(false);
  };
  return (
    <div className="patient-assistance">
      <Helmet>
        <title>Liberty Hospital Foundation - Kyleigh's Gift</title>
      </Helmet>
      <Header />
      <div className="main-container" key={key}>
        <h3 className="title">Kyleigh's Gift</h3>
        <div className="download-container">
          <button onClick={() => download("gift")}>Download List</button>
        </div>
        <Formik
          initialValues={initial}
          // validationSchema={ScholarshipSchema}
          validateOnBlur={false}
          validateOnChange={false}
        >