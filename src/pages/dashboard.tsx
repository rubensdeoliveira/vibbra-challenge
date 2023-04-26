import React, { useState } from 'react'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  BarElement,
} from 'chart.js'
import { Bar, Line } from 'react-chartjs-2'

import { InputSelect, Navbar } from '@/client/application/components'
import { faker } from '@faker-js/faker'
import { api } from '@/shared/utils'

ChartJS.register(
  CategoryScale,
  BarElement,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

const labels = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
]

export const costsData = {
  labels,
  datasets: [
    {
      label: 'Despesas',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: '#13B497',
      backgroundColor: '#13B497',
    },
  ],
}

export const meiLimitoptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        color: '#ffffff',
      },
    },
    title: {
      display: true,
      text: 'Gráfico de Limite/Notas Fiscais Geradas do MEI',
      color: '#ffffff',
    },
  },
}

export const receiptsChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        color: '#ffffff',
      },
    },
    title: {
      display: true,
      text: 'Gráfico de Notas Fiscais Geradas',
      color: '#ffffff',
    },
  },
}

export const costsChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        color: '#ffffff',
      },
    },
    title: {
      display: true,
      text: 'Gráfico de Despesas',
      color: '#ffffff',
    },
  },
}

export default function Dashboard() {
  const [selectedYear, setSelectedYear] = useState<string>(
    new Date().getFullYear().toString(),
  )

  const { data: amountByMonthReceipt } =
    api.receipt.listAmountByMonthInYear.useQuery({
      year: selectedYear,
    })

  const { data: amountByMonthReceiptCost } =
    api.cost.listAmountByMonthInYear.useQuery({
      year: selectedYear,
    })

  const { data: config } = api.config.getByUser.useQuery()

  return (
    <Navbar>
      <div className="flex w-full flex-col items-center gap-[3.125rem]">
        <InputSelect
          options={Array.from({ length: 201 }, (_, i) => (i + 1900).toString())}
          onChange={e => setSelectedYear(e.target.value)}
          value={selectedYear}
          className="max-w-[800px]"
        />
        <div className="flex w-full max-w-[800px] rounded-[14px] bg-gray-800 p-8">
          <Bar
            options={meiLimitoptions}
            data={{
              labels: amountByMonthReceipt?.map(item => item.month),
              datasets: [
                {
                  label: 'Valor em NFe Gerado',
                  data: amountByMonthReceipt?.map(item => item.value),
                  backgroundColor: '#13B497',
                },
                {
                  label: 'Limite do MEI',
                  data: amountByMonthReceipt?.map(() => config?.meiLimit ?? 0),
                  backgroundColor: '#D9B75F',
                },
              ],
            }}
          />
        </div>
        <div className="flex w-full max-w-[800px] rounded-[14px] bg-gray-800 p-8">
          <Line
            options={receiptsChartOptions}
            data={{
              labels: amountByMonthReceipt?.map(item => item.month),
              datasets: [
                {
                  label: 'Notas Fiscais Geradas',
                  data: amountByMonthReceipt?.map(item => item.value),
                  borderColor: '#13B497',
                  backgroundColor: '#13B497',
                },
              ],
            }}
          />
        </div>
        <div className="flex w-full max-w-[800px] rounded-[14px] bg-gray-800 p-8">
          <Line
            options={costsChartOptions}
            data={{
              labels: amountByMonthReceiptCost?.map(item => item.month),
              datasets: [
                {
                  label: 'Notas Fiscais Geradas',
                  data: amountByMonthReceiptCost?.map(item => item.value),
                  borderColor: '#13B497',
                  backgroundColor: '#13B497',
                },
              ],
            }}
          />
        </div>
      </div>
    </Navbar>
  )
}
