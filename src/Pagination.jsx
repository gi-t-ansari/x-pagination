import React, { useEffect, useState } from "react";

const Pagination = () => {
  const [tableData, setTableData] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((response) => response.json())
      .then((data) => {
        setTableData(data);
        console.log(data);
      })
      .catch((error) => alert("failed to fetch data", error));
  }, []);

  const handlePrevious = (e) => {
    e.preventDefault();
    if (startIndex > 0) {
      setStartIndex((prev) => prev - 10);
      setEndIndex((prev) => prev - 10);
      setPageNumber((prev) => prev - 1);
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (endIndex <= tableData?.length) {
      setStartIndex((prev) => prev + 10);
      setEndIndex((prev) => prev + 10);
      setPageNumber((prev) => prev + 1);
    }
  };

  return (
    <div className="w-screen h-screen py-8 px-6">
      <div className="bg-[#f5f5f4] w-full p-4 h-full">
        <h1 className="text-center text-3xl mb-4">Employee Data Table</h1>
        <div className="w-full h-fit shadow-xl border-b-[0.1rem] border-[#019878]">
          <table className="w-full  ">
            <thead className="w-full bg-[#019878] text-white ">
              <th align="left" className="p-2">
                ID
              </th>
              <th align="left" className="p-2">
                Name
              </th>
              <th align="left" className="p-2">
                Email
              </th>
              <th align="left" className="p-2">
                Role
              </th>
            </thead>
            <tbody>
              {tableData &&
                tableData?.slice(startIndex, endIndex).map((ele) => (
                  <tr>
                    <td align="left" className="p-2 border-b border-[#e2e3e2]">
                      {ele?.id}
                    </td>
                    <td align="left" className="p-2 border-b border-[#e2e3e2]">
                      {ele?.name}
                    </td>
                    <td align="left" className="p-2 border-b border-[#e2e3e2]">
                      {ele?.email}
                    </td>
                    <td align="left" className="p-2 border-b border-[#e2e3e2]">
                      {ele?.role}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center items-center gap-x-2 mt-4">
          <button
            className="bg-[#019878] text-white text-sm py-2 px-3 rounded cursor-pointer"
            onClick={handlePrevious}
          >
            Previous
          </button>
          <span className="py-3 px-4 text-lg bg-[#019878] rounded text-white">
            {pageNumber}
          </span>
          <button
            className="bg-[#019878] text-white text-sm py-2 px-3 rounded cursor-pointer"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
