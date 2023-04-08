import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface LineChartProps {
    data: number[];
    labels: string[];
  }

  const LineChart: React.FC<LineChartProps> = ({ data, labels }) => {
    const chartRef = useRef<HTMLCanvasElement>(null);
  
    useEffect(() => {
      if (chartRef.current) {
        const chart = new Chart(chartRef.current, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [
              {
                label: 'Megtett Kilóméterek',
                data: data,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 1)',
                tension: 0
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
        return () => {
            chart.destroy();
          };
      }
    }, [data, labels]);
  
    return <canvas ref={chartRef} />;
  };
  
  export default LineChart;