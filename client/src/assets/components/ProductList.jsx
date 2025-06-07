import React, { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';

export default function ProductList() {
    const { products, deleteProduct } = useContext(ProductContext);

    return (
        <div>
            {products.map(product => (
                <div className='m-2 flex gap-5 justify-center items-center' key={product.id}>
                    <span>{product.name +` `+ product.price}</span>
                    <button onClick={() => deleteProduct(product.id)}>X</button>
                </div>
            ))}
        </div>
    );
}
