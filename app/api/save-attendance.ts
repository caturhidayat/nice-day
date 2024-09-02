import { createClient } from "@supabase/supabase-js";
import { decode } from "base64-arraybuffer";
import {
  SUPABASE_BUCKET,
  SUPABASE_KEY,
  SUPABASE_URL,
} from "../common/constants/api";
import { NextApiRequest, NextApiResponse } from "next";

const supabase = createClient(SUPABASE_URL || "", SUPABASE_KEY || "");

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "2mb",
    },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    let { image } = req.body;

    if (!image) {
      return res.status(500).json({ message: "Image is required" });
    }

    try {
      const contentType = image.match(/data:(.*);base64/)?.[1];
      const base64FileData = image.split("base64,")[1];

      if (!contentType || !base64FileData) {
        return res.status(500).json({ message: "Invalid image data" });
      }

      // Upload image to Supabase storage
      const filename = `${Date.now()}.${contentType.split("/")[1]}`;
      const path = `${filename}`;

      const { data, error } = await supabase.storage
        .from(SUPABASE_BUCKET || "")
        .upload(path, decode(base64FileData), {
          contentType,
          upsert: true,
        });

      if (error) {
        throw new Error(error.message);
      }

      // construct public URL
      const bucket = SUPABASE_BUCKET || "";
      const url = `${SUPABASE_URL?.replace(
        ".in",
        ".co"
      )}/storage/v1/object/public/${bucket}/${data.path}`;
      console.table(data);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({
      message: `HTTP method ${req.method} is not supported on this route`,
    });
  }
}

