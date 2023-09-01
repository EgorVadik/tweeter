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
            <DropdownMenuContent className='rounded-xl p-2'>
                <DropdownMenuLabel className='text-dark-gray text-xs tracking-base'>
                    <p className='font-semibold '>Who can reply?</p>
                    <p className='text-light-gray'>
                        Choose who can reply to this tweet
                    </p>
                </DropdownMenuLabel>

                <DropdownMenuItem
                    className='flex gap-2 items-center text-dark-gray px-4 py-3 rounded-lg'
                    onClick={() => setPrivateReply(false)}
                >
                    <MdPublic size={24} />
                    <span>Everyone</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    className='flex gap-2 items-center text-dark-gray px-4 py-3 rounded-lg'
                    onClick={() => setPrivateReply(true)}
                >
                    <MdPeople size={24} />
                    <span>People you follow</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
