import mongoose, { Schema, Document, Model } from "mongoose";

export interface IInquiry extends Document {
  name: string;
  email: string;
  company?: string;
  service: string;
  budget?: string;
  message: string;
  status: "new" | "contacted" | "in_progress" | "closed";
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
  updatedAt: Date;
}

const InquirySchema = new Schema<IInquiry>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
        "Please provide a valid email address",
      ],
    },
    company: {
      type: String,
      trim: true,
      maxlength: [120, "Company name cannot exceed 120 characters"],
      default: "",
    },
    service: {
      type: String,
      required: [true, "Service is required"],
      trim: true,
    },
    budget: {
      type: String,
      trim: true,
      default: "Not specified",
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      maxlength: [3000, "Message cannot exceed 3000 characters"],
    },
    status: {
      type: String,
      enum: ["new", "contacted", "in_progress", "closed"],
      default: "new",
    },
    ipAddress: {
      type: String,
      default: "",
    },
    userAgent: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// Prevent re-compilation of model in Next.js development hot-reloading
const Inquiry: Model<IInquiry> =
  mongoose.models.Inquiry || mongoose.model<IInquiry>("Inquiry", InquirySchema);

export default Inquiry;
