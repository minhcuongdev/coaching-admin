import { Card, CardBody } from '@windmill/react-ui'
import { useAppDispatch, useAppSelector } from 'app/hook'
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import InfoCard from 'components/Cards/InforCard'
import RoundIcon from 'components/RoundIcon'
import { fetchStatistic } from 'features/statistic/fetchStatistic'
import { selectStatistic } from 'features/statistic/statisticSlice'
import { useEffect } from 'react'
import { Bar, Line, Pie } from 'react-chartjs-2'
import PageTitle from '../components/Typography/PageTitle'
import { Icons } from 'icons'
import Spinner from 'components/Spinner/Spinner'
import { fetchProfit } from 'features/statistic/fetchProfit'
import { fetchNumberOfSessions } from 'features/statistic/fetchNumberOfSessions'
import { fetchNumberOfDoneSessions } from 'features/statistic/fetchNumberOfDoneSessions'
import { fetchNewUsers } from 'features/statistic/fetchNewUsers'
const { PeopleIcon, MoneyIcon, CartIcon } = Icons

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

function Dashboard() {
  const dispatch = useAppDispatch()
  const { statistic, profit, sessions, newUsers, doneSessions } =
    useAppSelector(selectStatistic)

  useEffect(() => {
    dispatch(fetchStatistic())
    dispatch(fetchProfit())
    dispatch(fetchNumberOfSessions())
    dispatch(fetchNewUsers())
    dispatch(fetchNumberOfDoneSessions())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!statistic) {
    return (
      <div className="mt-4">
        <Spinner />
      </div>
    )
  }

  let profitMonth = profit
    ? profit.map((item: any) => item.month).reverse()
    : []

  let profitData = profit
    ? profit
        .map((item: any) => {
          return item.profit
        })
        .reverse()
    : []

  let sessionsData = sessions
    ? sessions.map((item: any) => {
        return item.value
      })
    : []

  let newUserMonth = newUsers
    ? newUsers.mentee
        .map((item: any) => {
          return item.month
        })
        .reverse()
    : []

  let menteeData = newUsers
    ? newUsers.mentee.map((item: any) => item.newUser).reverse()
    : []

  let mentorData = newUsers
    ? newUsers.mentor
        .map((item: any) => {
          return item.newUser
        })
        .reverse()
    : []

  let doneSessionsMonth = doneSessions
    ? doneSessions
        .map((item: any) => {
          return item.month
        })
        .reverse()
    : []

  let doneSessionsData = doneSessions
    ? doneSessions
        .map((item: any) => {
          return item.doneSession
        })
        .reverse()
    : []

  return (
    <>
      <PageTitle>Tổng quan</PageTitle>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Số lượng mentee" value={statistic.mentee}>
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Số lượng mentor" value={statistic.mentor}>
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard
          title="Doanh thu"
          value={statistic.profit.toLocaleString('it-IT', {
            style: 'currency',
            currency: 'VND',
          })}
        >
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Lượt đặt lịch" value={statistic.register}>
          <RoundIcon
            icon={CartIcon}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass="bg-teal-100 dark:bg-teal-500"
            className="mr-4"
          />
        </InfoCard>
      </div>
      <PageTitle>Thống kê</PageTitle>
      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <Card>
          <CardBody>
            <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">
              Doanh thu trong các tháng
            </p>
            <Bar
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                  title: {
                    display: false,
                  },
                },
              }}
              data={{
                labels: profitMonth,
                datasets: [
                  {
                    label: 'Doanh thu',
                    data: profitData,
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                  },
                ],
              }}
            />
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">
              Số session hoàn thành trong các tháng
            </p>
            <Bar
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                  title: {
                    display: false,
                  },
                },
              }}
              data={{
                labels: doneSessionsMonth,
                datasets: [
                  {
                    label: 'Lượt đặt lịch',
                    data: doneSessionsData,
                    backgroundColor: 'rgb(53, 162, 235, 0.6)',
                  },
                ],
              }}
            />
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">
              Trạng thái đặt lịch
            </p>
            <div className="w-3/4 m-auto flex">
              <Pie
                data={{
                  labels: [
                    'Chờ xác nhận',
                    'Đã xác nhận',
                    'Đã hoàn thành',
                    'Đã hủy',
                  ],

                  datasets: [
                    {
                      label: '# of Votes',
                      data: sessionsData,
                      backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 50, 192, 0.2)',
                      ],
                      borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 50, 192, 1)',
                      ],
                      borderWidth: 1,
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: {
                      align: 'center',
                      position: 'bottom',
                    },
                  },
                }}
                width="80%"
              />
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <p className="mb-4 font-semibold text-gray-600 dark:text-gray-300">
              Số lượng Mentor và Mentee mới theo tháng
            </p>
            <Line
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top' as const,
                  },
                  title: {
                    display: false,
                    text: 'Chart.js Line Chart',
                  },
                },
              }}
              data={{
                labels: newUserMonth,
                datasets: [
                  {
                    label: 'Mentees',
                    data: menteeData,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                  },
                  {
                    label: 'Mentors',
                    data: mentorData,
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
                  },
                ],
              }}
            />
          </CardBody>
        </Card>
      </div>
    </>
  )
}

export default Dashboard
