import theme from '@/styles/theme';
import {
  FormControl,
  FormHelperText,
  Slider,
  SliderProps,
  Stack,
  Typography,
} from '@mui/material';
import { Field, FieldProps, useFormikContext } from 'formik';

interface SliderFormFieldProps extends Omit<SliderProps, 'name' | 'onChange'> {
  name: string;
  label: string;
  onChange: () => void;
}

const SliderFormField = ({
  name,
  label,
  onChange,
  children,
  ...rest
}: SliderFormFieldProps) => {
  const { setFieldValue } = useFormikContext();
  return (
    <>
      <Field name={name}>
        {({ field, form }: FieldProps) => (
          <FormControl component={Stack}>
            <Typography>{label}</Typography>
            <Slider
              {...field}
              value={field.value || 0}
              onChange={(e, val) => {
                if (onChange) {
                  onChange();
                }
                setFieldValue(name, val);
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
