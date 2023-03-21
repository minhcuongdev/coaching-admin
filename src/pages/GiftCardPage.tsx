import { useAppDispatch, useAppSelector } from 'app/hook'
import Spinner from 'components/Spinner/Spinner'
import { fetchAllGiftCode } from 'features/giftcode/fetchAllGiftCode'
import { selectGiftCodes } from 'features/giftcode/giftCodeSlice'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
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
import { GiftCode } from 'models'

const { EditIcon } = Icons
function GiftCardPage() {
  const [pageTable, setPageTable] = useState(1)
  // const [searchName, setSearchName] = useState('')
  // const [searchEmail, setSearchEmail] = useState('')
  // const [isAsc, setIsAsc] = useState(true)
  const dispatch = useAppDispatch()
  const { giftCodes, status } = useAppSelector(selectGiftCodes)

  useEffect(() => {
    dispatch(fetchAllGiftCode())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  let dataTable = giftCodes
  // dataTable = dataTable.filter((admin: Admin) => {
  //   return (
  //     admin.name.toLowerCase().includes(searchName.toLowerCase()) &&
  //     admin.email.toLowerCase().includes(searchEmail.toLowerCase())
  //   )
  // })

  dataTable = dataTable.slice().sort((a: any, b: any) => {
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  })

  // pagination setup
  const resultsPerPage = 10
  const totalResults = giftCodes.length

  dataTable = dataTable.slice(
    (pageTable - 1) * resultsPerPage,
    pageTable * resultsPerPage
  )

  // pagination change control
  function onPageChangeTable2(p: any) {
    setPageTable(p)
  }

  // function onSortChange() {
  //   setIsAsc(!isAsc)
  // }

  return (
    <>
      <div className="flex justify-between">
        <PageTitle>Quản lý mã quà tặng</PageTitle>
        <div className="my-6">
          <Link to="/giftcodes/create">
            <Button>
              Tạo mã quà tặng
              <span className="ml-2" aria-hidden="true">
                +
              </span>
            </Button>
          </Link>
        </div>
      </div>
      {/* <div className="flex mb-4">
        <Input
          className="mr-4"
          aria-label="Bad"
          placeholder="Họ tên"
          css=""
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <Input
          aria-label="Bad"
          placeholder="Email"
          css=""
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
        />
      </div> */}
      {/* <SectionTitle>Table with actions</SectionTitle> */}
      {status === 'pending' ? (
        <Spinner />
      ) : giftCodes.length > 0 ? (
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>Mã quà tặng</TableCell>
                {/* <TableCell>Loại</TableCell> */}
                <TableCell>Hiệu lực từ</TableCell>
                <TableCell>Hiệu lực đến</TableCell>
                <TableCell>Lượt sử dụng còn lại</TableCell>
                <TableCell>Số xu</TableCell>
              </tr>
            </TableHeader>
            <TableBody>
              {dataTable?.map((giftcode: GiftCode, i: number) => (
                <TableRow key={i}>
                  <TableCell>
                    <span className="text-sm">{giftcode.code}</span>
                  </TableCell>
                  {/* <TableCell>
                    <span className="text-sm">{giftcode.type}</span>
                  </TableCell> */}
                  <TableCell>
                    <span className="text-sm">
                      {new Date(giftcode.validFrom).toLocaleDateString('vi')}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {new Date(giftcode.validTo).toLocaleDateString('vi')}
                    </span>
                  </TableCell>

                  <TableCell>
                    <span className="text-sm">{giftcode.usageLeft}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{giftcode.coin}</span>
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
      ) : (
        <div className="flex justify-center items-center">
          <div className="text-center">
            <h3>Không có dữ liệu</h3>
          </div>
        </div>
      )}
    </>
  )
}

export default GiftCardPage
