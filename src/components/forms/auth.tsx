'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import axios, { AxiosError } from 'axios'
import { signIn } from 'next-auth/react'
import { User } from '@prisma/client'
import { showSignUpError } from '@/lib/helpers'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    SignInForm,
    SignUpForm,
    signInSchema,
    signUpSchema,
} from '@/validations/zod-validations'
import { Loader2 } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

type Props = {
    authType: 'sign-in' | 'sign-up'
}

export default function Auth({ authType }: Props) {
    const {
        handleSubmit,
        formState: { errors, isSubmitting },
        register,
    } = useForm<SignUpForm | SignInForm>({
        resolver: zodResolver(
            authType === 'sign-up' ? signUpSchema : signInSchema
        ),
    })
    const { toast } = useToast()
    const router = useRouter()

    const isSignUp = (data: SignUpForm | SignInForm): data is SignUpForm => {
        return 'name' in data
    }

    const onSubmit = async (data: SignUpForm | SignInForm) => {
        if (authType === 'sign-up' && isSignUp(data)) {
            try {
                const {
                    data: { newUser },
                } = (await axios.post('/api/auth/sign-up', data)) as {
                    data: { newUser: User }
                }

                await signIn('credentials', {
                    email: newUser.email,
                    password: data.password,
                })
            } catch (error) {
                showSignUpError(error, toast)
            }
            return
        }

        try {
            const res = await signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false,
                callbackUrl: '/',
            })

            if (res?.error === 'Invalid Email') {
                toast({
                    title: 'Invalid Email',
                    description: 'Please try again',
                })
                return
            }

            if (res?.error === 'Invalid password') {
                toast({
                    title: 'Invalid Password',
                    description: 'Please try again',
                })
                return
            }

            router.replace('/')
        } catch (error) {
            toast({
                title: 'Something went wrong',
                description: 'Please try again',
            })
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='min-h-screen grid place-content-center'
        >
            <Card className='max-w-sm'>
                <CardHeader className='space-y-1'>
                    <CardTitle className='text-2xl'>
                        {authType === 'sign-in'
                            ? 'Sign in'
                            : 'Create an account'}
                    </CardTitle>
                    <CardDescription>
                        Enter your email below to{' '}
                        {authType === 'sign-in' ? 'login to' : 'create'} your
                        account
                    </CardDescription>
                </CardHeader>
                <CardContent className='grid gap-4'>
                    <div className='relative'>
                        <div className='absolute inset-0 flex items-center'>
                            <span className='w-full border-t mb-5' />
                        </div>
                    </div>
                    {authType === 'sign-up' && (
                        <>
                            <div className='w-32 h-32 rounded-full m-auto border mt-5'>
                                <input
                                    type='file'
                                    className='sr-only'
                                    // {...register('image')}
                                />
                            </div>
                            <div className='grid gap-2'>
                                <label htmlFor='name'>
                                    Name
                                    <span className='text-xs text-red-500'>
                                        {'name' in errors && errors.name
                                            ? ` (${errors.name.message})`
                                            : ''}
                                    </span>
                                </label>
                                <Input
                                    id='name'
                                    type='text'
                                    placeholder='John Doe'
                                    {...register('name')}
                                />
                            </div>
                        </>
                    )}
                    <div className='grid gap-2'>
                        <label htmlFor='email'>
                            Email
                            <span className='text-xs text-red-500'>
                                {errors.email && ` (${errors.email.message})`}
                            </span>
                        </label>
                        <Input
                            id='email'
                            type='email'
                            placeholder='m@example.com'
                            {...register('email')}
                        />
                    </div>
                    <div className='grid gap-2'>
                        <label htmlFor='password'>
                            Password
                            <span className='text-xs text-red-500'>
                                {errors.password &&
                                    ` (${errors.password.message})`}
                            </span>
                        </label>
                        <Input
                            id='password'
                            type='password'
                            {...register('password')}
                        />
                    </div>
                </CardContent>
                <CardFooter className='flex-col gap-4'>
                    <Button
                        type='submit'
                        className='w-full flex justify-center items-center gap-2'
                        disabled={isSubmitting}
                    >
                        {isSubmitting && <Loader2 className='animate-spin' />}{' '}
                        {authType === 'sign-in' ? 'Sign in' : 'Create account'}
                    </Button>
                    <div>
                        {authType === 'sign-in' ? (
                            <p>
                                {"Don't have an account? "}
                                <Link
                                    href='/sign-up'
                                    className='underline text-blue-500'
                                >
                                    Sign up
                                </Link>
                            </p>
                        ) : (
                            <p>
                                Already have an account?{' '}
                                <Link
                                    href='/sign-in'
                                    className='underline text-blue-500'
                                >
                                    Sign in
                                </Link>
                            </p>
                        )}
                    </div>
                </CardFooter>
            </Card>
        </form>
    )
}
