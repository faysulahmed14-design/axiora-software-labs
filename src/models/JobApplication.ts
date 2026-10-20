import mongoose, { Schema, Document, Model } from "mongoose";

export interface IJobApplication extends Document {
  name: string;
  email: string;
  phone: string;
  role: string;
  portfolioUrl?: string;
  note?: string;
  resumeFileName?: string;
  resumeFileSize?: number;
  resumeDataUrl?: string; // Base64 encoded document for quick review
  status: "submitted" | "under_review" | "shortlisted" | "rejected";
  createdAt: Date;
  updatedAt: Date;
}

const JobApplicationSchema = new Schema<IJobApplication>(
  {
    name: {
      type: String,
      required: [true, "Applicant name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email address is required"],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
        "Please provide a valid email address",
      ],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },
    role: {
      type: String,
      required: [true, "Position/role is required"],
      trim: true,
    },
    portfolioUrl: {
      type: String,
      trim: true,
      default: "",
    },
    note: {
      type: String,
      trim: true,
      maxlength: [2000, "Note cannot exceed 2000 characters"],
      default: "",
    },
    resumeFileName: {
      type: String,
      default: "",
    },
    resumeFileSize: {
      type: Number,
      default: 0,
    },
    resumeDataUrl: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["submitted", "under_review", "shortlisted", "rejected"],
      default: "submitted",
    },
  },
  {
    timestamps: true,
  }
);

const JobApplication: Model<IJobApplication> =
  mongoose.models.JobApplication ||
  mongoose.model<IJobApplication>("JobApplication", JobApplicationSchema);

export default JobApplication;
