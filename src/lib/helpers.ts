import { prisma } from '@/server/db'
import { AxiosError } from 'axios'
import moment from 'moment'
import { TWEET_OPTIONS } from '@/lib/constants'

export const showSignUpError = (error: unknown, toast: any) => {
    if (error instanceof AxiosError) {
        switch (error.response?.status) {
            case 400:
                toast({
                    title: 'Invalid data',
                    description: 'Please check your data and try again',
                })
                break
            case 409:
                toast({
                    title: 'Email already exists',
                    description: "This email's already in use try another one",
                })
                break
            case 500:
                toast({
                    title: 'Internal server error',
                    description: 'Something went wrong please try again later',
                })
                break

            default:
                toast({
                    title: 'An error has occurred',
                    description: 'Something went wrong please try again later',
                })
                break
        }
    }
}

export const formatDate = (date: Date) => {
    return moment(date).format('D MMMM [at] HH:mm')
}

export const formatNumber = (number: number) => {
    const numberFormatter = new Intl.NumberFormat('en-US', {
        style: 'decimal',
        maximumFractionDigits: 0,
        notation: 'compact',
    })
    return numberFormatter.format(number)
}

export const getTweets = async (orderBy: any) => {
    const tweets = await prisma.tweet.findMany({
        include: {
            ...TWEET_OPTIONS,
        },
        orderBy,
    })

    return tweets
}

export const getBookmarkedTweets = async (userId: string, orderBy: any) => {
    const tweets = await prisma.savedTweet.findMany({
        where: {
            userId,
        },
        include: {
            tweet: {
                include: {
                    ...TWEET_OPTIONS,
                },
            },
        },
        orderBy,
    })

    return tweets
}
