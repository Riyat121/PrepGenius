import axios from "axios"

// ✅ axios instance
const API = axios.create({
    baseURL: "https://prepgenius-xr9.onrender.com/api"
})

// ✅ token automatically attach hoga
API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token")

    if (token) {
        req.headers.Authorization = `Bearer ${token}`
    }

    return req
})


// ✅ GET all reports
export const getAllInterviewReports = async () => {
    const { data } = await API.get("/interview")
    return data
}


// ✅ GENERATE report
export const generateInterviewReport = async (formData) => {
    const { data } = await API.post("/interview", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    return data
}


// ✅ GET by ID
export const getInterviewReportById = async (id) => {
    const { data } = await API.get(`/interview/report/${id}`)
    return data // ✅ ye correct hai
}


// ✅ PDF download
export const generateResumePdf = async ({ interviewReportId }) => {
    const { data } = await API.post(
        `/interview/resume/pdf/${interviewReportId}`,
        {},
        { responseType: "blob" }
    )
    return data
}