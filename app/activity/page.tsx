"use client";

import React, { useState } from "react";
import { ActivityTable } from '@/components/ActivityTable'
import { SelectTable } from '@/components/ActivityTable'

function ActivityPage() {
  const [table, setTable] = useState<string>("Sensor");

  return (
    <div className="space-y-6 w-11/12 mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Activity Table</h1>
        <div className="pt-11">
          <SelectTable setTable={setTable} />
        </div>
      </div>
      <div>
        <ActivityTable tableType = {table} />
      </div>
    </div>
  )
}

export default ActivityPage