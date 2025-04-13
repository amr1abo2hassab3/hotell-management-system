import ReactPaginate from "react-paginate";

interface PaginationProps {
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  pageNumber: number;
}

const Pagination = ({
  setPageNumber,
  totalPages,
  pageNumber,
}: PaginationProps) => {
  const handlePageClick = (page: { selected: number }) => {
    setPageNumber(page.selected + 1);
  };

  return (
    <div>
      <ReactPaginate
        forcePage={pageNumber - 1}
        nextLabel={<i className="fas fa-angle-right"></i>}
        previousLabel={<i className="fas fa-angle-left"></i>}
        onPageChange={handlePageClick}
        marginPagesDisplayed={1}
        pageRangeDisplayed={1}
        pageCount={totalPages}
        containerClassName={"flex justify-center p-3 space-x-2"}
        pageClassName={"inline-block"}
        pageLinkClassName={
          "px-4 py-2 border rounded-md text-[#25324B] font-bold bg-white hover:bg-[#986D3C] hover:text-white transition"
        }
        previousClassName={"inline-block"}
        nextClassName={"inline-block"}
        previousLinkClassName={
          "px-4 py-2 border rounded-md text-[#25324B] font-bold bg-white hover:bg-[#986D3C] hover:text-white transition"
        }
        nextLinkClassName={
          "px-4 py-2 border rounded-md text-[#25324B] font-bold bg-white hover:bg-[#986D3C] hover:text-white transition"
        }
        breakClassName={"inline-block"}
        breakLinkClassName={
          "px-4 py-2 border rounded-md text-[#25324B] font-bold  hover:bg-[#986D3C] hover:text-white transition"
        }
        activeLinkClassName={"!bg-[#986D3C] text-white"}
      />
    </div>
  );
};

export default Pagination;
