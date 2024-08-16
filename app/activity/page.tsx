import React from 'react'
import { ActivityTable } from '@/components/ActivityTable'

function ActivityPage() {
  return (
    <div className="space-y-6 w-11/12 mx-auto">
      <h1 className="text-3xl font-bold">Activity Table</h1>
      <div className="pb-20 md:pb-0"><ActivityTable/></div>
    </div>
  )
}

export default ActivityPage