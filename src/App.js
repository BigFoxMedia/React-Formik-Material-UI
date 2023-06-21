import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Formik, Form } from "formik";
import { Box, Button, LinearProgress } from "@mui/material";
import * as Yup from "yup";
import Fields from "./containers/Fields";
import { Container, Grid } from "@material-ui/core";
// import Button from "./Components/FormsUI/Button";
import countries from "./data/countries.json";

import SelectFieldsFab from "./Components/SelectFieldsFab";

const INITIAL_FIELD_TYPES = {
  text: "",
  array: [],
  bool: false,
};

const FORM_FIELD_VALIDATION_TYPES = {
  firstName: Yup.string().required("Required").min(2, "Too Short!"),
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
    component: "Textfield",
    validationSchema: FORM_FIELD_VALIDATION_TYPES.email,
    initialValue: INITIAL_FIELD_TYPES.text,
  },
  {
    type: "phone",
    label: "Phone",
    component: "Textfield",
    validationSchema: FORM_FIELD_VALIDATION_TYPES.phone,
    initialValue: INITIAL_FIELD_TYPES.text,
  },
  {
    type: "addressLine1",
    label: "Address Line 1",
    component: "Textfield",
    validationSchema: FORM_FIELD_VALIDATION_TYPES.addressLine1,
    initialValue: INITIAL_FIELD_TYPES.text,
  },
  {
    type: "addressLine2",
    label: "Address Line 2",
    component: "Textfield",
    validationSchema: FORM_FIELD_VALIDATION_TYPES.addressLine2,
    initialValue: INITIAL_FIELD_TYPES.text,
  },
  {
    type: "city",
    label: "City",
    component: "Textfield",
    validationSchema: FORM_FIELD_VALIDATION_TYPES.city,
    initialValue: INITIAL_FIELD_TYPES.text,
  },
  {
    type: "state",
    label: "State",
    component: "Textfield",
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
    component: "DateTimePicker",
    validationSchema: FORM_FIELD_VALIDATION_TYPES.arrivealDate,
    initialValue: INITIAL_FIELD_TYPES.text,
  },
  {
    type: "departureDate",
    label: "Departure Date",
    component: "DateTimePicker",
    validationSchema: FORM_FIELD_VALIDATION_TYPES.departureDate,
    initialValue: INITIAL_FIELD_TYPES.text,
  },
  {
    type: "message",
    label: "Message",
    component: "Textfield",
    validationSchema: FORM_FIELD_VALIDATION_TYPES.message,
    initialValue: INITIAL_FIELD_TYPES.text,
  },
  {
    type: "termsOfService",
    label: "Terms of Service",
    component: "Checkbox",
    validationSchema: FORM_FIELD_VALIDATION_TYPES.termsOfService,
    initialValue: INITIAL_FIELD_TYPES.bool,
  },
];

// console.log("INITIAL_FORM_STATE", INITIAL_FORM_STATE)
// console.log("FORM_VALIDATION_SCHEMA", FORM_VALIDATION_SCHEMA)

// const FORM_VALIDATION = Yup.object().shape(FORM_VALIDATION_SCHEMA);

const FormBuilder = () => {
  useEffect(() => {
    console.log("FormBuilder | Rendered");
  }, []);

  const [formState, setFormState] = useState({});

  useEffect(() => {
    console.log("FormBuilder | formState - ", formState);
  }, [formState]);

  const [formValidation, setFormValidation] = useState({});
  const [initialValues, setInitialValues] = useState({});
  const [fields, setFields] = useState([]);
  const fieldsMemo = useMemo(() => fields, [fields]);

  const addField = (fieldType) => {
    const template = FORM_FIELD_TYPES.find((field) => field.type === fieldType);
    template.key = `${template.type}_${template?.component}_${
      fields.length + 2
    }`;

    console.log("template", template);

    setFields((oldFields) => [
      ...oldFields,
      {
        ...template,
        type: template.key,
        key: template.key,
        template: template,
        value: template.initialValue,
        name: template.name,
        validationSchema: template.validationSchema,
      },
    ]);
  };

  useEffect(() => {
    const INITIAL_FORM_STATE = fields.reduce((acc, field) => {
      acc[field.type] = field.initialValue;
      return acc;
    }, {});
    setInitialValues(INITIAL_FORM_STATE);
  }, [fields, fieldsMemo]);

  useEffect(() => {
    const FORM_VALIDATION_SCHEMA = fields.reduce((acc, field) => {
      acc[field.type] = field.validationSchema;
      return acc;
    }, {});

    console.log("FORM_VALIDATION_SCHEMA - ");
    console.log(FORM_VALIDATION_SCHEMA);

    setFormValidation(Yup.object().shape(FORM_VALIDATION_SCHEMA));
  }, [fields, fieldsMemo]);

  const handleChangeHandler = useCallback((values) => {
    console.log("handleChangeHandler | values:  ");
    console.log(values);
  }, []);

  const OnChangeHandler = useCallback((values) => {
    console.log("OnChangeHandler | values:  ");
    console.log(values);
  }, []);

  const onSubmitHandler = (values) => {
    console.log("onSubmitHandler | values - ");
    console.log(values);
    setFormState(values);
  };

  const onResetHandler = () => {
    console.log("onResetHandler");
    setFormState({});
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Container maxWidth="md">
            <Formik
              initialValues={{
                ...initialValues,
              }}
              validationSchema={formValidation}
              handleChange={handleChangeHandler}
              onSubmit={(values) => onSubmitHandler(values)}
              onReset={() => onResetHandler()}
              OnChangeHandler={OnChangeHandler}
            >
              {/* const { errors, touched, dirty, submitForm, isSubmitting, values, resetForm, handleBlur, handleChange } = props; */}
              {({ ...props }) => {
                const {
                  handleSubmit,
                  handleReset,
                  errors,
                  touched,
                  dirty,
                  submitForm,
                  isSubmitting,
                  values,
                  resetForm,
                  handleBlur,
                  handleChange,
                } = props;

                return (
                  <>
                    <Form onSubmit={() => handleSubmit()}>
                      <Fields {...props} fields={fields} />
                      {/* {touched?.[formElement.key] && errors?.[formElement.key] && <div>{errors?.[formElement.key]}</div>} */}
                      {/* {touched && errors && (<div>{errors}</div>)} */}
                      <Grid item xs={12} style={{ marginTop: 14 }}>
                        <SelectFieldsFab
                          fields={FORM_FIELD_TYPES}
                          change={addField}
                        />
                      </Grid>
                      {(touched.length > 0 || dirty.length > 0) &&
                        errors.length > 0 && (
                          <div>{errors.length > 0 ? "Submit Failed." : ""}</div>
                        )}

                      <Grid item xs={12}>
                        <Button
                          type={"submit"}
                          variant={"contained"}
                          color={"primary"}
                          onClick={handleSubmit}
                          disabled={isSubmitting} 
                        >
                          Submit
                        </Button>
                        <Button
                          style={{ marginLeft: 16, marginTop: 14 }}
                          onClick={(e) => {
                            e.preventDefault();
                            handleReset();
                            // onResetHandler();
                          }}
                        >
                          Reset
                        </Button>
                        <Box mt={2}>{isSubmitting && <LinearProgress />}</Box>
                      </Grid>
                    </Form>
                  </>
                );
              }}
            </Formik>
          </Container>
        </Grid>
      </Grid>
    </>
  );
};

export default FormBuilder;
