import { SavedTweet, Tweet, User } from '@prisma/client'

export interface PartialUser {
    id: User['id']
    name: User['name']
    image: User['image']
}

export interface HomeTweet extends Tweet {
    user: PartialUser & {
        followersIds: string[]
    }
    likes: {
        userId: string
    }[]
    retweets: {
        userId: string
    }[]
    replies: {
        id: string
        text: string
        createdAt: Date
        user: PartialUser
    }[]
    savedTweets: {
        userId: string
    }[]
    _count: {
        replies: number
    }
}

export interface BookmarkedTweet extends SavedTweet {
    tweet: HomeTweet
}
