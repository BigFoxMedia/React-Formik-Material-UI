import React, { useEffect } from "react";

import FormsUiComponents from "../Components/FormsUI/FormsUiComponents";

// import { Formik, Form, Field, useField } from "formik";
import { Grid } from "@material-ui/core";

const Fields = ({ ...props }) => {
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

  useEffect(() => {
    console.log("FormBuilder | Fields | Rendered");
  }, []);

  return (
    <>
      <Grid container spacing={2} style={{ marginTop: 20 }}>
        <Grid item>
          {props.fields.map(({ ...field }) => {
            console.log("touched?.[field.key] - ", touched?.[field.key]);
            console.log("dirty?.[field.key] - ", dirty?.[field.key]);
            console.log("errors?.[field.key] - ", errors?.[field.key]);
            return (
              <FormsUiComponents key={field.key} field={field} props={props} />
            );
          })}
        </Grid>
      </Grid>
    </>
  );
};

export default Fields;
