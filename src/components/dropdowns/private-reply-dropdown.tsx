import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
} from '@/components/ui/dropdown-menu'
import { MdPublic, MdPeople } from 'react-icons/md'

export default function PrivateReplyDropdown({
    children,
    setPrivateReply,
}: {
    children: React.ReactNode
    setPrivateReply: (val: boolean) => void
}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
            <DropdownMenuContent className='p-2 rounded-xl'>
                <DropdownMenuLabel className='text-xs text-dark-gray tracking-base'>
                    <p className='font-semibold '>Who can reply?</p>
                    <p className='text-light-gray'>
                        Choose who can reply to this tweet
                    </p>
                </DropdownMenuLabel>

                <DropdownMenuItem
                    className='flex items-center gap-2 px-4 py-3 rounded-lg text-dark-gray'
                    onClick={() => setPrivateReply(false)}
                >
                    <MdPublic size={24} />
                    <span>Everyone</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    className='flex items-center gap-2 px-4 py-3 rounded-lg text-dark-gray'
                    onClick={() => setPrivateReply(true)}
                >
                    <MdPeople size={24} />
                    <span>People you follow</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
