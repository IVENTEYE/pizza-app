import React from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';
import { setPageCount } from '../../redux/slices/filterSlice';

const Pagination: React.FC<any> = ({ pageCount }) => {
  console.log(pageCount);
  
  const dispatch = useDispatch();

  const onChangePage: (count: number) => void = (count) => {
    dispatch(setPageCount(count));
  }
  return (
    <>
      <ReactPaginate
        className='pagination'
        breakLabel="..."
        nextLabel=">"
        onPageChange={(event) => onChangePage(event.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={3}
        forcePage={pageCount - 1}
        previousLabel="<"
      />
    </>
  );
}

export default Pagination;
