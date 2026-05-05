import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatStipend(amount: number | null | undefined): string {
  if (!amount) return "Fully Funded";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount) + "/yr";
}

export function formatDeadline(deadline: string): string {
  return deadline === "Rolling" ? "Rolling Admissions" : deadline;
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    saved: "bg-gray-100 text-gray-700",
    ready: "bg-blue-100 text-blue-700",
    submitting: "bg-yellow-100 text-yellow-700",
    submitted: "bg-purple-100 text-purple-700",
    pending: "bg-orange-100 text-orange-700",
    interview: "bg-cyan-100 text-cyan-700",
    accepted: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
    withdrawn: "bg-gray-100 text-gray-500",
  };
  return colors[status] || "bg-gray-100 text-gray-700";
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    saved: "Saved",
    ready: "Ready to Apply",
    submitting: "Submitting",
    submitted: "Submitted",
    pending: "Under Review",
    interview: "Interview",
    accepted: "Accepted",
    rejected: "Rejected",
    withdrawn: "Withdrawn",
  };
  return labels[status] || status;
}

export const DOCUMENT_TYPES = [
  { value: "cv", label: "CV / Resume" },
  { value: "transcript", label: "Academic Transcript" },
  { value: "sop", label: "Statement of Purpose" },
  { value: "personal_statement", label: "Personal Statement" },
  { value: "research_statement", label: "Research Statement" },
  { value: "lor", label: "Letter of Recommendation" },
  { value: "gre_score", label: "GRE Score Report" },
  { value: "toefl_score", label: "TOEFL Score Report" },
  { value: "ielts_score", label: "IELTS Score Report" },
  { value: "photo", label: "Photo / Passport" },
  { value: "other", label: "Other Document" },
];

export const RESEARCH_AREAS = [
  "Deep Learning", "Machine Learning", "Natural Language Processing", "Computer Vision",
  "Reinforcement Learning", "Generative AI", "AI Safety", "Robotics", "Bayesian ML",
  "Graph Neural Networks", "Federated Learning", "Explainable AI", "Causal Inference",
  "Multi-agent Systems", "AI for Healthcare", "AI for Science", "ML Theory",
  "Optimization", "Statistical Learning", "Human-AI Interaction",
];

export const COUNTRIES = [
  "USA", "UK", "Canada", "Germany", "Switzerland", "France", "Netherlands",
  "Sweden", "Singapore", "China", "Australia", "Japan", "South Korea",
  "Hong Kong", "India", "Israel", "UAE", "Saudi Arabia", "Denmark",
  "Finland", "Austria", "Belgium", "Italy", "Ireland", "Taiwan",
];
