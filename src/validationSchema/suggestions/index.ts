import * as yup from 'yup';

export const suggestionValidationSchema = yup.object().shape({
  description: yup.string().required(),
  citizen_id: yup.string().nullable().required(),
  janasena_id: yup.string().nullable().required(),
});
