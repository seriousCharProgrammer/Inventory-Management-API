const Inventory = require("../Models/InventoryModel");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("express-async-handler");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
exports.checkInvStatus = asyncHandler(async (req, res, next) => {
  const products = await Inventory.find();
  const inventoryStatus = products.map((item) => ({
    name: item.name,
    sku: item.sku,
    quantity: item.quantity,
    category: item.category,
    threshold: item.threshold,
    status: item.quantity < item.threshold ? "Low Stock" : "In Stock",
  }));

  res.status(200).json({
    success: true,
    data: inventoryStatus,
  });
});

exports.checkInvStatusPdf = asyncHandler(async (req, res, next) => {
  try {
    // Fetch inventory data
    const inventory = await Inventory.find();
    const inventoryStatus = inventory.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      category: item.category,
      threshold: item.threshold,
      status: item.quantity < item.threshold ? "Low Stock" : "In Stock",
    }));

    // Create a PDF document
    const doc = new PDFDocument();

    // Set response headers
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=inventory-status.pdf"
    );

    // Pipe the PDF to the response
    doc.pipe(res);

    // Add title
    doc.fontSize(18).text("Inventory Status Report", { align: "Left" });
    doc.moveDown();

    // Add table headers
    doc.fontSize(12).text("Name", 50, 100);
    doc.text("Quantity", 150, 100);
    doc.text("Category", 250, 100);
    doc.text("Threshold", 350, 100);
    doc.text("Status", 450, 100);

    doc.moveDown(1);

    // Add inventory items to the table
    let y = 120;
    inventoryStatus.forEach((item) => {
      doc.text(item.name, 50, y);
      doc.text(item.sku, 150, y);
      doc.text(item.quantity.toString(), 150, y);
      doc.text(item.category, 250, y);
      doc.text(item.threshold.toString(), 350, y);
      doc.text(item.status, 450, y);
      y += 20;
    });

    // Finalize the PDF
    doc.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

exports.checkInvStatusCsv = asyncHandler(async (req, res, next) => {
  try {
    // Fetch inventory data
    const inventory = await Inventory.find();
    const inventoryStatus = inventory.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      category: item.category,
      threshold: item.threshold,
      status: item.quantity < item.threshold ? "Low Stock" : "In Stock",
    }));

    // Define CSV headers
    const csvWriter = createCsvWriter({
      path: "inventory-status.csv",
      header: [
        { id: "name", title: "Name" },
        { id: "quantity", title: "Quantity" },
        { id: "category", title: "Category" },
        { id: "threshold", title: "Threshold" },
        { id: "status", title: "Status" },
      ],
    });

    // Write data to CSV
    await csvWriter.writeRecords(inventoryStatus);

    // Send the CSV file
    res.download("inventory-status.csv", (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: "Error generating CSV" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
