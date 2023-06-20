import React, { useEffect, useState } from "react";
import Header from "./Components/Header";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Fields from "./fields/Fields";
import { Container, Grid } from "@material-ui/core";
import Button from "./Components/FormsUI/Button";
import countries from "./data/countries.json";

import SelectFieldsFab from "./Components/SelectFieldsFab";

const INITIAL_FIELD_TYPES = {
  text: "",
  array: [],
  bool: false,
};

const FORM_FIELD_VALIDATION_TYPES = {
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email.").required("Required"),
  phone: Yup.number()
    .integer()
    .typeError("Please enter a valid phone number")
    .required("Required"),
  addressLine1: Yup.string().required("Required"),
  addressLine2: Yup.string(),
  city: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  country: Yup.string().required("Required"),
  arrivealDate: Yup.date().required("Required"),
  departureDate: Yup.date().required("Required"),
  message: Yup.string(),
  termsOfService: Yup.boolean()
    .oneOf([true], "The terms and conditions must be accepted.")
    .required("The terms and conditions must be accepted."),
};

const FORM_FIELD_TYPES = [
  {
    type: "firstName",
    label: "First Name",
    component: "Textfield",
    validationSchema: FORM_FIELD_VALIDATION_TYPES.firstName,
    initialValue: INITIAL_FIELD_TYPES.text,
  },
  {
    type: "lastName",
    label: "Last Name",
    component: "Textfield",
    validationSchema: FORM_FIELD_VALIDATION_TYPES.lastName,
    initialValue: INITIAL_FIELD_TYPES.text,
  },
  {
    type: "email",
    label: "Email",
    validationSchema: FORM_FIELD_VALIDATION_TYPES.email,
    initialValue: INITIAL_FIELD_TYPES.text,
  },
  {
    type: "phone",
    label: "Phone",
    validationSchema: FORM_FIELD_VALIDATION_TYPES.phone,
    initialValue: INITIAL_FIELD_TYPES.text,
  },
  {
    type: "addressLine1",
    label: "Address Line 1",
    validationSchema: FORM_FIELD_VALIDATION_TYPES.addressLine1,
    initialValue: INITIAL_FIELD_TYPES.text,
  },
  {
    type: "addressLine2",
    label: "Address Line 2",
    validationSchema: FORM_FIELD_VALIDATION_TYPES.addressLine2,
    initialValue: INITIAL_FIELD_TYPES.text,
  },
  {
    type: "city",
    label: "City",
    validationSchema: FORM_FIELD_VALIDATION_TYPES.city,
    initialValue: INITIAL_FIELD_TYPES.text,
  },
  {
    type: "state",
    label: "State",
    validationSchema: FORM_FIELD_VALIDATION_TYPES.state,
    initialValue: INITIAL_FIELD_TYPES.text,
  },
  {
    type: "country",
    label: "Country",
    component: "Select",
    validationSchema: FORM_FIELD_VALIDATION_TYPES.country,
    initialValue: INITIAL_FIELD_TYPES.text,
    options: countries,
  },
  {
    type: "arrivealDate",
    label: "Arriveal Date",
    validationSchema: FORM_FIELD_VALIDATION_TYPES.arrivealDate,
    initialValue: INITIAL_FIELD_TYPES.text,
  },
  {
    type: "departureDate",
    label: "Departure Date",
    validationSchema: FORM_FIELD_VALIDATION_TYPES.departureDate,
    initialValue: INITIAL_FIELD_TYPES.text,
  },
  {
    type: "message",
    label: "Message",
    validationSchema: FORM_FIELD_VALIDATION_TYPES.message,
    initialValue: INITIAL_FIELD_TYPES.text,
  },
  {
    type: "termsOfService",
    label: "Terms of Service",
    validationSchema: FORM_FIELD_VALIDATION_TYPES.termsOfService,
    initialValue: INITIAL_FIELD_TYPES.bool,
  },
];

// console.log("INITIAL_FORM_STATE", INITIAL_FORM_STATE)
// console.log("FORM_VALIDATION_SCHEMA", FORM_VALIDATION_SCHEMA)

// const FORM_VALIDATION = Yup.object().shape(FORM_VALIDATION_SCHEMA);

const App = () => {
  const [formValidation, setFormValidation] = useState({});
  const [initialValues, setInitialValues] = useState({});
  const [fields, setFields] = useState([]);

  const addField = (fieldType) => {
    const template = FORM_FIELD_TYPES.find((field) => field.type === fieldType);
    template.key = `${template.type}_${template?.component}_${
      fields.length + 2
    }`;

    console.log("template", template);

    // [...formStructures, { ...template, type: template.key, key: newKey, template: template, value: template.initialValue, name: template.name }]
    setFields((oldFields) => [
      ...oldFields,
      {
        ...template,
        type: template.key,
        key: template.key,
        template: template,
        value: template.initialValue,
        name: template.name,
      },
    ]);
  };

  useEffect(() => {
    const INITIAL_FORM_STATE = fields.reduce((acc, field) => {
      acc[field.type] = field.initialValue;
      return acc;
    }, {});
    setInitialValues(INITIAL_FORM_STATE);
  }, [fields]);

  useEffect(() => {
    const FORM_VALIDATION_SCHEMA = fields.reduce((acc, field) => {
      acc[field.type] = field.validationSchema;
      return acc;
    }, {});

    setFormValidation(Yup.object().shape(FORM_VALIDATION_SCHEMA));
  }, [fields]);

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={12}>
          <Container maxWidth="md">
            <Formik
              initialValues={{
                ...initialValues,
              }}
              validationSchema={formValidation}
              onSubmit={(values) => {
                console.log(values);
              }}
            >
              {({ ...props }) => (
                <Form>
                  <Fields {...props} fields={fields} />
                  <Grid item xs={12}>
                    <Button>Submit Form</Button>
                  </Grid>
                </Form>
              )}
            </Formik>
          </Container>
        </Grid>
      </Grid>
      <SelectFieldsFab fields={FORM_FIELD_TYPES} change={addField} />
    </>
  );
};

export default App;
