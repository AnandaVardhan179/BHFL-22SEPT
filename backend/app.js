const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // CORS enabled

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Ensure CORS is enabled

app.post("/bfhl", (req, res) => {
  const { data, file_b64 } = req.body;

  // Check if `data` is an array
  if (!Array.isArray(data)) {
    return res.status(400).json({
      is_success: false,
      message: "`data` should be an array",
    });
  }

  // Process the input and return a response
  const numbers = data.filter((item) => !isNaN(item));
  const alphabets = data.filter((item) => isNaN(item));
  const lowercaseAlphabets = alphabets.filter(
    (item) => item === item.toLowerCase()
  );
  const highestLowercase = lowercaseAlphabets.length
    ? [lowercaseAlphabets.sort().slice(-1)[0]]
    : [];

  // Simulate file validation and dynamic file type handling
  let fileValid = false;
  let fileMimeType = null;
  let fileSizeKb = 0;

  // If the file_b64 exists, check if it's a PDF or PNG or DOC based on file signature
  if (file_b64) {
    fileValid = true;
    if (file_b64.includes("BASE_64_STRING")) {
      fileMimeType = "doc/pdf";
      fileSizeKb = 1800; // Example file size for PDF
    } else {
      fileMimeType = "image/png"; // Default to PNG if not specified
      fileSizeKb = 400; // Example file size for PNG
    }
  }

  // Return the response
  res.json({
    is_success: true,
    user_id: "john_doe_17091999",
    email: "john@xyz.com",
    roll_number: "ABCD123",
    numbers,
    alphabets,
    highest_lowercase_alphabet: highestLowercase,
    file_valid: fileValid,
    file_mime_type: fileMimeType,
    file_size_kb: fileSizeKb,
  });
});

app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
