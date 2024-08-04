import React from 'react'
import { DropdownMenu } from '@radix-ui/react-dropdown-menu'
import { DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ActivityTable } from '@/components/ActivityTable'

function ProfilePage() {
  return (
    <DropdownMenu>  
        <DropdownMenuTrigger>
            Your Activities
        </DropdownMenuTrigger>
    </DropdownMenu>

  )
}

export default ProfilePage