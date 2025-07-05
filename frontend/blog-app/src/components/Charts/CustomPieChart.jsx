import React from 'react';
import CustomLegend from './CustomLegend';
import CustomTooltip from './CustomTooltip';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const CustomPieChart = ({ data, colors }) => {
  return (
    <ResponsiveContainer width="100%" height={325}>
      <PieChart>
        <Pie
          data={data}
          dataKey="count"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={130}
          innerRadius={100}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${entry.name || index}`}
              fill={colors[index % colors.length]}
            />
          ))}
        </Pie>

        <Tooltip content={<CustomTooltip />} />
        <Legend content={<CustomLegend />} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
