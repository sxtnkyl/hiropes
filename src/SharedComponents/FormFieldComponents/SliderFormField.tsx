import theme from '@/styles/theme';
import {
  FormControl,
  FormHelperText,
  Slider,
  SliderProps,
  Stack,
} from '@mui/material';
import { Field, FieldProps, useFormikContext } from 'formik';
import { ReactNode } from 'react';

interface SliderFormFieldProps extends Omit<SliderProps, 'name' | 'onChange'> {
  name: string;
  label: ReactNode;
  onChange?: () => void;
}

const SliderFormField = ({
  name,
  label,
  onChange,
  children,
  ...rest
}: SliderFormFieldProps) => {
  const { handleChange } = useFormikContext();
  return (
    <>
      <Field name={name}>
        {({ field, form }: FieldProps) => (
          <FormControl component={Stack}>
            {label}
            <Slider
              {...field}
              value={field.value || 0}
              onChange={(e) => {
                if (onChange) {
                  onChange();
                }
                handleChange(e);
              }}
              {...rest}
            >
              {children}
            </Slider>
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

export default SliderFormField;
