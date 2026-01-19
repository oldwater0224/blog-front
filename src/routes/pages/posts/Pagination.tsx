import { useMemo } from "react";

export default function Pagination({
  pageRange,
  currentPage,
  maxPage,
  onPageChange,
}: {
  pageRange: number;
  currentPage: number;
  maxPage: number;
  onPageChange: (page: number) => void;
}) {
  const half = Math.floor(pageRange / 2); //중앙값 구하기 (Math.floor 는 소수점 버리기)
  // 단 pageRange 는 홀수이여야 한다.
  const pages = useMemo(() => {
    let start = currentPage - half;
    let end = currentPage + half;

    if (start < 1) {
      start = 1;
      end = Math.min(maxPage, pageRange); // 20 5
    }

    if (end > maxPage) {
      end = maxPage;
      start = Math.max(1, maxPage - pageRange + 1);
    }

    const arr = [];
    for (let i = start; i <= end; i++) {
      arr.push(i);
    }
    return arr;
  }, [currentPage, half, maxPage, pageRange]);
  return (
    <>
      {/* Pagination */}
      <div className="flex justify-center mt-12 gap-2">
        {/* 이전 버튼 */}
        <button
          className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 disabled:opacity-50"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {/* 
        currentPage === page
          ? "bg-blue-500 text-white"
          : "bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300"
        */}
        {pages.map((page) => (
          <button
            key={page}
            // className="w-10 h-10 rounded-lg bg-blue-500 text-white"
            className={
              page === currentPage
                ? " w-10 h-10 rounded-lg bg-blue-500 text-white cursor-pointer"
                : "w-10 h-10 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 cursor-pointer" 
            }
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
        {/* <button className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300">
          2
        </button> */}
        {/* 다음 버튼 */}
        <button
          className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 disabled:opacity-50"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === maxPage}
        >
          Next
        </button>
      </div>
    </>
  );
}
