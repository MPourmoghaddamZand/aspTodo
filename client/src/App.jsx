import React from 'react';
import ProductList from './assets/components/ProductList';
import AddProductForm from './assets/components/AddProductForm';
import { ProductProvider } from './assets/context/ProductContext';

const App = () => {
  return (
    <ProductProvider>
      <div className='flex flex-col gap-2 w-screen h-screen justify-center items-center'>
        <AddProductForm />
        <ProductList /> 
      </div>
    </ProductProvider>
  );
}

export default App;
