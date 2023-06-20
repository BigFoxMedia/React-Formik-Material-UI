import React, { useEffect } from "react";
// import { Formik, Form, Field, useField } from "formik";
import { Grid } from "@material-ui/core";
import Textfield from "../Components/FormsUI/Textfield";


import Select from "../Components/FormsUI/Select";
// import DateTimePicker from "../Components/FormsUI/DataTimePicker";
// import Checkbox from "../Components/FormsUI/Checkbox";

const Fields = ({ handleChange, handleBlur, value, ...props }) => {
  useEffect(() => {
    console.log("props - ");
    console.log(props);
  }, [props]);

  /* const isFieldRequired = (fieldName) => {
    return props.fields.find((field) => field.type === fieldName);
  }; */

  return (
    <>
      <Grid container spacing={2} style={{ marginTop: 20 }}>
        <Grid item>
          {props.fields.map((field) => {
            console.log("field", field);
            switch (field.component) {
              case "Textfield":
                return (
                  <Textfield
                    key={field.key}
                    name={field.type}
                    label={field.label}
                    value={
                      props?.values?.[field?.key] ||
                      field?.template?.initialValue
                    }
                  />
                );
              case "Select":
                return (
                  <Select
                    fullWidth
                    key={field.key}
                    name={field.type}
                    label={field.label}
                    options={field.options}
                    value={
                      props?.values?.[field?.key] ||
                      field?.template?.initialValue
                    }
                  />
                );

              default:
                return <></>;
            }
          })}
        </Grid>

        {/* {props.fields.map((field) => {
          return (
            <Field item xs={6} key={field.key} component={Textfield} name={field.type} label={field.label} {...props} {...field}>
              
            </Field>
          );
        })} */}

        {/* {isFieldRequired("firstName") && (
          <Grid item xs={6}>
            <Textfield name="firstName" label="First Name" />
          </Grid>
        )}

        {isFieldRequired("lastName") && (
          <Grid item xs={6}>
            <Textfield name="lastName" label="Last Name" />
          </Grid>
        )}

        {isFieldRequired("email") && (
          <Grid item xs={12}>
            <Textfield name="email" label="Email" />
          </Grid>
        )}

        {isFieldRequired("phone") && (
          <Grid item xs={12}>
            <Textfield name="phone" label="Phone" />
          </Grid>
        )}

        <Grid item xs={12}>
          <Typography>Address</Typography>
        </Grid>

        {isFieldRequired("addressLine1") && (
          <Grid item xs={12}>
            <Textfield name="addressLine1" label="Address Line 1" />
          </Grid>
        )}

        {isFieldRequired("addressLine2") && (
          <Grid item xs={12}>
            <Textfield name="addressLine2" label="Address Line 2" />
          </Grid>
        )}

        {isFieldRequired("city") && (
          <Grid item xs={6}>
            <Textfield name="city" label="City" />
          </Grid>
        )}

        {isFieldRequired("state") && (
          <Grid item xs={6}>
            <Textfield name="state" label="State" />
          </Grid>
        )}

        {isFieldRequired("country") && (
          <Grid item xs={12}>
            <Select name="country" label="Country" options={countries} />
          </Grid>
        )}

        <Grid item xs={12}>
          <Typography>Booking information</Typography>
        </Grid>

        {isFieldRequired("numberOfGuests") && (
          <Grid item xs={6}>
            <DateTimePicker name="arrivealDate" label="Arrival Date" />
          </Grid>
        )}

        {isFieldRequired("numberOfGuests") && (
          <Grid item xs={6}>
            <DateTimePicker name="departureDate" label="Departure Date" />
          </Grid>
        )}

        {isFieldRequired("numberOfGuests") && (
          <Grid item xs={12}>
            <Textfield
              name="message"
              label="Message"
              multiline={true}
              rows={4}
            />
          </Grid>
        )}

        {isFieldRequired("numberOfGuests") && (
          <Grid item xs={12}>
            <Checkbox
              name="termsOfService"
              legend="Terms Of Service"
              label="I agree"
            />
          </Grid>
        )} */}

      </Grid>
    </>
  );
};

export default Fields;
