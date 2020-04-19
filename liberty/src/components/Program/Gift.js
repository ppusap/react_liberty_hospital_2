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