import { z } from "zod";

const createBookZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Book title is required",
    }),
    author: z.string({
      required_error: "Author is required",
    }),
    posterId: z.string({
      required_error: "PosterId is required",
    }),
    genre: z.string({
      required_error: "Genre is required",
    }),
    publicationDate: z.string({
      required_error: "Publication date is required",
    }),
  }),
});

export const BookValidation = {
  createBookZodSchema,
};
