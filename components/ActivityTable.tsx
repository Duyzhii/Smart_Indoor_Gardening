'use client';

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
import { DataHistory } from "@/lib/definitions"
import { getSensorData } from "@/database/database"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export function ActivityTable() {
    const [historyData, setHistoryData] = useState<DataHistory[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 7

    useEffect(() => {
        const fetchData = async () => {
            try {
                let data = await getSensorData() as DataHistory[]
                setHistoryData(data)
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
    const currentData = historyData.slice(indexOfFirstItem, indexOfLastItem)

    const totalPages = Math.ceil(historyData.length / itemsPerPage)

    const handlePrevious = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1))
    }

    const handleNext = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages))
    }

    const handlePageClick = (pageNumber: number) => {
        setCurrentPage(pageNumber)
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
                pages.push(<span key="start-ellipsis" className="mx-2">...</span>)
            }
    
            if (currentPage > 3 && currentPage < totalPages - 2) {
                pages.push(
                    <Button
                        key={currentPage - 1}
                        onClick={() => handlePageClick(currentPage - 1)}
                        className="mx-2"
                        variant= "secondary"
                    >
                        {currentPage - 1}
                    </Button>
                )
                pages.push(
                    <Button
                        key={currentPage}
                        onClick={() => handlePageClick(currentPage)}
                        className="mx-2 bg-green-700 text-white"
                        variant= "secondary"
                    >
                        {currentPage}
                    </Button>
                )
                pages.push(
                    <Button
                        key={currentPage + 1}
                        onClick={() => handlePageClick(currentPage + 1)}
                        className="mx-2"
                        variant= "secondary"
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
                        variant={"secondary"}
                    >
                        3
                    </Button>
                )
                pages.push(
                    <Button
                        key={4}
                        onClick={() => handlePageClick(4)}
                        className={`mx-2 ${currentPage === 4 ? 'bg-green-700 text-white' : ''}`}
                        variant={"secondary"}
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
                        variant={"secondary"}
                    >
                        {totalPages - 3}
                    </Button>
                )
                pages.push(
                    <Button
                        key={totalPages - 2}
                        onClick={() => handlePageClick(totalPages - 2)}
                        className={`mx-2 ${currentPage === totalPages - 2 ? 'bg-green-700 text-white' : ''}`}
                        variant={"secondary"}
    
                    >
                        {totalPages - 2}
                    </Button>
                )
            }
    
            if (currentPage < totalPages - 3) {
                pages.push(<span key="end-ellipsis" className="mx-2">...</span>)
            }
    
            pages.push(
                <Button
                    key={totalPages - 1}
                    onClick={() => handlePageClick(totalPages - 1)}
                    className={`mx-2 ${currentPage === totalPages - 1 ? 'bg-green-700 text-white' : ''}`}
                    variant={"secondary"}
    
                >
                    {totalPages - 1}
                </Button>
            )
            pages.push(
                <Button
                    key={totalPages}
                    onClick={() => handlePageClick(totalPages)}
                    className={`mx-2 ${currentPage === totalPages ? 'bg-green-700 text-white' : ''}`}
                    variant={"secondary"}
    
                >
                    {totalPages}
                </Button>
            )
    
            return pages
        }
    }
    

    return (
        <div>
            {/* <Button className="mb-4" onClick={() => setCurrentPage(1)}>Refresh</Button> */}
            <Table>
                <TableCaption>A list of your recent plant activities.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Sensor</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead>Control Device</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Time Report</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentData.map((data, index) => (
                        <TableRow key={data.id || `activity-${index}`}>
                            <TableCell className="font-medium">{data.sensorType}</TableCell>
                            <TableCell>{data.value}</TableCell>
                            <TableCell>{data.controlDevice}</TableCell>
                            <TableCell>{data.deviceStatus}</TableCell>
                            <TableCell>{data.timeReport.toString()}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={4}>Total</TableCell>
                        <TableCell className="text-right">{historyData.length} Activities</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>

            {/* Pagination controls */}
            <div className="flex justify-center mt-4">
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
