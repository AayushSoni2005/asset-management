import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Tooltip,
    Legend,
    Cell,
} from "recharts";

import ChartCard from "./ChartCard";
import { CHART_COLORS } from "../constants";

export default function AnalyticsPieChart({ title, data }) {
    return (
        <ChartCard title={title}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="label"
                        outerRadius={100}
                        label
                    >
                        {data.map((_, index) => (
                            <Cell
                                key={index}
                                fill={
                                    CHART_COLORS[
                                        index % CHART_COLORS.length
                                    ]
                                }
                            />
                        ))}
                    </Pie>

                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </ChartCard>
    );
}