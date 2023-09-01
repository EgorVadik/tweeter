import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type UserAvatarProps = {
    image?: string
    name: string
}

export default function UserAvatar({ image, name }: UserAvatarProps) {
    return (
        <Avatar className='rounded-lg'>
            <AvatarImage className='rounded-lg' src={image} />
            <AvatarFallback className='uppercase rounded-lg'>
                {name.charAt(0)}
                {name.charAt(1)}
            </AvatarFallback>
        </Avatar>
    )
}
