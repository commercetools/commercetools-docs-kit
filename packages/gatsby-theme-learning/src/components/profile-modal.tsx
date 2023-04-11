import { useFormik } from 'formik';
import TextField from '@commercetools-uikit/text-field';
import TextInput from '@commercetools-uikit/text-input';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { FormDialog, useModalState } from '@commercetools-docs/ui-kit';
import { useContext, useEffect } from 'react';
import { LearningContext } from './learning-context';
import type { User } from '@auth0/auth0-react';
import { useAuthToken } from '../hooks/use-auth-token';
import ConfigContext from './config-context';

export type TProfileFormValues = {
  firstName: string;
  lastName: string;
  company: string;
};

const isProfileComplete = (userData: User): boolean =>
  userData.given_name &&
  userData.given_name !== '' &&
  userData.family_name &&
  userData.family_name !== '' &&
  userData?.user_metadata?.company &&
  userData.user_metadata.company !== '';

const ProfileModal = () => {
  const {
    user: { profile },
  } = useContext(LearningContext);
  const { auth0Domain } = useContext(ConfigContext);
  const { getAuthToken } = useAuthToken();
  const formik = useFormik<TProfileFormValues>({
    initialValues: {
      firstName: profile?.given_name || '',
      lastName: profile?.family_name || '',
      company: profile?.user_metadata?.company || '',
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
      const userPatchBody = {
        family_name: formikValues.lastName,
        given_name: formikValues.firstName,
        user_metadata: {
          company: formikValues.company,
        },
      };
      // TODO: implement once the new endpoint will be available
      // const authToken = await getAuthToken();
      // const getUserApiEndpoint = `https://${auth0Domain}/api/v2/users/${profile?.user_id}`;
      // const data = await fetch(getUserApiEndpoint, {
      //   method: 'PATCH',
      //   body: JSON.stringify(userPatchBody),
      //   headers: {
      //     Accept: 'application/json',
      //     Authorization: `Bearer ${authToken}`,
      //     'Content-Type': 'application/json',
      //   },
      // });
      // const userData = (await data.json()) as User;
      // console.log('userData', userData)
      // updateProfile(userData);
    },
  });

  const { closeModal, openModal, isModalOpen } = useModalState();

  useEffect(() => {
    if (profile) {
      isProfileComplete(profile) ? closeModal() : openModal();
    }
  }, [profile]);

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
      isOpen={isModalOpen}
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
