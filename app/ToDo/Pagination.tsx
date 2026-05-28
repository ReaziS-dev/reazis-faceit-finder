export default function Pagination({
  currentPage,
  handlePageChange,
}: {
  currentPage: number;
  handlePageChange: (page: number) => void;
}) {
  return (
    <div className="pagination">
      <span className="prev" onClick={() => handlePageChange(currentPage - 1)}>
        -
      </span>
      <span className="next" onClick={() => handlePageChange(currentPage + 1)}>
        +
      </span>
    </div>
  );
}
