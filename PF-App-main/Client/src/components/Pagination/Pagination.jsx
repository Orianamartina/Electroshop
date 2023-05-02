import "./pagination.scss";
import {
  TfiAngleLeft,
  TfiAngleRight,
  TfiAngleDoubleLeft,
  TfiAngleDoubleRight,
} from "react-icons/tfi";

const Pagination = ({
  productsPerPage,
  allProducts,
  handlePagination,
  currentPage,
}) => {
  const pages = [];

  for (let i = 0; i < Math.ceil(allProducts / productsPerPage); i++) {
    pages.push(i + 1);
  }

  const pageRange = 1;
  const minPage = Math.max(1, currentPage - pageRange);
  const maxPage = Math.min(pages.length, currentPage + pageRange);

  return (
    <nav className="linksPagination">
      <ul>
        {currentPage > 1 && (
          <>
            <li>
              <button onClick={() => handlePagination(1)}>
                <TfiAngleDoubleLeft className="pagination-button"/>
              </button>
            </li>
            <li>
              <button onClick={() => handlePagination(currentPage - 1)}>
                <TfiAngleLeft className="pagination-button"/>
              </button>
            </li>
          </>
        )}
        {pages &&
          pages
            .filter((num) => num >= minPage && num <= maxPage)
            .map((num) => (
              <li key={num}>
                <button
                  onClick={() => handlePagination(num)}
                  className={currentPage === num ? "active" : null}
                >
                  {num}
                </button>
              </li>
            ))}
        {currentPage < pages.length && (
          <>
            <li>
              <button onClick={() => handlePagination(currentPage + 1)}>
                <TfiAngleRight className="pagination-button"/>
              </button>
            </li>
            <li>
              <button onClick={() => handlePagination(pages.length)}>
                <TfiAngleDoubleRight className="pagination-button"/>
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;
