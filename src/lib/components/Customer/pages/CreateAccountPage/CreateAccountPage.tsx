import React, { FunctionComponent } from 'react';

import CreateAccountForm from '../../AccountForm';
import PageHeader from 'src/lib/components/PageHeader';
import { useTranslation } from 'react-i18next';
import AuthUserToRoot from 'src/lib/components/AuthUserToRoot';

const CreateAccountPage: FunctionComponent = () => {
    const { t } = useTranslation();

    return (
        <AuthUserToRoot>
            <PageHeader>{t('Create New Customer Account')}</PageHeader>
            <CreateAccountForm />
        </AuthUserToRoot>
    );
};

export default CreateAccountPage;
