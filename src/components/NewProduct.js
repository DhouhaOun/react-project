import React from 'react'
import { useState } from'react'
import { addProduct } from '../app/app';
function NewProduct() {

   const [name,setName]=useState("");
   const [price,setPrice]=useState(0);
   const[check,setCheck]=useState(true);

   const handleSaveProduct=(event)=>{
    event.preventDefault();
    let product = {name, price, check};
    addProduct(product).then
    (res =>{
      alert(JSON.stringify(res.data));
    }) ;
  };
  return (
    <div className='row p-1'>

      <div className='col-md-6'>
        <div className='card'>
          <div className='card-body'>
            <form onSubmit={handleSaveProduct}> 
              <div className='mb-3'>
                <label htmlFor='productName' className='form-label'>Product Name</label>
                <input onChange={(e)=>setName(e.target.value)} type="text" 
                value={name}
                className="form-control" id="productName" />

              </div>
              <div className='mb-3'>
                <label htmlFor='productPrice' className='form-label'>Product Price</label>
                <input  onChange={(e)=>setPrice(e.target.value)} type="text"  value={price} className="form-control" id="productPrice" />

              </div>
              <div className="form-check">
                <label className="form-check-label" for="flexCheckChecked">
                  Checked 
                </label>
                <input onChange={(e)=>setCheck(e.target.value)} className="form-check-input" checked={check} type="checkbox"  />

              </div>
              <button className="btn btn-success">Save</button>
            </form>
          </div>

        </div>
      </div>
    </div>
  )
}

export default NewProduct