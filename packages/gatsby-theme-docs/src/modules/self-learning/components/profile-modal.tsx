import { useFormik } from 'formik';
import TextField from '@commercetools-uikit/text-field';
import TextInput from '@commercetools-uikit/text-input';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import { ErrorMessage } from '@commercetools-uikit/messages';
import { FormDialog, useModalState } from '@commercetools-docs/ui-kit';
import { useContext, useEffect } from 'react';
import { LearningContext } from './learning-context';
import type { User } from '@auth0/auth0-react';
import { useUpdateUser } from '../hooks/use-update-user';
import ConfigContext, {
  EFeatureFlag,
  isFeatureEnabled,
} from '../../../components/config-context';

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
    updateProfile,
  } = useContext(LearningContext);
  const { selfLearningFeatures } = useContext(ConfigContext);
  const { performUpdateUser, isLoading, updatedUser, error } = useUpdateUser({
    userId: profile?.user_id || '',
  });

  const isModalFeatureEnabeld = isFeatureEnabled(
    EFeatureFlag.CompleteProfileModal,
    selfLearningFeatures
  );

  const formik = useFormik<TProfileFormValues>({
    initialValues: {
      firstName: '',
      lastName: '',
      company: '',
    },
    validate: (formikValues: TProfileFormValues) => {
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
      const updatedUserBody = {
        family_name: formikValues.lastName,
        given_name: formikValues.firstName,
        company: formikValues.company,
      };
      performUpdateUser(updatedUserBody);
    },
  });

  const { closeModal, openModal, isModalOpen } = useModalState();

  useEffect(() => {
    if (isModalFeatureEnabeld && profile) {
      isProfileComplete(profile) ? closeModal() : openModal();
      formik.setFieldValue('firstName', profile?.given_name || '');
      formik.setFieldValue('lastName', profile?.family_name || '');
      formik.setFieldValue('company', profile?.user_metadata?.company || '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile, isModalFeatureEnabeld]);

  useEffect(() => {
    if (updatedUser) {
      updateProfile(updatedUser);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updatedUser]);

  const renderError = (errorKey: string) => {
    if (errorKey === 'missing') {
      return 'Required field.';
    }
    return null;
  };

  return (
    <FormDialog
      testid="profile-modal"
      size="m"
      title="Tell us a bit about yourself"
      labelPrimary="Save"
      isOpen={isModalOpen}
      isPrimaryButtonDisabled={
        !(formik.isValid && formik.dirty) || formik.isSubmitting || isLoading
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
        {error && (
          <ErrorMessage>
            An error occurred while updating your profile, please try again.
          </ErrorMessage>
        )}
      </SpacingsStack>
    </FormDialog>
  );
};

export default ProfileModal;
