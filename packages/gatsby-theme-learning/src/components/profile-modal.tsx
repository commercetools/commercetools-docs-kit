import { useFormik } from 'formik';
import TextField from '@commercetools-uikit/text-field';
import TextInput from '@commercetools-uikit/text-input';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { FormDialog, useModalState } from '@commercetools-docs/ui-kit';

export type TProfileFormValues = {
  firstName: string;
  lastName: string;
  company: string;
};

const ProfileModal = () => {
  const formModalState = useModalState();
  const formik = useFormik<TProfileFormValues>({
    initialValues: {
      firstName: '',
      lastName: '',
      company: '',
    },
    validate: (formikValues) => {
      const missingFields: Record<string, { missing: boolean }> = {};
      if (TextInput.isEmpty(formikValues.firstName)) {
        missingFields.firstName = { missing: true };
      }
      if (TextInput.isEmpty(formikValues.lastName)) {
        missingFields.lastName = { missing: true };
      }
      if (TextInput.isEmpty(formikValues.company)) {
        missingFields.company = { missing: true };
      }
      return missingFields;
    },
    onSubmit: async (formikValues: TProfileFormValues) => {
      // Do something async
    },
  });

  const renderError = (errorKey: string) => {
    if (errorKey === 'missing') {
      return 'Required field.';
    }
    return null;
  };

  return (
    <FormDialog
      title="Tell us a bit about yourself"
      labelPrimary="Save"
      isOpen={true}
      isPrimaryButtonDisabled={
        !(formik.isValid && formik.dirty) || formik.isSubmitting
      }
      displaySecondaryButton={false}
      onPrimaryButtonClick={
        formik.handleSubmit as unknown as (e: React.SyntheticEvent) => void
      }
    >
      <SpacingsStack scale="xl">
        <TextField
          key="firstName"
          name="firstName"
          title="First name"
          isRequired
          value={formik.values.firstName}
          touched={formik.touched.firstName}
          errors={
            TextField.toFieldErrors<TProfileFormValues>(formik.errors).firstName
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          renderError={renderError}
        />
        <TextField
          key="lastName"
          name="lastName"
          title="Last name"
          isRequired
          value={formik.values.lastName}
          touched={formik.touched.lastName}
          errors={
            TextField.toFieldErrors<TProfileFormValues>(formik.errors).lastName
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          renderError={renderError}
        />
        <TextField
          key="company"
          name="company"
          title="Company"
          isRequired
          value={formik.values.company}
          touched={formik.touched.company}
          errors={
            TextField.toFieldErrors<TProfileFormValues>(formik.errors).company
          }
          renderError={renderError}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </SpacingsStack>
    </FormDialog>
  );
};

export default ProfileModal;
