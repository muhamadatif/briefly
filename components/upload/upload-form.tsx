"use client";

import {
  generatePdfSummary,
  storePdfSummaryAction,
} from "@/actions/upload-actions";
import { useUploadThing } from "@/utils/uploadthing";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";
import z from "zod";
import UploadFormInput from "./upload-form-input";

// schema with zod

const schema = z.object({
  file: z
    .instanceof(File, { message: "Invalid file" })
    .refine(
      (file) => file.size <= 20 * 1024 * 1024,
      "File size should be less than 24MB",
    )
    .refine(
      (file) => file.type.startsWith("application/pdf"),
      "File must be a PDF",
    ),
});

export default function UploadForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { startUpload, routeConfig } = useUploadThing("pdfUploader", {
    onClientUploadComplete: () => {
      console.log("uploaded successfully");
    },
    onUploadError: (err) => {
      toast("Error occured while uploading.");
    },
    onUploadBegin: (fileName: string) => {
      console.log("upload has begun for ", fileName);
    },
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData(e.currentTarget);
      const file = formData.get("file") as File;

      // validating the fields
      const validatedFields = schema.safeParse({ file });

      if (!validatedFields.success) {
        toast.error("❌ Something went wrong", {
          description:
            validatedFields.error.flatten().fieldErrors.file?.[0] ??
            "Invalid file",
        });
        setIsLoading(false);

        return;
      }

      // upload the file to uploadthing

      toast.info("📄 Uploading PDF...", {
        description: "We Are uploading your PDF!",
      });
      const res = await startUpload([file]);

      if (!res) {
        toast.error("Something went wrong", {
          description: "Please use a different file",
        });
        setIsLoading(false);

        return;
      }

      toast.info("📄 Processing PDF", {
        description: "Hand tight! Our Ai is reading through your document! ✨",
      });

      // summarize the pdf using AI

      const result = await generatePdfSummary(res);

      const { data = null, message = null } = result || {};

      if (data) {
        let storeResult: any;
        toast.info("📄 Saving PDF...", {
          description: "Hand tight! we are saving you summary! ✨",
        });
        if (data.summary) {
          // save the summary to the database
          storeResult = await storePdfSummaryAction({
            summary: data.summary,
            fileUrl: res[0].serverData.file.url,
            title: data.title,
            fileName: file.name,
          });
          toast.success("📄 Summary Generated", {
            description: "Your PDF has been successfully summarized and saved",
          });
          formRef.current?.reset();
          router.push(`/summaries/${storeResult.data.id}`);
        }
      }
      // redirect to the [id] summary page
    } catch (error) {
      setIsLoading(false);

      console.log(error);

      formRef.current?.reset();
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto">
      <UploadFormInput
        ref={formRef}
        isLoading={isLoading}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
