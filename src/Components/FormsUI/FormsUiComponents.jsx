import React from "react";

import Textfield from "./Textfield";
import Select from "./Select";
import DateTimePicker from "./DataTimePicker";
import Checkbox from "./Checkbox";

const FormsUiComponents = ({ field, props }) => {
  switch (field.component) {
    case "Textfield":
      return (
        <Textfield
          key={field.key}
          name={field.type}
          label={field.label}
          value={props?.values?.[field?.key] || field?.template?.initialValue}
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
          value={props?.values?.[field?.key] || field?.template?.initialValue}
        />
      );
    case "DateTimePicker":
      return (
        <DateTimePicker
          fullWidth
          key={field.key}
          name={field.type}
          label={field.label}
          options={field.options}
          value={props?.values?.[field?.key] || field?.template?.initialValue}
        />
      );
    case "Checkbox":
      return (
        <Checkbox
          fullWidth
          key={field.key}
          name={field.type}
          label={field.label}
          options={field.options}
          legend={field.label}
          value={props?.values?.[field?.key] || field?.template?.initialValue}
        />
      );

    default:
      return <></>;
  }
};

export default FormsUiComponents;
