import pdf from "pdf-parse-debugging-disabled";
import { generateInterviewReport, generateResumePdf } from "../services/ai.service.js";

// ✅ FIXED IMPORT (Capital + correct usage)
import InterviewReport from "../models/interviewReportModel.js";


// ✅ GENERATE INTERVIEW REPORT
async function generateInterViewReportController(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Resume file is required",
      });
    }

    const resumeContent = await pdf(req.file.buffer);

    const { selfDescription, jobDescription } = req.body;

    const interViewReportByAi = await generateInterviewReport({
      resume: resumeContent.text,
      selfDescription,
      jobDescription
    });

    // ✅ FIXED MODEL USAGE
    const interviewReport = await InterviewReport.create({
      user: req.user.id,
      resume: resumeContent.text,
      selfDescription,
      jobDescription,
      ...interViewReportByAi
    });

    res.status(201).json({
      message: "Interview report generated successfully.",
      interviewReport
    });

  } catch (error) {
    console.log("Controller FULL Error 👉", error);
    res.status(500).json({
      message: "Failed to generate interview report.",
      error: error.message
    });
  }
}


// ✅ GET BY ID
async function getInterviewReportByIdController(req, res) {
  try {
    const { interviewId } = req.params;

    const interviewReport = await InterviewReport.findOne({
      _id: interviewId,
      user: req.user.id
    });

    if (!interviewReport) {
      return res.status(404).json({
        message: "Interview report not found."
      });
    }

    res.status(200).json({
      message: "Interview report fetched successfully.",
      interviewReport
    });

  } catch (error) {
    res.status(500).json({ message: "Error fetching report" });
  }
}


// ✅ GET ALL
async function getAllInterviewReportsController(req, res) {
  try {
    const interviewReports = await InterviewReport
      .find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan");

    res.status(200).json({
      message: "Interview reports fetched successfully.",
      interviewReports
    });

  } catch (error) {
    res.status(500).json({ message: "Error fetching reports" });
  }
}


// ✅ GENERATE PDF
async function generateResumePdfController(req, res) {
  try {
    const { interviewReportId } = req.params;

    const interviewReport = await InterviewReport.findById(interviewReportId);

    if (!interviewReport) {
      return res.status(404).json({
        message: "Interview report not found."
      });
    }

    const { resume, jobDescription, selfDescription } = interviewReport;

    const pdfBuffer = await generateResumePdf({
      resume,
      jobDescription,
      selfDescription
    });

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`
    });

    res.send(pdfBuffer);
    console.log("FILE 👉", req.file);

  } catch (error) {
    console.log("PDF Error:", error.message);
    res.status(500).json({
      message: "Failed to generate PDF"
    });
  }
}

export {
  generateInterViewReportController,
  getInterviewReportByIdController,
  getAllInterviewReportsController,
  generateResumePdfController
};