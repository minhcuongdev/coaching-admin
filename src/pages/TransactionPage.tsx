import { Badge, Input } from '@windmill/react-ui'
import { useAppDispatch, useAppSelector } from 'app/hook'
import DefaultAvatar from 'assets/img/unnamed.png'
import Spinner from 'components/Spinner/Spinner'
import { fetchAllTransactions } from 'features/transaction/fetchAllTransactions'
import { selectTransactions } from 'features/transaction/transactionSlice'
import { useEffect, useState } from 'react'
import PageTitle from '../components/Typography/PageTitle'

import {
  Avatar,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
  TableRow,
} from '@windmill/react-ui'
import { Transaction } from 'models'

// const { SortIcon } = Icons
function TransactionPage() {
  const [pageTable, setPageTable] = useState(1)
  const [searchName, setSearchName] = useState('')
  // const [isAsc, setIsAsc] = useState(true)
  const dispatch = useAppDispatch()
  const { transactions } = useAppSelector(selectTransactions)

  useEffect(() => {
    dispatch(fetchAllTransactions())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  let dataTable = transactions
  dataTable = dataTable.filter((transaction: Transaction) => {
    return transaction?.relatedId
      ?.toLowerCase()
      .includes(searchName.toLowerCase())
  })

  dataTable.slice().sort((a: Transaction, b: Transaction) => {
    return new Date(a.createAt).getTime() - new Date(b.createAt).getTime()
  })

  // pagination setup
  const resultsPerPage = 10
  const totalResults = transactions.length

  dataTable = dataTable.slice(
    (pageTable - 1) * resultsPerPage,
    pageTable * resultsPerPage
  )

  // pagination change control
  function onPageChangeTable2(p: any) {
    setPageTable(p)
  }

  function getTransactionStatus(transaction: Transaction) {
    switch (transaction.status) {
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
        <PageTitle>Giao dịch</PageTitle>
      </div>
      <div className="flex mb-4">
        <Input
          className=""
          aria-label="Bad"
          placeholder="Mã giao dịch"
          css=""
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
      </div>
      {/* <SectionTitle>Table with actions</SectionTitle> */}
      {transactions.length === 0 ? (
        <Spinner />
      ) : (
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>Tên người dùng</TableCell>
                <TableCell>Mã giao dịch</TableCell>
                <TableCell>Ngày giao dịch</TableCell>
                <TableCell>Loại giao dịch</TableCell>
                <TableCell>Ghi chú</TableCell>
                <TableCell>Số lượng coin</TableCell>
                <TableCell>Trạng thái</TableCell>
              </tr>
            </TableHeader>
            <TableBody>
              {dataTable?.map((transaction: Transaction, i: number) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <Avatar
                        className="hidden mr-3 md:block"
                        src={transaction.user.avatar || DefaultAvatar}
                        alt="User avatar"
                      />
                      <div>
                        <p className="font-semibold">{transaction.user.name}</p>
                        {/* <p className="text-xs text-gray-600 dark:text-gray-400">
                          Mentor
                        </p> */}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{transaction?.relatedId}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {new Date(transaction.createAt).toLocaleString('vi')}
                    </span>
                  </TableCell>

                  <TableCell>
                    <span className="text-sm">{transaction.type}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{transaction.message}</span>
                  </TableCell>
                  <TableCell>
                    {/* <span className="text-sm">
                      {transaction.amount.toLocaleString('it-IT', {
                        style: 'currency',
                        currency: 'VND',
                      })}
                    </span> */}
                    <span className="text-sm">{transaction.amount}</span>
                  </TableCell>
                  <TableCell>
                    <Badge type={getTransactionStatus(transaction)}>
                      {transaction.status}
                    </Badge>
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
    </>
  )
}

export default TransactionPage
