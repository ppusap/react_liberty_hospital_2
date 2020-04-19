const express = require("express");
const authRoutes = require("./auth.route");
const grantRoutes = require("./grant.route");
const scholarshipRoutes = require("./scholarship.route");
const programRoutes = require("./program.router");
const { createPDF } = require("../../helpers/pdf");

const router = express.Router();