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
    replies: Reply[]
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

export interface ProfileTweet extends Tweet {
    likes: {
        userId: string
    }[]
    retweets: {
        userId: string
    }[]
    replies: Reply[]
    savedTweets: {
        userId: string
    }[]
    _count: {
        replies: number
    }
}

export interface FollowUser extends PartialUser {
    bio: User['bio']
    followersIds: string[]
}

export interface Reply {
    id: string
    text: string
    createdAt: Date
    user: PartialUser
    image: string | null
    replyLikes: {
        userId: string
    }[]
}

export interface UserToFollow extends PartialUser {
    bio: User['bio']
    bannerImage: User['bannerImage']
    _count: {
        followers: number
    }
}

export type UserSearch = Omit<UserToFollow, 'bannerImage'> & {
    followersIds?: string[]
}

export interface UserEdit extends PartialUser {
    bio: string | null
    email: string
    bannerImage: string | null
}
