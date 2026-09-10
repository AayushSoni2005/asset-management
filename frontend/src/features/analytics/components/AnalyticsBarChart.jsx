import {
    ResponsiveContainer,
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Cell,
} from "recharts";

import ChartCard from "./ChartCard";
import { CHART_COLORS } from "../constants";

const formatLabel = (text) =>
    text
        ?.replaceAll("_", " ")
        .toLowerCase()
        .replace(/\b\w/g, (c) => c.toUpperCase());

export default function AnalyticsBarChart({
    title,
    data,
}) {
    return (
        <ChartCard title={title}>
            <ResponsiveContainer
                width="100%"
                height="100%"
            >
                <BarChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 20,
                        left: 0,
                        bottom: 15,
                    }}
                >
                    <CartesianGrid
                        stroke="#E5E7EB"
                        strokeDasharray="4 4"
                        vertical={false}
                    />

                    <XAxis
                        dataKey="label"
                        tickFormatter={formatLabel}
                        tick={{
                            fontSize: 12,
                        }}
                        interval={0}
                    />

                    <YAxis
                        allowDecimals={false}
                        tick={{
                            fontSize: 12,
                        }}
                    />

                    <Tooltip
                        formatter={(value) => [value, "Count"]}
                        labelFormatter={formatLabel}
                        cursor={{
                            fill: "#F8FAFC",
                        }}
                        contentStyle={{
                            borderRadius: 12,
                            border: "none",
                            boxShadow:
                                "0 8px 24px rgba(0,0,0,.15)",
                        }}
                    />

                    <Bar
                        dataKey="value"
                        radius={[10, 10, 0, 0]}
                        animationDuration={900}
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={entry.label}
                                fill={
                                    CHART_COLORS[
                                        index %
                                            CHART_COLORS.length
                                    ]
                                }
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </ChartCard>
    );
}