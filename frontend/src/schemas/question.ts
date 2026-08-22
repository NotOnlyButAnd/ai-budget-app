import { z } from "zod";

const baseQuestionSchema = z.object({
  id: z.string(),
  component: z.string(),
  label: z.string(),
  description: z.string().optional(),
  required: z.boolean(),
});

const currencyDataSchema = z.object({
  currency: z.string(),
  min: z.number().optional(),
  max: z.number().optional(),
  placeholder: z.string().optional(),
});

const singleChoiceDataSchema = z.object({
  options: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
    })
  ),
});

const numberDataSchema = z.object({
  min: z.number().optional(),
  max: z.number().optional(),
  step: z.number().optional(),
  placeholder: z.string().optional(),
});

const yesNoDataSchema = z.object({
  true_label: z.string().optional(),
  false_label: z.string().optional(),
});

export const currencyQuestionSchema = baseQuestionSchema.extend({
  component: z.literal("currency"),
  data: currencyDataSchema,
});

export const singleChoiceQuestionSchema = baseQuestionSchema.extend({
  component: z.literal("single_choice"),
  data: singleChoiceDataSchema,
});

export const numberQuestionSchema = baseQuestionSchema.extend({
  component: z.literal("number"),
  data: numberDataSchema,
});

export const yesNoQuestionSchema = baseQuestionSchema.extend({
  component: z.literal("yes_no"),
  data: yesNoDataSchema,
});

export const questionSchema = z.discriminatedUnion("component", [
  currencyQuestionSchema,
  singleChoiceQuestionSchema,
  numberQuestionSchema,
  yesNoQuestionSchema,
]);

export const interviewSessionSchema = z.object({
  session_id: z.string(),
  question: questionSchema,
});

export const submitAnswerResponseSchema = z.object({
  question: questionSchema.nullable(),
  completed: z.boolean(),
});

export const answerSchema = z.object({
  question_id: z.string(),
  value: z.union([z.string(), z.number(), z.boolean()]),
});
