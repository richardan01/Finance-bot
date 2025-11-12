
import React from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ChartData } from '../types';

interface ChartRendererProps {
  chartData: ChartData;
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088FE', '#00C49F', '#FFBB28'];

const ChartRenderer: React.FC<ChartRendererProps> = ({ chartData }) => {
  const { chartType, data, dataKey, nameKey, title } = chartData;

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={nameKey} />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(31, 41, 55, 0.8)',
                borderColor: '#4b5563',
                color: '#ffffff',
              }}
            />
            <Legend />
            <Bar dataKey={dataKey} fill="#8884d8" />
          </BarChart>
        );
      case 'line':
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={nameKey} />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(31, 41, 55, 0.8)',
                borderColor: '#4b5563',
                color: '#ffffff',
              }}
            />
            <Legend />
            <Line type="monotone" dataKey={dataKey} stroke="#82ca9d" />
          </LineChart>
        );
      case 'pie':
        return (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey={dataKey}
              nameKey={nameKey}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(31, 41, 55, 0.8)',
                borderColor: '#4b5563',
                color: '#ffffff',
              }}
            />
            <Legend />
          </PieChart>
        );
      default:
        return <p>Unsupported chart type</p>;
    }
  };

  return (
    <div className="w-full h-80 text-gray-800 dark:text-gray-200">
        <h3 className="text-center font-semibold mb-2">{title}</h3>
        <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
        </ResponsiveContainer>
    </div>
  );
};

export default ChartRenderer;
