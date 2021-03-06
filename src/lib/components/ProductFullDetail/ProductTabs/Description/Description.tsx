import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';

import RichText from 'src/lib/components/RichText';

interface IDescriptionProps {
    description: string;
}

const descriptionTitle = 'Description';

const Description: FunctionComponent<IDescriptionProps> = ({ description }) => {
    const { t } = useTranslation('product');

    const fallback = t('Description not available');

    return (
        <div className="product-desc-content">
            <RichText content={description || fallback} />
        </div>
    );
};

export { descriptionTitle, Description };
