export const DEFAULT_PROFILE_IMAGE =
    'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg'

export const TWEET_OPTIONS = {
    user: {
        select: {
            id: true,
            name: true,
            image: true,
            followersIds: true,
        },
    },
    likes: {
        select: {
            userId: true,
        },
    },
    retweets: {
        select: {
            userId: true,
        },
    },
    replies: {
        select: {
            id: true,
            text: true,
            createdAt: true,
            image: true,
            replyLikes: {
                select: {
                    userId: true,
                },
            },
            user: {
                select: {
                    id: true,
                    name: true,
                    image: true,
                },
            },
        },
        orderBy: {
            createdAt: 'desc' as const,
        },
        take: 2,
    },
    savedTweets: {
        select: {
            userId: true,
        },
    },
    _count: {
        select: {
            replies: true,
        },
    },
}

export const PROFILE_TWEETS_OPTIONS = {
    likes: {
        select: {
            userId: true,
        },
    },
    retweets: {
        select: {
            userId: true,
        },
    },
    replies: {
        select: {
            id: true,
            text: true,
            createdAt: true,
            image: true,
            replyLikes: {
                select: {
                    userId: true,
                },
            },
            user: {
                select: {
                    id: true,
                    name: true,
                    image: true,
                },
            },
        },
        orderBy: {
            createdAt: 'desc' as const,
        },
        take: 2,
    },
    savedTweets: {
        select: {
            userId: true,
        },
    },
    _count: {
        select: {
            replies: true,
        },
    },
}

export const PROFILE_FOLLOWS_OPTIONS = {
    followers: {
        select: {
            id: true,
            name: true,
            image: true,
            bio: true,
        },
    },
    following: {
        select: {
            id: true,
            name: true,
            image: true,
            bio: true,
        },
    },
}
