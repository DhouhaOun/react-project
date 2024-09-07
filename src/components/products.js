import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons/faCheckCircle';
import { faCircle } from '@fortawesome/free-solid-svg-icons/faCircle';
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { getProducts, deleteProduct, checkedProduct } from '../app/app';
function Products() {

    const [state, setState] = useState({
        products: [],
        currentPage: 1,
        pageSize: 4,
        keyword: "",
        totalpages: "",
    });

    useEffect(() => {
        handleGetProducts(state.keyword, state.currentPage, state.pageSize);
    }, []);
    const handleGetProducts = (keyword, page, size) => {
        getProducts(keyword, page, size).then((res) => {
            const totalelement = res.headers['X-Total-Count'] || res.headers['x-total-count'];

            console.log("Total",totalelement);
            console.log("repnse",res); // Log the headers to inspect them

        let totalpages =Math.floor(totalelement/state.size);
        if (totalelement % size > 0){
            totalpages++;
        }
            setState({ products: res.data, keyword: keyword, currentPage: page, pageSize: size , totalpages:totalpages });
        }).catch((err) => {
            console.log('Error', err);
        });
    }
    const handleDeleteProduct = (product) => {
        deleteProduct(product).then((res) => {
            const newProducts = state.products.filter((pd) => pd.id !== product.id);
            setState({ ...state, products: newProducts });
        });
    };

    const handleCheckProduct = (product) => {
        checkedProduct(product).then((res) => {
            const newProducts = state.products.map(pd => {
                if (pd.id === product.id) {
                    pd.checked = !pd.checked;
                }
                return pd;
            });
            setState({ ...state, products: newProducts });
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
                                    {Array.isArray(state.products) && state.products.length > 0 ? (
                                        state.products.map((product) => (
                                            <tr key={product.id}>
                                                <td>{product.id}</td>
                                                <td>{product.name}</td>
                                                <td>{product.price}</td>
                                                <td>
                                                    <button
                                                        onClick={() => handleCheckProduct(product)}
                                                        className='btn btn-outline-success'
                                                    >
                                                        <FontAwesomeIcon icon={product.checked ? faCheckCircle : faCircle} />
                                                    </button>
                                                </td>
                                                <td>
                                                    <button
                                                        onClick={() => handleDeleteProduct(product)}
                                                        className='btn btn-outline-danger'
                                                    >
                                                        <FontAwesomeIcon icon={faTrash} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5">No products available</td>
                                        </tr>
                                    )}
                                </tbody>

                            </table>
                            <ul className='nav nav-pills'>
  {
    state.totalpages > 0 
      ? (new Array(state.totalpages).fill(0)).map((_, index) => (
        <li key={index}>
          <button className='btn btn-outline-info ms-1'>{index + 1}</button>
        </li>
      ))
      : null
  }
</ul>

                        </div>
                    </div>
                </div>
            </div></div>
    )
}


export default Products