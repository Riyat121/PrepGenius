import axios from "axios";
import { z } from "zod";
import PDFDocument from "pdfkit";


// ---------------- ZOD SCHEMA ----------------

const interviewReportSchema = z.object({
  matchScore: z.number(),
  technicalQuestions: z.array(
    z.object({
      question: z.string(),
      intention: z.string(),
      answer: z.string()
    })
  ),
  behavioralQuestions: z.array(
    z.object({
      question: z.string(),
      intention: z.string(),
      answer: z.string()
    })
  ),
  skillGaps: z.array(
    z.object({
      skill: z.string(),
      severity: z.enum(["low", "medium", "high"])
    })
  ),
  preparationPlan: z.array(
    z.object({
      day: z.number(),
      focus: z.string(),
      tasks: z.array(z.string())
    })
  ),
  title: z.string()
});

// ---------------- AI FUNCTION ----------------

export const generateInterviewReport = async ({
  resume,
  selfDescription,
  jobDescription
}) => {
  try {
    const prompt = `
Generate a STRICT JSON interview report.

Resume: ${resume}
Self Description: ${selfDescription}
Job Description: ${jobDescription}

Return ONLY JSON in this format:
{
  "matchScore": number,
  "technicalQuestions": [
    { "question": "", "intention": "", "answer": "" }
  ],
  "behavioralQuestions": [
    { "question": "", "intention": "", "answer": "" }
  ],
  "skillGaps": [
    { "skill": "", "severity": "low|medium|high" }
  ],
  "preparationPlan": [
    { "day": number, "focus": "", "tasks": [""] }
  ],
  "title": ""
}
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
       model: "mistralai/mixtral-8x7b-instruct",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const text = response.data.choices[0].message.content;

    // 🔥 important: JSON safe parse
    const cleaned = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    return interviewReportSchema.parse(parsed); // validation

  } catch (error) {
    console.log("AI Error:", error.response?.data || error.message);
   
    throw new Error("AI generation failed");
  }
};

// ---------------- RESUME PDF ----------------

export const generateResumePdf = async ({
  resume,
  jobDescription
}) => {
  try {
    const prompt = `
Improve this resume professionally:

Resume: ${resume}
Job Description: ${jobDescription}
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mixtral-8x7b-instruct",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const content = response.data.choices[0].message.content;

    // PDF generation
    const doc = new PDFDocument();
    const buffers = [];

    doc.on("data", buffers.push.bind(buffers));

    doc.fontSize(18).text("Generated Resume", { underline: true });
    doc.moveDown();

    doc.fontSize(12).text(content);

    doc.end();

    return new Promise((resolve) => {
      doc.on("end", () => {
        resolve(Buffer.concat(buffers));
      });
    });

  } catch (error) {
    console.log("PDF Error:", error.response?.data || error.message);
    throw new Error("PDF generation failed");
  }
};