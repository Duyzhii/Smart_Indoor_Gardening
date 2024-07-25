
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
const plants = [
    { plant: "Apple", date: "29/8/2004", time: "12:30 pm", activity: "LED_ON", by: "Automatic" },
    { plant: "Banana", date: "15/9/2004", time: "02:00 pm", activity: "WATERED", by: "Manual" },
    { plant: "Cherry", date: "22/9/2004", time: "10:15 am", activity: "FERTILIZED", by: "Automatic" },
    { plant: "Date", date: "05/10/2004", time: "03:30 pm", activity: "PRUNED", by: "Manual" },
    { plant: "Fig", date: "12/10/2004", time: "01:00 pm", activity: "LED_ON", by: "Automatic" },
    { plant: "Grape", date: "19/10/2004", time: "11:45 am", activity: "WATERED", by: "Manual" },
    { plant: "Lemon", date: "26/10/2004", time: "09:30 am", activity: "FERTILIZED", by: "Automatic" },
    { plant: "Mango", date: "02/11/2004", time: "04:00 pm", activity: "LED_ON", by: "Manual" },
    { plant: "Nectarine", date: "09/11/2004", time: "08:00 am", activity: "WATERED", by: "Automatic" },
    { plant: "Olive", date: "16/11/2004", time: "12:00 pm", activity: "PRUNED", by: "Manual" },
    { plant: "Peach", date: "23/11/2004", time: "03:15 pm", activity: "FERTILIZED", by: "Automatic" },
    { plant: "Pear", date: "30/11/2004", time: "10:00 am", activity: "LED_ON", by: "Manual" },
    { plant: "Plum", date: "07/12/2004", time: "01:30 pm", activity: "WATERED", by: "Automatic" },
    { plant: "Quince", date: "14/12/2004", time: "02:45 pm", activity: "FERTILIZED", by: "Manual" },
    { plant: "Raspberry", date: "21/12/2004", time: "11:00 am", activity: "LED_ON", by: "Automatic" },
    { plant: "Strawberry", date: "28/12/2004", time: "09:30 am", activity: "WATERED", by: "Manual" },
    { plant: "Tomato", date: "04/01/2005", time: "10:15 am", activity: "PRUNED", by: "Automatic" },
    { plant: "Uva", date: "11/01/2005", time: "03:00 pm", activity: "FERTILIZED", by: "Manual" },
    { plant: "Violet", date: "18/01/2005", time: "12:30 pm", activity: "LED_ON", by: "Automatic" },
    { plant: "Watermelon", date: "25/01/2005", time: "04:15 pm", activity: "WATERED", by: "Manual" },
    { plant: "Xigua", date: "01/02/2005", time: "08:45 am", activity: "FERTILIZED", by: "Automatic" },
    { plant: "Yellow Pepper", date: "08/02/2005", time: "02:00 pm", activity: "PRUNED", by: "Manual" },
];


export function ActivityTable() {
    return (
        <Table>
            <TableCaption>A list of your recent plant activities.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Plant</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Activity</TableHead>
                    <TableHead>By</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {plants.map((plant) => (
                    <TableRow key={plant.plant}>
                        <TableCell className="font-medium">{plant.plant}</TableCell>
                        <TableCell>{plant.date}</TableCell>
                        <TableCell>{plant.time}</TableCell>
                        <TableCell>{plant.activity}</TableCell>
                        <TableCell>{plant.by}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={4}>Total</TableCell>
                    <TableCell className="text-right">{plants.length} Activities</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}

