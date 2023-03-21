import { Badge, Input } from '@windmill/react-ui'
import { useAppDispatch, useAppSelector } from 'app/hook'
import Spinner from 'components/Spinner/Spinner'
import { fetchOrders } from 'features/order/fetchOrders'
import { selectOrders } from 'features/order/orderSlice'
import { processOrder } from 'features/order/processOrder'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import PageTitle from '../components/Typography/PageTitle'

import {
  Button,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
  TableRow,
} from '@windmill/react-ui'
import { Icons } from 'icons'
import { OrderTransaction } from 'models'

const { SortIcon } = Icons
function OrderPage() {
  const [pageTable, setPageTable] = useState(1)
  const [searchName, setSearchName] = useState('')
  // const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  // const [selectedSkill, setSelecctedSkill] = useState<Skill | null>(null)
  const [isAsc, setIsAsc] = useState(true)
  const dispatch = useAppDispatch()
  const { orders } = useAppSelector(selectOrders)

  useEffect(() => {
    dispatch(fetchOrders())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  let dataTable = orders
  dataTable = dataTable.filter((order: OrderTransaction) => {
    return order.email.toLowerCase().includes(searchName.toLowerCase())
  })

  dataTable.slice().sort((a: OrderTransaction, b: OrderTransaction) => {
    if (isAsc) {
      return new Date(a.createAt).getTime() - new Date(b.createAt).getTime()
    } else {
      return new Date(b.createAt).getTime() - new Date(a.createAt).getTime()
    }
  })

  // pagination setup
  const resultsPerPage = 10
  const totalResults = orders.length

  dataTable = dataTable.slice(
    (pageTable - 1) * resultsPerPage,
    pageTable * resultsPerPage
  )

  // pagination change control
  function onPageChangeTable2(p: any) {
    setPageTable(p)
  }

  function onSortChange() {
    setIsAsc(!isAsc)
  }

  // function handleDeleteModalOpen(skill: Skill) {
  //   setSelecctedSkill(skill)
  //   setDeleteModalOpen(true)
  // }

  // function handleDeleteModalClose() {
  //   setDeleteModalOpen(false)
  // }

  async function handleProcessOrder(order: OrderTransaction) {
    try {
      const actionResult = await dispatch(
        processOrder({
          orderId: order.orderId,
          isWithdraw: order.orderType === 'Withdraw',
        })
      )
      if (processOrder.fulfilled.match(actionResult)) {
        toast.success('Xử lý giao dịch thành công!')
      }
    } catch (error) {
      toast.error('Xử lý giao dịch lỗi!')
    }
  }

  // const deleteModalActions = (
  //   <>
  //     <div className="hidden sm:block">
  //       <Button onClick={handleDeleteModalClose} layout="outline">
  //         Hủy
  //       </Button>
  //     </div>
  //     <div className="hidden sm:block">
  //       <Button onClick={handleDeleteSkill}>Đồng ý</Button>
  //     </div>
  //     <div className="block w-full sm:hidden">
  //       <Button
  //         onClick={handleDeleteModalClose}
  //         block
  //         size="large"
  //         layout="outline"
  //       >
  //         Hủy
  //       </Button>
  //     </div>
  //     <div className="block w-full sm:hidden">
  //       <Button onClick={handleDeleteSkill} block size="large">
  //         Đồng ý
  //       </Button>
  //     </div>
  //   </>
  // )

  function orderStatus(status: string) {
    switch (status) {
      case 'PENDING':
        return 'neutral'
      case 'HOLD':
        return 'warning'
      case 'SUCCESS':
        return 'success'
      case 'FAILED':
        return 'danger'
    }
  }

  return (
    <>
      <div className="flex justify-between">
        <PageTitle>Yêu cầu giao dịch</PageTitle>
      </div>
      <div className="flex mb-4">
        <Input
          className=""
          aria-label="Bad"
          placeholder="Email"
          css=""
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
      </div>
      {/* <SectionTitle>Table with actions</SectionTitle> */}
      {orders.length === 0 ? (
        <Spinner />
      ) : (
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>Mã yêu cầu giao dịch</TableCell>
                <TableCell>Tên</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Loại</TableCell>
                <TableCell>Phương thức</TableCell>
                <TableCell>Trạng thái</TableCell>
                <TableCell>Token</TableCell>
                <TableCell>Số tiền</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span>Ngày tạo</span>
                    <button onClick={onSortChange}>
                      <SortIcon className="ml-1" />
                    </button>
                  </div>
                </TableCell>
                <TableCell className="text-center">Hành động</TableCell>
              </tr>
            </TableHeader>
            <TableBody>
              {dataTable?.map((order: OrderTransaction, i: number) => (
                <TableRow key={i}>
                  <TableCell>
                    <span className="text-sm">{order.orderId}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <div>
                        <p className="font-semibold">{order.name}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{order.email}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{order.orderType}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{order.paymentMethod}</span>
                  </TableCell>
                  <TableCell>
                    <Badge type={orderStatus(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{order.token}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {order.total.toLocaleString('it-IT', {
                        style: 'currency',
                        currency: 'VND',
                      })}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {new Date(order.createAt).toLocaleDateString('vi')}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center items-center space-x-2">
                      {order.status === 'PENDING' && (
                        <Button onClick={() => handleProcessOrder(order)}>
                          Duyệt
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TableFooter>
            <Pagination
              totalResults={totalResults}
              resultsPerPage={resultsPerPage}
              onChange={onPageChangeTable2}
              label="Table navigation"
            />
          </TableFooter>
        </TableContainer>
      )}
      {/* <Modals
        isOpenModal={deleteModalOpen}
        setClose={handleDeleteModalClose}
        header="Chú ý"
        actions={deleteModalActions}
      >
        {`Bạn muốn xóa kỹ năng ${selectedSkill?.description} ?`}
      </Modals> */}
    </>
  )
}

export default OrderPage
