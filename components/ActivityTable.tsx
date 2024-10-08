'use client';

import * as React from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { getControlDeviceData, getSensorData } from "@/database/database"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { SensorData, ControlDeviceData } from "@/lib/definitions";

export interface SelectTableProps {
    setTable: (value: string) => void;
}

export function SelectTable({ setTable }: SelectTableProps) {
    return (
        <Select onValueChange={(e) => setTable(e)}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a table" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Tables</SelectLabel>
                    <SelectItem value="Sensor">Sensor</SelectItem>
                    <SelectItem value="Control Device">Control Device</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
interface ActivityTableProps {
    tableType: string;
}

export function ActivityTable( {tableType}: ActivityTableProps) {
    const [sensorData, setSensorData] = useState<SensorData[]>([])
    const [controlDeviceData, setControlDeviceData] = useState<ControlDeviceData[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 7
    const [pageInput, setPageInput] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                let sensorData = await getSensorData()
                let controlDeviceData = await getControlDeviceData()

                setSensorData(sensorData)
                setControlDeviceData(controlDeviceData)
            }
            catch (error) {
                console.error("Error fetching data: ", error)
            }
        }

        fetchData();
        const interval = setInterval(fetchData, 7000);

        return () => clearInterval(interval)
    }, [])

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentData = tableType ==  "Sensor" ? sensorData.slice(indexOfFirstItem, indexOfLastItem) : controlDeviceData.slice(indexOfFirstItem, indexOfLastItem)
    const totalPages = Math.ceil((tableType == "Sensor" ? sensorData.length : controlDeviceData.length) / itemsPerPage)


    const handlePrevious = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1))
    }

    const handleNext = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages))
    }

    const handlePageClick = (pageNumber: number) => {
        setCurrentPage(pageNumber)
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPageInput(event.target.value)
    }

    const handleInputBlurOrEnter = () => {
        const pageNumber = Math.max(1, Math.min(totalPages, parseInt(pageInput)))
        if (!isNaN(pageNumber)) {
            setCurrentPage(pageNumber)
        }
    }

    const renderPagination = () => {
        if (totalPages <= 6) {
            // Simple pagination for up to 6 pages
            return Array.from({ length: totalPages }, (_, i) => (
                <Button
                    key={i + 1}
                    onClick={() => handlePageClick(i + 1)}
                    className={`mx-2 ${currentPage === i + 1 ? 'bg-green-700 text-white' : ''}`}
                    variant="secondary"
                >
                    {i + 1}
                </Button>
            ))
        } else {
            // Condensed pagination for more than 6 pages
            const pages = []
    
            pages.push(
                <Button
                    key={1}
                    onClick={() => handlePageClick(1)}
                    className={`mx-2 ${currentPage === 1 ? 'bg-green-700 text-white' : ''}`}
                    variant={"secondary"}
                >
                    1
                </Button>
            )
            pages.push(
                <Button
                    key={2}
                    onClick={() => handlePageClick(2)}
                    className={`mx-2 ${currentPage === 2 ? 'bg-green-700 text-white' : ''}`}
                    variant={"secondary"}   
                >
                    2
                </Button>
            )
    
            if (currentPage > 4) {
                pages.push(
                    <input
                        key="start-input"
                        type="number"
                        value={pageInput}
                        onChange={handleInputChange}
                        onBlur={handleInputBlurOrEnter}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleInputBlurOrEnter() }}
                        className="mx-2 border rounded text-center w-12"
                        placeholder="..."
                    />
                )
            }
    
            if (currentPage > 3 && currentPage < totalPages - 2) {
                pages.push(
                    <Button
                        key={currentPage - 1}
                        onClick={() => handlePageClick(currentPage - 1)}
                        className="mx-2"
                        variant="secondary"
                    >
                        {currentPage - 1}
                    </Button>
                )
                pages.push(
                    <Button
                        key={currentPage}
                        onClick={() => handlePageClick(currentPage)}
                        className="mx-2 bg-green-700 text-white"
                        variant="secondary"
                    >
                        {currentPage}
                    </Button>
                )
                pages.push(
                    <Button
                        key={currentPage + 1}
                        onClick={() => handlePageClick(currentPage + 1)}
                        className="mx-2"
                        variant="secondary"
                    >
                        {currentPage + 1}
                    </Button>
                )
            } else if (currentPage <= 3) {
                pages.push(
                    <Button
                        key={3}
                        onClick={() => handlePageClick(3)}
                        className={`mx-2 ${currentPage === 3 ? 'bg-green-700 text-white' : ''}`}
                        variant="secondary"
                    >
                        3
                    </Button>
                )
                pages.push(
                    <Button
                        key={4}
                        onClick={() => handlePageClick(4)}
                        className={`mx-2 ${currentPage === 4 ? 'bg-green-700 text-white' : ''}`}
                        variant="secondary"
                    >
                        4
                    </Button>
                )
            } else if (currentPage >= totalPages - 2) {
                pages.push(
                    <Button
                        key={totalPages - 3}
                        onClick={() => handlePageClick(totalPages - 3)}
                        className={`mx-2 ${currentPage === totalPages - 3 ? 'bg-green-700 text-white' : ''}`}
                        variant="secondary"
                    >
                        {totalPages - 3}
                    </Button>
                )
                pages.push(
                    <Button
                        key={totalPages - 2}
                        onClick={() => handlePageClick(totalPages - 2)}
                        className={`mx-2 ${currentPage === totalPages - 2 ? 'bg-green-700 text-white' : ''}`}
                        variant="secondary"
                    >
                        {totalPages - 2}
                    </Button>
                )
            }
    
            if (currentPage < totalPages - 3) {
                pages.push(
                    <input
                        key="end-input"
                        type="number"
                        value={pageInput}
                        onChange={handleInputChange}
                        onBlur={handleInputBlurOrEnter}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleInputBlurOrEnter() }}
                        className="mx-2 border rounded text-center w-12"
                        placeholder="..."
                    />
                )
            }
    
            pages.push(
                <Button
                    key={totalPages - 1}
                    onClick={() => handlePageClick(totalPages - 1)}
                    className={`mx-2 ${currentPage === totalPages - 1 ? 'bg-green-700 text-white' : ''}`}
                    variant="secondary"
                >
                    {totalPages - 1}
                </Button>
            )
            pages.push(
                <Button
                    key={totalPages}
                    onClick={() => handlePageClick(totalPages)}
                    className={`mx-2 ${currentPage === totalPages ? 'bg-green-700 text-white' : ''}`}
                    variant="secondary"
                >
                    {totalPages}
                </Button>
            )
    
            return pages
        }
    }

    if(tableType === "Sensor") {
        return (
            <div>
                {/* <Button className="mb-4" onClick={() => setCurrentPage(1)}>Refresh</Button> */}
                <Table>
                    <TableCaption>A list of your recent plant activities.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[300px]">Sensor</TableHead>
                            <TableHead className = "w-[200px]">Value</TableHead>
                            <TableHead>Time Report</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentData.map((data, index) => (
                            data = data as SensorData,
                            <TableRow key={data.id || `activity-${index}`}>
                                <TableCell className="font-medium">{data.sensorType}</TableCell>
                                <TableCell className="mx-auto">{data.value}</TableCell>
                                <TableCell>{data.timeReport.toString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={4}>Total</TableCell>
                            <TableCell className="text-right">{sensorData.length} Activities</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>

                {/* Pagination controls */}
                <div className="flex justify-center mt-4 mb-14">
                    <Button 
                        onClick={handlePrevious} 
                        disabled={currentPage === 1}
                        className="mx-2"
                        variant="secondary"
                    >
                        Previous
                    </Button>
                    {renderPagination()}
                    <Button 
                        onClick={handleNext} 
                        disabled={currentPage === totalPages}
                        className="mx-2"
                        variant= "secondary"
                    >
                        Next
                    </Button>
                </div>
            </div>
        )
    }


    else if (tableType  === "Control Device") {
        return (
            <div>
                {/* <Button className="mb-4" onClick={() => setCurrentPage(1)}>Refresh</Button> */}
                <Table className="w-full">
                    <TableCaption>A list of your recent plant activities.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="md:w-[300px] sm:w-[200px]">Control Device</TableHead>
                            <TableHead className = "md:w-[200px] sm:w-[50px]">Status</TableHead>
                            <TableHead className = "sm:w-[500px] pr-0">Time Report</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentData.map((data, index) => (
                            data = data as ControlDeviceData,
                            <TableRow key={data.id || `activity-${index}`}>
                                <TableCell className="font-medium">{data.deviceType}</TableCell>
                                <TableCell>{data.status}</TableCell>
                                <TableCell>{data.timeReport.toString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={4}>Total</TableCell>
                            <TableCell className="text-right">{controlDeviceData.length} Activities</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>

                {/* Pagination controls */}
                <div className="flex justify-center mt-4 mb-14">
                    <Button 
                        onClick={handlePrevious} 
                        disabled={currentPage === 1}
                        className="mx-2"
                        variant="secondary"
                    >
                        Previous
                    </Button>
                    {renderPagination()}
                    <Button 
                        onClick={handleNext} 
                        disabled={currentPage === totalPages}
                        className="mx-2"
                        variant= "secondary"
                    >
                        Next
                    </Button>
                </div>
            </div>
        )

    }
}
