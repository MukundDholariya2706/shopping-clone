const XLSX = require("xlsx");
const fs = require("fs").promises;

const createExcelFile = async (data, options, filePath) => {
  try {
    // Create a worksheet
    const ws = XLSX.utils.json_to_sheet(data, options);

    // Create a workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Write the workbook to a buffer
    const buffer = XLSX.write(wb, { bookType: "xlsx", type: "buffer" });

    // Write the buffer to a file
    await fs.writeFile(filePath, buffer);
    console.log(`Excel file created at: ${filePath}`);
  } catch (error) {
    console.log("createExcel -> createExcelFile", error);
    throw error;
  }
};

module.exports = { createExcelFile };
