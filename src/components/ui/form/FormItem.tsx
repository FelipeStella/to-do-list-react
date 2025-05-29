import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { ErrorsContext, LabelWidthContext } from "src/contexts/FormContexts";

type FormItemProps = {
  label?: string;
  required?: boolean;
  field?: string;
  // eslint-disable-next-line no-unused-vars
  validate?: (value: any) => boolean | string;
  help?: string;
  children?: React.ReactNode;
};

const FormItem: React.FC<FormItemProps> = ({
  label,
  // eslint-disable-next-line no-unused-vars
  required = false,
  field,
  help,
  children,
}) => {
  const errors = useContext(ErrorsContext);
  const labelWidth = useContext(LabelWidthContext) ?? 8;

  const fieldErrors = errors.filter((x) => x.field === field);
  const errorMessage = fieldErrors.map((x) => x.message).join("\n ");

  return (
    <Box
      className="form-item"
      sx={{ display: "flex", flexDirection: "row", mb: 2 }}
      {...({ name: field } as React.HTMLAttributes<HTMLDivElement>)}>
      {label !== undefined && (
        <Box
          className={`form-label form-label-${labelWidth}`}
          sx={{
            width: `${labelWidth}rem`,
            fontWeight: 500,
            pr: 2,
            display: "flex",
            alignItems: "center",
          }}>
          {label}
        </Box>
      )}
      <Box sx={{ flex: 1 }}>
        <Box>{children}</Box>
        {errorMessage && (
          <Typography
            className="form-validation"
            sx={{ color: "error.main", fontSize: "0.875rem", mt: 0.5 }}>
            {errorMessage}
          </Typography>
        )}
        {help && (
          <Typography
            className="form-help"
            sx={{ color: "text.secondary", fontSize: "0.75rem", mt: 0.5 }}>
            {help}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default FormItem;
