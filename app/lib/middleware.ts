import { z } from "zod";
import { ActionState } from "./interfaces/action-state-type";
import { error } from "console";

type ValidatedActionFunction<S extends z.ZodType<any, any>, T> = (
  schema: z.infer<S>,
  formData: FormData
) => Promise<T>;

export function validatedAction<S extends z.ZodType<any, any>, T>(
  schema: S,
  action: ValidatedActionFunction<S, T>
) {
  return async (prevState: ActionState, formData: FormData): Promise<T> => {
    const result = schema.safeParse(Object.fromEntries(formData.entries()));
    if (!result.success) {
      return { error: result.error.errors[0].message } as T;
    }

    return action(result.data, formData);
  };
}
