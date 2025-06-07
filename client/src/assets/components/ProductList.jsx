import React, { useContext, useState } from 'react';
import { ProductContext } from '../context/ProductContext';

export default function ProductList() {
    const { products, deleteProduct, editProduct } = useContext(ProductContext);
    const [editId, setEditId] = useState(null);
    const [editData, setEditData] = useState({ name: '', description: '', price: '', imageUrl: '' });

    const handleEditClick = (product) => {
        setEditId(product.id);
        setEditData({
            name: product.name,
            description: product.description,
            price: product.price,
            imageUrl: product.imageUrl || ''
        });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditData(prev => ({ ...prev, [name]: value }));
    };

    const handleEditSubmit = (e, id) => {
        e.preventDefault();
        editProduct(id, { id, ...editData, price: parseFloat(editData.price) });
        setEditId(null);
    };

    return (
        <div>
            {products.map(product => (
                <div className='m-2 flex flex-col gap-2 items-center' key={product.id}>
                    <div className='flex gap-5 justify-center items-center'>
                        <span>{product.name + ` ` + product.price}</span>
                        <button onClick={() => deleteProduct(product.id)}>X</button>
                        <button onClick={() => handleEditClick(product)}>Edit</button>
                    </div>
                    {editId === product.id && (
                        <form onSubmit={e => handleEditSubmit(e, product.id)} className='flex flex-col gap-2 p-2 border rounded'>
                            <input name='name' value={editData.name} onChange={handleEditChange} placeholder='Name' required />
                            <input name='description' value={editData.description} onChange={handleEditChange} placeholder='Description' required />
                            <input name='price' type='number' step='0.01' value={editData.price} onChange={handleEditChange} placeholder='Price' required />
                            <input name='imageUrl' value={editData.imageUrl} onChange={handleEditChange} placeholder='Image URL' />
                            <div className='flex gap-2'>
                                <button type='submit'>Save</button>
                                <button type='button' onClick={() => setEditId(null)}>Cancel</button>
                            </div>
                        </form>
                    )}
                </div>
            ))}
        </div>
    );
}
