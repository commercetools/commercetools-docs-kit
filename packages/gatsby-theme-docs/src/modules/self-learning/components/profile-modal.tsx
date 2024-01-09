import { useFormik } from 'formik';
import TextField from '@commercetools-uikit/text-field';
import TextInput from '@commercetools-uikit/text-input';
import SpacingsStack from '@commercetools-uikit/spacings-stack';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import { ErrorMessage } from '@commercetools-uikit/messages';
import {
  FormDialog,
  useModalState,
  designSystem,
} from '@commercetools-docs/ui-kit';
import { useContext, useEffect } from 'react';
import styled from '@emotion/styled';
import {
  AuthenticatedContextApi,
  AuthenticatedContextState,
} from '../../../components/authenticated-context';
import { useUpdateUser } from '../hooks/use-update-user';
import { VerifiedIcon, LogoutIcon } from '@commercetools-uikit/icons';
import SendVerificationEmailButton from './verify-email-button';
import Stamp from '@commercetools-uikit/stamp';
import Label from '@commercetools-uikit/label';
import Link from '@commercetools-uikit/link';
import useAuthentication from '../../sso/hooks/use-authentication';
import { onLogout } from '../../sso/utils/common.utils';
import { gtagEvent } from '../../sso/utils/analytics.utils';
import { getLogoutReturnUrl } from '../../sso/components/sso.utils';

import ConfigContext, {
  EFeatureFlag,
  isFeatureEnabled,
} from '../../../components/config-context';

const CompanyVerifiedInfo = styled.div`
  display: inline-block;
  font-weight: ${designSystem.typography.fontWeights.medium};
  font-size: ${designSystem.typography.fontSizes.small};
  line-height: ${designSystem.typography.lineHeights.body};
`;

export type TProfileFormValues = {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  global_account_name: string;
};
const mailToData = {
  email: 'training@commercetools.com',
  email_change_request: {
    subject: 'commercetools ID: Data Change Request',
    body: "Hi,%0A%0A I'm writing to change my email.%0A%0A Thanks%0A",
  },
  company_association_verify_request: {
    subject: 'commercetools ID: Data Change Request',
    body: "Hi,%0A%0A I'm writing to verify my company association.%0A%0A Thanks%0A",
  },
};
const ProfileModal = () => {
  const { logout } = useAuthentication();
  const { selfLearningFeatures, learnApiBaseUrl } = useContext(ConfigContext);
  const { updateProfile, closeProfileModal } = useContext(
    AuthenticatedContextApi
  );
  const {
    user: { profile },
    ui: { profileModal },
  } = useContext(AuthenticatedContextState);
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

  const executeLogout = () => {
    gtagEvent('logout'); // custom, matching "login"
    onLogout();
    logout({
      logoutParams: {
        returnTo: getLogoutReturnUrl(learnApiBaseUrl, document.location),
      },
    });
    closeProfileModal();
  };

  return (
    <FormDialog
      testid="profile-modal"
      size="l"
      title={profileModal?.title || 'Update your profile.'}
      labelPrimary="Save"
      labelFlatButton="Logout"
      displayFlatButton
      iconLeftFlatButton={<LogoutIcon />}
      onFlatButtonClick={executeLogout}
      displaySecondaryButton={false}
      zIndex={1003} // needs to be higher than the AI assistant modal
      isOpen={isModalOpen}
      onClose={
        profileModal?.isDismissable ? () => closeProfileModal() : undefined
      }
      isPrimaryButtonDisabled={
        !(formik.isValid && formik.dirty) || formik.isSubmitting || isLoading
      }
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
        <SpacingsStack>
          <SpacingsInline alignItems="center">
            <Label>Email</Label>
            {profile?.email_verified ? (
              <Stamp
                tone="primary"
                label="Verified"
                isCondensed
                icon={<VerifiedIcon size="big" color="info" />}
              />
            ) : (
              <Stamp isCondensed tone="secondary" label="Not Verified" />
            )}
          </SpacingsInline>
          <Label>
            <Link
              isExternal
              to={`mailto:${mailToData.email}?subject=${mailToData.email_change_request.subject}&body=${mailToData.email_change_request.body}`}
            >
              Please contact us to change it.
            </Link>
          </Label>
          <TextInput
            key="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isReadOnly
          />
          {!profile?.email_verified ? (
            <SpacingsInline alignItems="flex-end" justifyContent="flex-end">
              <SendVerificationEmailButton />
            </SpacingsInline>
          ) : (
            ''
          )}
        </SpacingsStack>
        <SpacingsStack>
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
          {profile?.global_account_name ? (
            <SpacingsStack>
              <CompanyVerifiedInfo>
                Your verified company association is{' '}
                <b>{profile.global_account_name}</b> with ID{' '}
                <b>{profile.global_account_id}</b>
              </CompanyVerifiedInfo>
              <Label>
                <Link
                  isExternal
                  to={`mailto:${mailToData.email}?subject=${mailToData.company_association_verify_request.subject}&body=${mailToData.company_association_verify_request.body}`}
                >
                  Please contact us to change it.
                </Link>
              </Label>
            </SpacingsStack>
          ) : (
            <Label>
              <SpacingsStack>
                Your company association is not verified.
                <Link
                  isExternal
                  to={`mailto:${mailToData.email}?subject=${mailToData.company_association_verify_request.subject}&body=${mailToData.company_association_verify_request.body}`}
                >
                  Please contact us to verify it.
                </Link>
              </SpacingsStack>
            </Label>
          )}
        </SpacingsStack>

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
