import React, { Fragment, useEffect, useState } from 'react';
import MetaData from './layouts/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import getProducts from '../actions/productsAction';
import Loader from './layouts/Loader';
import Product from './products/Products';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from 'react-js-pagination';

function Home() {
    const dispatch = useDispatch();

    const { products, loading, error, productsCount, resPerPage } = useSelector((state) => state.productsState);
    const [currentPage, setCurrentPage] = useState(1);
    //console.log(currentPage)
    const setCurrentPageNo = (pageNo) => {
        setCurrentPage(pageNo)
    }

    useEffect(() => {
        if(error){
            return toast.error(error,{
                position : toast.POSITION.BOTTOM_CENTER 
            })
        }
        dispatch(getProducts(null, null, null, null, currentPage));
    }, [error, dispatch, currentPage])


    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <MetaData title={'Home'} />
                    <h1 id="products_heading">Latest Products</h1>

                    <section className="container mt-5" id="products">
                        
                        <div className="row">
                            {products && products.map(product => (
                               <Product col={3} key={product._id} product={product}/>
                            ))}
                        </div>

                    </section>
                    {productsCount > 0 && productsCount > resPerPage ? 
                    <div className='d-flex justify-content-center mt-5'>
                        <Pagination 
                            activePage={currentPage}
                            onChange={setCurrentPageNo}
                            totalItemsCount={productsCount}
                            itemsCountPerPage={resPerPage}
                            nextPageText={'Next'}
                            firstPageText={'First'}
                            lastPageText={'Last'}
                            itemClass={'page-item'}
                            linkClass={'page-link'}
                        />
                    </div> : null }
                </Fragment>}
        </Fragment>
    )
}

export default Home;