import { TCategoryInterface } from 'src/lib/types/graphql/Category';
import { TProduct, TProductInterface } from 'src/lib/types/graphql/Product';

function getCategoryPath(category: TCategoryInterface) {
    const { breadcrumbs, url_key: urlKey } = category;

    const parts = (breadcrumbs || []).map(
        breadcrumb => breadcrumb?.category_url_key
    );
    parts.push(urlKey);

    return `/${parts.join('/')}`;
}

export default function getItemUrl(
    {
        url_key: urlKey = '',
        url_suffix: urlSuffix = ''
    }: TProduct | TProductInterface,
    category?: TCategoryInterface
): string {
    const productUrl = urlKey ? `/${urlKey}${urlSuffix}` : '';
    let categoryPath = '';

    if (category) {
        categoryPath = getCategoryPath(category);
    }

    return categoryPath + productUrl;
}
