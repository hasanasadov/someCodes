import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
import { UploadButton } from "@/lib/uploadthing";
import { toast } from "sonner";

type Props = {
  url: string;
  handleChange: (url: string) => void;
};

export const UploadSingleImage = ({ url, handleChange }: Props) => {
  if (url) {
    return (
      <div className="relative">
        <Image
          src={url}
          alt="Product Photo"
          width={150}
          height={150}
          className="mx-auto"
        />
        <Button
          type="button"
          variant={"ghost"}
          size={"sm"}
          className="absolute top-0 right-0 "
          onClick={() => handleChange("")}
        >
          <TrashIcon />
        </Button>
      </div>
    );
  }

  return (
    <div>
      <UploadButton
        endpoint="imageUploader"
        appearance={{
          button: {
            background: "#a80303",
          },
        }}
        onClientUploadComplete={(res) => {
          if (res[0]) {
            handleChange(res[0].url);
            // form.clearErrors("imageUrl");
          }
        }}
        onUploadError={(error: Error) => {
          console.error(error);
          toast.error(error.message);
        }}
      />
    </div>
  );
};
