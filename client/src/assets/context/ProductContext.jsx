import React, { createContext, useState, useEffect } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    // گرفتن محصولات از سرور
    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/product');
            const data = await res.json();
            setProducts(data);
        } catch (err) {
            console.error('Failed to fetch products', err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);


    // اضافه کردن محصول
    const addProduct = async (product) => {
        try {
            const res = await fetch('/api/product', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(product),
            });

            if (res.ok) {
                const newProduct = await res.json();
                setProducts(prev => [...prev, newProduct]);
            } else {
                alert('Failed to add product');
            }
        } catch (err) {
            alert('Error connecting to server');
        }
    };

    // حذف محصول
    const deleteProduct = async (id) => {
        try {
            const res = await fetch(`/api/product/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setProducts(prev => prev.filter(p => p.id !== id));
            } else {
                alert('Failed to delete product');
            }
        } catch (err) {
            alert('Error connecting to server');
        }
    };

    // ویرایش محصول
    const editProduct = async (id, updatedProduct) => {
        try {
            const res = await fetch(`/api/product/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedProduct),
            });
            if (res.ok) {
                const editedProduct = await res.json();
                setProducts(prev => prev.map(p =>
                    p.id === id ? editedProduct : p
                ));
            } else {
                alert('Failed to edit product');
            }
        } catch (err) {
            alert('Error connecting to server');
        }
    };

    return (
        <ProductContext.Provider value={{
            products,
            editProduct,
            addProduct,
            deleteProduct
        }}>
            {children}
        </ProductContext.Provider>
    );
};
