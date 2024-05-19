import { z } from "zod"

export const userNameValidation = z.
    string().
    min(4,{ message: "Must be 4 or more characters long" }).
    max(20,{ message: "Must be 20 or fewer characters long" }).
    regex(/^[a-zA-Z0-9_]+$/,"userName must not contain any special characters")


export const signUpSchema = z.object({
    userName:userNameValidation,
    email:z.string().email({message: "Invalid email address"}),
    password:z.string().
            min(6,{ message: "Must be 6 or more characters long"}).
            max(20,{ message: "Must be 20 or fewer characters long" })
})