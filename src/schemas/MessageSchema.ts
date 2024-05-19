import {z} from "zod"

export const messageSchema = z.object({
    content:z.string().min(10,{ message: "Must be 10 or more characters long" }).max(300,{ message: "Must be 300 or fewer characters long" })
})