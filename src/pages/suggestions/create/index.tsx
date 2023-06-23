import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createSuggestion } from 'apiSdk/suggestions';
import { Error } from 'components/error';
import { suggestionValidationSchema } from 'validationSchema/suggestions';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { UserInterface } from 'interfaces/user';
import { JanasenaInterface } from 'interfaces/janasena';
import { getUsers } from 'apiSdk/users';
import { getJanasenas } from 'apiSdk/janasenas';
import { SuggestionInterface } from 'interfaces/suggestion';

function SuggestionCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: SuggestionInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createSuggestion(values);
      resetForm();
      router.push('/suggestions');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<SuggestionInterface>({
    initialValues: {
      description: '',
      citizen_id: (router.query.citizen_id as string) ?? null,
      janasena_id: (router.query.janasena_id as string) ?? null,
    },
    validationSchema: suggestionValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Suggestion
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="description" mb="4" isInvalid={!!formik.errors?.description}>
            <FormLabel>Description</FormLabel>
            <Input type="text" name="description" value={formik.values?.description} onChange={formik.handleChange} />
            {formik.errors.description && <FormErrorMessage>{formik.errors?.description}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'citizen_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <AsyncSelect<JanasenaInterface>
            formik={formik}
            name={'janasena_id'}
            label={'Select Janasena'}
            placeholder={'Select Janasena'}
            fetcher={getJanasenas}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'suggestion',
  operation: AccessOperationEnum.CREATE,
})(SuggestionCreatePage);
