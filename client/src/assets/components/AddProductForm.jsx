import React, { useState, useContext } from 'react';
import { ProductContext } from '../context/ProductContext';

export default function AddProductForm() {
    const { addProduct } = useContext(ProductContext);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        imageUrl: '',
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = e => {
        e.preventDefault();
        addProduct({ ...formData, price: parseFloat(formData.price) });
        setFormData({ name: '', description: '', price: '', imageUrl: '' });
    };

    return (
        <form onSubmit={handleSubmit} className='flex flex-col gap-2 py-2'>
            <input className='py-2 text-center' name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
            <input className='py-2 text-center' name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
            <input className='py-2 text-center' name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} placeholder="Price" required />
            <button type="submit">Add Product</button>
        </form>
    );
}
