import React from 'react';
import { IPagination } from '../interfaces';

const Pagination: React.FC<IPagination> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className='flex justify-center mt-20 '>
      <button className='border border-black w-5' onClick={handlePrev} disabled={currentPage === 1}>
        &laquo;
      </button>

      {pageNumbers.map((num) => (
        <button
        className={`border border-black w-8 ${currentPage === num ? 'bg-yellow-200': 'bg-white'}`}
          key={num}
          onClick={() => onPageChange(num)}
          
        >
          {num}
        </button>
      ))}

      <button className='border border-black w-5' onClick={handleNext} disabled={currentPage === totalPages}>
        &raquo;
      </button>
    </div>
  );
};

export default Pagination;
