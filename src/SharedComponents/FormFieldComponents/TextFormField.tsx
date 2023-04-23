import { TextField, TextFieldProps } from '@mui/material';
import { Field, FieldProps } from 'formik';

interface TextFormFieldProps extends Omit<TextFieldProps, 'name'> {
  name: string;
  label: string;
}

const TextFormField = ({ name, label, ...rest }: TextFormFieldProps) => {
  return (
    <>
      <Field name={name}>
        {({ field, form }: FieldProps) => (
          <TextField
            {...field}
            value={field.value || ''}
            label={label}
            {...rest}
            error={form.touched[name] && Boolean(form.errors[name])}
            helperText={
              form.touched[name] && <span>{form.errors[name]?.toString()}</span>
            }
          />
        )}
      </Field>
    </>
  );
};

export default TextFormField;
