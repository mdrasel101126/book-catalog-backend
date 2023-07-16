import { Schema, model } from "mongoose";
import { BookModel, IBook } from "./book.interface";

const BookSchema = new Schema<IBook, BookModel>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    posterId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    genre: {
      type: String,
      required: true,
    },
    publicationDate: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

BookSchema.statics.isBookExist = async function (
  id: string
): Promise<IBook | null> {
  return await Book.findOne({ _id: id }).lean();
};

BookSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v;
  delete obj.createdAt;
  delete obj.updatedAt;
  return obj;
};

export const Book = model<IBook, BookModel>("Book", BookSchema);
