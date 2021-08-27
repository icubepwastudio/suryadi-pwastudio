import { useToasts } from '@magento/peregrine';
import { useProduct } from '@magento/peregrine/lib/talons/RootComponents/Product/useProduct';
import Icon from '@magento/venia-ui/lib/components/Icon';
import Logo from '@magento/venia-ui/lib/components/Logo';
import mapProduct from '@magento/venia-ui/lib/util/mapProduct';
import React, { useEffect } from 'react';
import { AlertCircle } from 'react-feather';
import RichText from '@magento/venia-ui/lib/components/RichText';

const Example = props => {
    const errorIcon = <Icon src={AlertCircle} />;
    const [, { addToast }] = useToasts();
    const talonProps = useProduct({ mapProduct });
    const { error, loading, product } = talonProps;

    console.log('product', product);
    console.log('talon', talonProps);

    // useEffect(() => {
    //     addToast({
    //         type: 'error',
    //         icon: errorIcon,
    //         message: 'Hello World',
    //         dismissable: true,
    //         timeout: 10000
    //     });
    // }, [addToast]);

    if (loading && !product) return <div>Loading...</div>;
    if (error) return <div>Data Fetch Error</div>;

    return (
        <>
            <div style={{ textAlign: 'center' }}>
                <Logo height={40} />
                Example
                <div className="product-detail" style={{ display: 'flex' }}>
                    <img src={product.small_image} width={500} />
                    <RichText content={product.description} />
                </div>
            </div>
        </>
    );
};

export default Example;
