import { z } from "zod";
import { ALL_CONTENT_KEYS, type ContentKey } from "./keys";

const contentEntrySchema = z
  .object({
    default: z.string(),
    mortal: z.string().optional(),
    immortal: z.string().optional(),
    supreme: z.string().optional(),
    cosmic: z.string().optional(),
  })
  .strict();

export type ContentEntry = z.infer<typeof contentEntrySchema>;

export const TextDataSchema = z
  .record(z.string(), contentEntrySchema)
  .superRefine((data, ctx) => {
    const present = new Set(Object.keys(data));
    for (const key of ALL_CONTENT_KEYS) {
      if (!present.has(key)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: `Missing content key: ${key}` });
      }
    }
    for (const key of present) {
      if (!(ALL_CONTENT_KEYS as string[]).includes(key)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: `Unknown content key: ${key}` });
      }
    }
  });

export type TextData = Record<ContentKey, ContentEntry>;
