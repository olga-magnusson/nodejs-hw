import {Joi, Segments} from "celebrate";
import { isValidObjectId } from "mongoose";

export const getNotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().default(10),
  }),
};

export const getAllNotesSchema = {
  [Segments.BODY]: Joi.object({
    page: Joi.number().min(1).required(1),
    perPage: Joi.number().min(5).max(20).required(10),
    tag: Joi.string().valid("../constants/tags.js"),
    search: Joi.string(),
  }),
};

const objectIdValidator = (value, helpers) => {
  return !isValidObjectId(value) ? helpers.message('Invalid id format'): value;
};

export const noteIdSchema = {
  [Segments.PARAMS]: Joi.object({noteId: Joi.string().custom(objectIdValidator).required(),}),
};

export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string.min(1).required(),
    content: Joi.string(),
    tag: Joi.string().valid("../constants/tags.js"),
  }),
};

export const updateNoteSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
  }),
  [Segments.BODY]: Joi.object({
    title: Joi.string.min(1),
    content: Joi.string(),
    tag: Joi.string().valid("../constants/tags.js"),
  }),
};
