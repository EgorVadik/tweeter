import { z } from 'zod'

export const signUpSchema = z.object({
    name: z.string().min(3).max(255).trim().nonempty(),
    email: z.string().email(),
    password: z.string().min(6).max(255).trim().nonempty(),
})

export type SignUpForm = z.infer<typeof signUpSchema>

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(255),
})

export type SignInForm = z.infer<typeof signInSchema>

export const newTweetSchema = z.object({
    content: z.string().min(1).max(2000).trim().nonempty(),
    replyPrivate: z.boolean().optional().nullish(),
    image: z.string().url().optional().nullish(),
})

export type NewTweetForm = z.infer<typeof newTweetSchema>

export const newReplySchema = z.object({
    content: z.string().min(1).max(2000).trim().nonempty(),
    image: z.string().url().optional().nullish(),
})

export type NewReplyForm = z.infer<typeof newReplySchema>

export const UserEditSchema = z.object({
    name: z.string().optional(),
    bio: z.string().optional(),
    email: z.string().email().optional(),
    image: z.string().url().optional(),
    bannerImage: z.string().url().optional(),
})

export type UserEdit = z.infer<typeof UserEditSchema>
