import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons/faCheckCircle';
import { faCircle } from '@fortawesome/free-solid-svg-icons/faCircle';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { getProducts, deleteProduct, checkedProduct } from '../app/app';
function Products() {

    const [products, setProducts] = useState([
    ]);

    useEffect(() => {
        handleGetProducts();
    }, []);
    const handleGetProducts = () => {
        getProducts().then((res) => {
        setProducts(res.data);
        }).catch((err) => {
            console.log('Error', err);
            });
    }
    const handleDeleteProduct = (product) => {
        deleteProduct(product).then((res) => {
          // Use filter to create a new array without the deleted product
          const newProducts = products.filter((pd) => pd.id !== product.id);
          setProducts(newProducts); // Update the state with the filtered list
        });
      };
      
    const handleCheckProduct  = (product) => {
        checkedProduct(product).then((res)=>{
        const newProducts  = products.map(pd =>{
            if  (pd.id ===product.id)  {
             pd.checked  =!pd.checked;
            }
            return  pd;
        }  );
        setProducts(newProducts);
        });
    };
    return (
        <div className='p-1 m-1'>
            <div className='row'>
                <div className='col-md-6'>
                    <div className='card'>

                        <div className='card-body'>
                            <table className='table table-striped'>
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Checked</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => (
                                        <tr key={product.id}>
                                            <td>{product.id}</td>
                                            <td>{product.name}</td>
                                            <td>{product.price}</td>
                                            <td>
                                                <button onClick={() => handleCheckProduct(product)}className='btn btn-outline-success'>
                                                    <FontAwesomeIcon icon={product.checked ? faCheckCircle : faCircle} />
                                                </button>
                                            </td>
                                            <td>
                                                <button onClick={() => handleDeleteProduct(product)} className='btn btn-outline-danger'>
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div></div>
    )
}


export default Products