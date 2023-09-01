import { HomeTweet } from '@/types/types'
import { NewTweetForm } from '@/validations/zod-validations'
import { Retweet } from '@prisma/client'
import axios from 'axios'

export const createTweet = async (tweet: NewTweetForm) => {
    const response = await axios.post('/api/tweets/home', tweet)
    return response.data as HomeTweet
}

export const getTweets = async () => {
    const response = await axios.get('/api/tweets/home')
    const { tweets } = response.data as { tweets: HomeTweet[] }
    return tweets
}

export const handleTweetActions = async ({
    id,
    action,
}: {
    id: string
    action: 'like' | 'save' | 'retweet'
}) => {
    const response = await axios.post(`/api/tweets/${action}`, { id })
    // const response = await axios.post('/api/tweets/retweet', { id })
    return response.data
}
