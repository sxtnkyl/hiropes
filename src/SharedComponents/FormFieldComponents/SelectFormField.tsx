import theme from '@/styles/theme';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  SelectProps,
} from '@mui/material';
import { Field, FieldProps } from 'formik';

interface SelectFormFieldProps extends Omit<SelectProps, 'name'> {
  name: string;
  label: string;
}

const SelectFormField = ({
  name,
  label,
  children,
  ...rest
}: SelectFormFieldProps) => {
  return (
    <>
      <Field name={name}>
        {({ field, form }: FieldProps) => (
          <FormControl>
            <InputLabel>{label}</InputLabel>
            <Select
              {...field}
              value={field.value || ''}
              label={label}
              {...rest}
              error={form.touched[name] && Boolean(form.errors[name])}
            >
              {children}
            </Select>
            {form.touched[name] && Boolean(form.errors[name]) && (
              <FormHelperText sx={{ color: theme.palette.error.main }}>
                {form.errors[name]?.toString()}
              </FormHelperText>
            )}
          </FormControl>
        )}
      </Field>
    </>
  );
};

export default SelectFormField;
