import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function ExportReports() {

  const exportExcel = async () => {

    const res = await fetch(
      "http://192.168.1.117:3000/users"
    );

    const data = await res.json();

    const worksheet =
      XLSX.utils.json_to_sheet(data);

    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Users"
    );

    const excelBuffer =
      XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

    saveAs(
      new Blob([excelBuffer]),
      "Users_Report.xlsx"
    );
  };

  return (
    <div className="container">

      <h2 className="mb-4">
        Export Reports
      </h2>

      <button
        className="btn btn-success me-3"
        onClick={exportExcel}
      >
        Export Excel
      </button>

      <button
        className="btn btn-danger"
      >
        Export PDF
      </button>

    </div>
  );
}

export default ExportReports;