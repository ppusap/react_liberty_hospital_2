import React, { useState, useEffect } from "react";
import Header from "../Header";
import { Formik, Field, FieldArray } from "formik";
import { familyCrisis } from "./familyCrisis";
import { get, update, create, download } from "api/program";
import { Helmet } from "react-helmet";
import { numberChange } from "lib/number";

export default function Family() {
    const [key, setKey] = useState(+new Date());
    const [initial, setInitial] = useState({
      crisis: familyCrisis,
      no_of_unduplicated: null,
      additional_services: null,
      story_patient: null,
      patient_contact: null,
      type: "family"
    });
    const [submitting, setSubmitting] = useState(null);

    useEffect(() => {
      async function getData() {
        let res = await get("family");
        if (Object.keys(res.data).length) {
          setInitial({ ...res.data, type: "family" });
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