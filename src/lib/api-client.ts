import type { BookmarkedTweet, HomeTweet } from '@/types/types'
import type { NewReplyForm, NewTweetForm } from '@/validations/zod-validations'
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
    return response.data
}

export const getExplore = async (url?: 'latest' | 'people' | 'media') => {
    const response = await axios.get(
        url === undefined ? '/api/explore' : `/api/explore/${url}`
    )
    const { tweets } = response.data as { tweets: HomeTweet[] }

    return tweets
}

export const setFollowUser = async (
    id: string,
    followType: 'Unfollow' | 'Follow',
    router: any,
    toast: any
) => {
    try {
        await axios.post('/api/follow-user', { id, followType })
        router.refresh()
    } catch (error) {
        toast({
            title: 'Something went wrong',
            description: 'Please try again later',
        })
    }
}

export const createReply = async ({
    reply,
    tweetId,
}: {
    reply: NewReplyForm
    tweetId: string
}) => {
    const response = await axios.post('/api/tweets/reply', {
        ...reply,
        tweetId,
    })
    return response.data as HomeTweet
}

export const getBookmarks = async (
    url?: 'likes' | 'tweets-and-replies' | 'media'
) => {
    const response = await axios.get(
        url === undefined ? '/api/bookmarks' : `/api/bookmarks/${url}`
    )
    const { bookmarkedTweets } = response.data as {
        bookmarkedTweets: BookmarkedTweet[]
    }

    return bookmarkedTweets
}

export const toggleReplyLike = async (id: string) => {
    const response = await axios.post('/api/tweets/reply/like', { id })
    return response.data
}
