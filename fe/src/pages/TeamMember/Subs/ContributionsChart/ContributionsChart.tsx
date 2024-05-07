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
} from 'chart.js';
import { Chart, Line } from 'react-chartjs-2';

ChartJS.register(Title, Tooltip, Legend, PointElement, LinearScale, CategoryScale, LineElement);

export default function ContributionsChart({ dataList }: T.ContributionsChartProps) {
  const options = {};

  return (
    <S.ChartWrapper>
      <Line data={data} options={options} />
    </S.ChartWrapper>
  );
}

const data = {
  labels: ['Label1', 'Label2', 'Label3'],
  datasets: [
    {
      label: 'legend1',
      data: [12, 19, 3],
      borderDash: [10, 5],
    },
    {
      label: 'legend2',
      data: [22, 9, 13],
    },
  ],
};
