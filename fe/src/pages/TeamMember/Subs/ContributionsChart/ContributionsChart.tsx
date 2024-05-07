import React from 'react';
import * as S from './ContributionsChartStyle';
import * as T from '@types';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LinearScale,
  CategoryScale,
  LineElement,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { PALETTE } from '@/styles';

ChartJS.register(Title, Tooltip, Filler, Legend, PointElement, LinearScale, CategoryScale, LineElement);

export default function ContributionsChart({ dataList }: T.ContributionsChartProps) {
  const options = {
    type: 'line',
    responsive: true,
    plugins: { title: { display: false }, legend: { display: false } },
    scales: {
      y: { ticks: { font: { size: 10, famliy: 'Pretendard' } } },
      x: { ticks: { font: { size: 10, famliy: 'Pretendard' } }, grid: { display: false } },
    },
    aspectRatio: 2 / 1,
  };

  const data = {
    labels: ['Label1', 'Label2', 'Label3', 'Label1', 'Label2', 'Label3', 'Label1', 'Label2', 'Label3'],
    datasets: [
      {
        data: [1, 3, 41, 3, 5, 12, 8, 9, 10],
        fill: 'start',
        backgroundColor: PALETTE.MAIN_COLOR,
        borderColor: PALETTE.MAIN_COLOR,
        pointRadius: 1,
      },
    ],
  };

  return (
    <S.ChartWrapper>
      <Line data={data} options={options} />
    </S.ChartWrapper>
  );
}
