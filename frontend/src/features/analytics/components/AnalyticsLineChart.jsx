import {
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

import ChartCard from "./ChartCard";

export default function AnalyticsLineChart({
    title,
    data,
}) {
    return (
        <ChartCard title={title}>
            <ResponsiveContainer
                width="100%"
                height="100%"
            >
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="label" />
                    <YAxis />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="value"
                    />
                </LineChart>
            </ResponsiveContainer>
        </ChartCard>
    );
}