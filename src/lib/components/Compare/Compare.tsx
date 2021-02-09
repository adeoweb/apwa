import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { useCompare } from 'src/peregrine/lib/talons/adeoweb/Compare/useCompare';
import Table from 'src/lib/components/Compare/Table';
import isObjectEmpty from 'src/lib/util/isObjectEmpty';

const Compare: FunctionComponent = () => {
    const { t } = useTranslation();

    const { productData } = useCompare();

    const productDataIsValid = productData && !isObjectEmpty(productData);

    return (
        <div className="page-main">
            <div className="page-title-wrapper">
                <h1 className="page-title">
                    <span className="base">{t('Compare Products')}</span>
                </h1>
            </div>
            {productDataIsValid ? (
                <Table productData={productData} />
            ) : (
                <div>{t('Product list is empty')}</div>
            )}
        </div>
    );
};

export default Compare;