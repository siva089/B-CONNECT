const Company = require("../models/company");
const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");

router.get("/", async (req, res) => {
  const companies = await Company.find();
  res.json(companies);
});
router.get("/country", async (req, res) => {
  const companies = await Company.find({ location: req.query.location });
  res.json(companies);
});
router.post(
  "/",

  [
    check("company", "Company name is required")
      .not()
      .isEmpty(),
    check("location", "company location is required")
      .not()
      .isEmpty(),
    check("description", "Company Description is required")
      .not()
      .isEmpty(),
    check("establishedOn", "Company establishment date is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status("400").json({ errors: errors.array() });
    }

    const {
      company,
      location,
      description,
      establishedOn,
      website,
      youtube,
      twitter,
      linkedin,
      offeringServices,
      intrestedIn,
      servicesProvided,
      revenue,
      employees
    } = req.body;
    const companyFields = {};
    companyFields.company = company;
    companyFields.location = location;
    companyFields.description = description;
    companyFields.establishedOn = establishedOn;
    companyFields.employees = employees;
    companyFields.revenue = revenue;
    if (website) companyFields.website = website;
    if (youtube) companyFields.youtube = youtube;
    if (linkedin) companyFields.linkedin = youtube;
    if (twitter) companyFields.twitter = youtube;
    if (offeringServices) {
      companyFields.offeringServices = offeringServices.split(",").map(a => {
        return a.trim();
      });
    }
    if (intrestedIn) {
      companyFields.intrestedIn = intrestedIn
        .split(",")

        .map(a => {
          return a.trim();
        });
    }
     if (servicesProvided) {
       companyFields.servicesProvided = servicesProvided
         .split(",")

         .map(a => {
           return a.trim();
         });
     }
    
    try {
      let company = new Company(companyFields);
      await company.save();
      res.json(company);
    } catch (e) {
      console.log(e);
      res.status(500).send("Service error");
    }
  }
);

router.get("/extending", auth, async (req, res) => {
  let myCountry = req.query.myCountry

  const extendingCompanies = await Company.find({
    location: req.query.location,
    offeringServices: { $all: [myCountry] }
  });
  res.send(extendingCompanies);
});

router.get("/providing", auth, async (req, res) => {
  let myCountry = req.query.myCountry;
  const providingCompanies = await Company.find({
    location: req.query.location,
    intrestedIn: { $all: [myCountry] }
  });
  res.send(providingCompanies);
});
module.exports = router;
