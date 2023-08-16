import { useFormik } from 'formik';
import TextField from '@commercetools-uikit/text-field';
import TextInput from '@commercetools-uikit/text-input';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import { ErrorMessage } from '@commercetools-uikit/messages';
import { FormDialog, useModalState } from '@commercetools-docs/ui-kit';
import { useContext, useEffect } from 'react';
import { LearningContextApi, LearningContextState } from './learning-context';
import { useUpdateUser } from '../hooks/use-update-user';
import { VerifiedIcon, CheckInactiveIcon } from '@commercetools-uikit/icons';
import SendVerificationEmailButton from './verify-email-button';
import Stamp from '@commercetools-uikit/stamp';

import ConfigContext, {
  EFeatureFlag,
  isFeatureEnabled,
} from '../../../components/config-context';

export type TProfileFormValues = {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  global_account_name: string;
};

const ProfileModal = () => {
  const { selfLearningFeatures } = useContext(ConfigContext);
  const { updateProfile, closeProfileModal } = useContext(LearningContextApi);
  const {
    user: { profile },
    ui: { profileModal },
  } = useContext(LearningContextState);
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
      email: '',
      global_account_name: '',
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

  // binds the modal state to the context isProfileModalOpen property
  useEffect(() => {
    if (!isModalFeatureEnabeld) {
      return;
    }
    if (profileModal) {
      openModal();
    } else {
      closeModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileModal]);

  useEffect(() => {
    if (profile && isModalOpen) {
      formik.setFieldValue('firstName', profile?.given_name || '');
      formik.setFieldValue('lastName', profile?.family_name || '');
      formik.setFieldValue('company', profile?.user_metadata?.company || '');
      formik.setFieldValue('email', profile?.email || '');
      formik.setFieldValue(
        'global_account_name',
        profile?.global_account_name || ''
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile, isModalOpen]);

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
      size="l"
      title={profileModal?.title || 'Update your profile.'}
      labelPrimary="Save"
      isOpen={isModalOpen}
      onClose={
        profileModal?.isDismissable ? () => closeProfileModal() : undefined
      }
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
        <TextField
          key="email"
          name="email"
          title="Email"
          description="Please contact us at training@commercetools.com to change your email"
          value={formik.values.email}
          touched={formik.touched.email}
          errors={
            TextField.toFieldErrors<TProfileFormValues>(formik.errors).email
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          renderError={renderError}
          isReadOnly
          badge={
            profile?.email_verified ? (
              <Stamp
                tone="primary"
                label="Verified"
                icon={<VerifiedIcon size="big" color="info" />}
              />
            ) : (
              <SpacingsInline>
                <SendVerificationEmailButton />
                <Stamp
                  tone="secondary"
                  label="Not Verified"
                  icon={<CheckInactiveIcon size="big" color="info" />}
                />
              </SpacingsInline>
            )
          }
        />
        <TextField
          key="global_account_name"
          name="global_account_name"
          title="Verified Company Association"
          description={
            profile?.global_account_name
              ? 'Please contact us at training@commercetools.com to verify a different company association.'
              : 'Your company association is not automatically verified. Please contact us at training@commercetools.com to verify it.'
          }
          value={formik.values.global_account_name}
          touched={formik.touched.global_account_name}
          errors={
            TextField.toFieldErrors<TProfileFormValues>(formik.errors)
              .global_account_name
          }
          renderError={renderError}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isReadOnly
          badge={
            profile?.global_account_name ? (
              <Stamp
                tone="primary"
                label="Verified"
                icon={<VerifiedIcon size="big" color="info" />}
              />
            ) : (
              <Stamp
                tone="secondary"
                label="Not Verified"
                icon={<CheckInactiveIcon size="big" color="info" />}
              />
            )
          }
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
