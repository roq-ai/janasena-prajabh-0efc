import * as yup from 'yup';

export const eventValidationSchema = yup.object().shape({
  name: yup.string().required(),
  date: yup.date().required(),
  location: yup.string().required(),
  janasena_id: yup.string().nullable().required(),
});
