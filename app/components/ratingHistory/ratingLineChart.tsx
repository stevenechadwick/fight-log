'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

import { Skeleton } from '@nextui-org/react';

const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

export const RatingLineChart = ({ series }) => {
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const options: ApexCharts.ApexOptions = {
    chart: {
      animations: {
        enabled: false,
      },
      type: 'line',
      height: 350,
      toolbar: {
        show: false,
      },
      background: '#18181b',
      events: {
        beforeMount: () => setIsLoading(false),
      }
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    title: {
      text: 'Rating History',
      align: 'center',
    },
    xaxis: {
      type: 'category',
      labels: {
        show: false,
      },
    },
    legend: {
      show: false,
    },
    tooltip: {
      theme: 'dark',
      enabled: false,
    },
    noData: {
      text: "loading..."
    }
  };

  return (
    <div className="w-full h-350 relative">
      {isLoading && (
        <div className="absolute inset-0">
          <Skeleton className="rounded-lg" style={{height: '350px'}}>
            <div className="h-24 rounded-lg bg-default-300" />
          </Skeleton>
        </div>
      )}
      {/* Render the chart but control its visibility */}
      <div style={{ display: isClient && !isLoading ? 'block' : 'none' }}>
        <ApexCharts options={options} series={series} type="line" height={350} width={"100%"} />
      </div>
    </div>
  );
};