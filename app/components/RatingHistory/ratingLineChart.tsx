'use client';

import ApexCharts from 'react-apexcharts';

export const RatingLineChart = ({ series }) => {

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
    }
  };

  return <ApexCharts options={options} series={series} type="line" height={350} />;
};