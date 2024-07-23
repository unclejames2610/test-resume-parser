import { getDocument, GlobalWorkerOptions, version } from "pdfjs-dist";

// import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

// GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.js`;

GlobalWorkerOptions.workerSrc = `./pdfjs-dist/pdf.worker.js`;
// GlobalWorkerOptions.workerSrc =
//   "//cdn.jsdelivr.net/npm/pdfjs-dist@4.4.168/build/pdf.worker.js";

// GlobalWorkerOptions.workerSrc =
//   "//mozilla.github.io/pdf.js/build/pdf.worker.mjs";

console.log(version);

interface ResumeData {
  name: string;
  email: string;
  phone: string;
  skills: string[];
}

export const extractResumeData = async (file: File): Promise<ResumeData> => {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await getDocument({ data: arrayBuffer }).promise;
  let textContent = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const text = await page.getTextContent();
    const pageText = text.items
      .map((item) => ("str" in item ? item.str : ""))
      .join(" ");
    textContent += ` ${pageText}`;
  }

  // Example of parsing text to extract details
  const name = extractName(textContent);
  const email = extractEmail(textContent);
  const phone = extractPhone(textContent);
  const skills = extractSkills(textContent);

  return {
    name,
    email,
    phone,
    skills,
  };
};

// Example functions to extract specific details
const extractName = (text: string): string => {
  const nameRegex = /Name:\s*(.*)/i;
  const match = text.match(nameRegex);
  return match ? match[1].trim() : "Unknown";
};

const extractEmail = (text: string): string => {
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
  const match = text.match(emailRegex);
  return match ? match[0] : "Unknown";
};

const extractPhone = (text: string): string => {
  const phoneRegex = /Phone:\s*(.*)/i;
  const match = text.match(phoneRegex);
  return match ? match[1].trim() : "Unknown";
};

const extractSkills = (text: string): string[] => {
  const skillsRegex = /Skills:\s*(.*)/i;
  const match = text.match(skillsRegex);
  return match ? match[1].split(",").map((skill) => skill.trim()) : [];
};
