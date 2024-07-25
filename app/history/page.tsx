import React from 'react'
import { HistoryByDayChart } from '@/components/HistoryByDayChart'
import { SelectSensors } from '@/components/SelectSensors'

function HistoryPage() {
  return (
    <div>
      <div><HistoryByDayChart/></div>

      <div className = "flex pt-11 justify-center mx-auto"><SelectSensors/></div>
    </div>
  )
}

export default HistoryPage