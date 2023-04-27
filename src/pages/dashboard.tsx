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
import { withSSRAuthenticated } from '@/client/application/helpers'

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

export const getServerSideProps = withSSRAuthenticated(async () => {
  return {
    props: {},
  }
})

export default function Dashboard() {
  const [selectedYearForReceiptChart, setSelectedYearForReceiptChart] =
    useState<string>(new Date().getFullYear().toString())
  const [selectedYearForReceiptMeiChart, setSelectedYearForReceiptMeiChart] =
    useState<string>(new Date().getFullYear().toString())
  const [selectedYearForCostChart, setSelectedYearForCostChart] =
    useState<string>(new Date().getFullYear().toString())

  const { data: amountByMonthReceipt } =
    api.receipt.listAmountByMonthInYear.useQuery({
      year: selectedYearForReceiptChart,
    })

  const { data: amountByMonthReceiptForMeiChart } =
    api.receipt.listAmountByMonthInYear.useQuery({
      year: selectedYearForReceiptMeiChart,
    })

  const { data: amountByMonthCost } = api.cost.listAmountByMonthInYear.useQuery(
    {
      year: selectedYearForCostChart,
    },
  )

  const { data: config } = api.config.getByUser.useQuery()

  return (
    <Navbar>
      <div className="flex w-full flex-col items-center gap-[3.125rem]">
        <div className="flex w-full max-w-[800px] flex-col gap-6 rounded-[14px] bg-gray-800 p-8">
          <InputSelect
            options={Array.from({ length: 201 }, (_, i) =>
              (i + 1900).toString(),
            )}
            onChange={e => setSelectedYearForReceiptMeiChart(e.target.value)}
            value={selectedYearForReceiptMeiChart}
            className="max-w-[300px]"
          />
          <Bar
            options={meiLimitoptions}
            data={{
              labels: amountByMonthReceiptForMeiChart?.map(item => item.month),
              datasets: [
                {
                  label: 'Valor em NFe Gerado',
                  data: amountByMonthReceiptForMeiChart?.map(
                    item => item.value,
                  ),
                  backgroundColor: '#13B497',
                },
                {
                  label: 'Limite do MEI',
                  data: amountByMonthReceiptForMeiChart?.map(
                    () => config?.meiLimit ?? 0,
                  ),
                  backgroundColor: '#D9B75F',
                },
              ],
            }}
          />
        </div>
        <div className="flex w-full max-w-[800px] flex-col gap-6 rounded-[14px] bg-gray-800 p-8">
          <InputSelect
            options={Array.from({ length: 201 }, (_, i) =>
              (i + 1900).toString(),
            )}
            onChange={e => setSelectedYearForReceiptChart(e.target.value)}
            value={selectedYearForReceiptChart}
            className="max-w-[300px]"
          />
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
        <div className="flex w-full max-w-[800px] flex-col gap-6 rounded-[14px] bg-gray-800 p-8">
          <InputSelect
            options={Array.from({ length: 201 }, (_, i) =>
              (i + 1900).toString(),
            )}
            onChange={e => setSelectedYearForCostChart(e.target.value)}
            value={selectedYearForCostChart}
            className="max-w-[300px]"
          />
          <Line
            options={costsChartOptions}
            data={{
              labels: amountByMonthCost?.map(item => item.month),
              datasets: [
                {
                  label: 'Despesas',
                  data: amountByMonthCost?.map(item => item.value),
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
