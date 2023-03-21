import { Input } from '@windmill/react-ui'
import { useAppDispatch, useAppSelector } from 'app/hook'
import Spinner from 'components/Spinner/Spinner'
import { fetchCategories } from 'features/category/fetchCategories'
import { selectCategories } from 'features/category/categorySlice'
import { deleteCategory } from 'features/category/deleteCategory'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PageTitle from '../components/Typography/PageTitle'
import { toast } from 'react-toastify'

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
import { Category } from 'models'
import Modals from 'components/Modals/Modals'

const { EditIcon, SortIcon, TrashIcon } = Icons
function CategoryPage() {
  const [pageTable, setPageTable] = useState(1)
  const [searchName, setSearchName] = useState('')
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  )
  const [isAsc, setIsAsc] = useState(true)
  const dispatch = useAppDispatch()
  const { categories } = useAppSelector(selectCategories)

  useEffect(() => {
    dispatch(fetchCategories())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  let dataTable = categories
  dataTable = dataTable.filter((skill: Category) => {
    return skill.name.toLowerCase().includes(searchName.toLowerCase())
  })

  dataTable.slice().sort((a, b) => {
    if (isAsc) {
      return new Date(a.createAt).getTime() - new Date(b.createAt).getTime()
    } else {
      return new Date(b.createAt).getTime() - new Date(a.createAt).getTime()
    }
  })

  // pagination setup
  const resultsPerPage = 10
  const totalResults = categories.length

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

  function handleDeleteModalOpen(category: Category) {
    setSelectedCategory(category)
    setDeleteModalOpen(true)
  }

  function handleDeleteModalClose() {
    setDeleteModalOpen(false)
  }

  async function handleDeleteCategory() {
    setDeleteModalOpen(false)
    const actionResult = await dispatch(
      deleteCategory(Number(selectedCategory?.id))
    )
    if (deleteCategory.fulfilled.match(actionResult)) {
      toast.success('Xóa lĩnh vực thành công')
    } else {
      toast.error('Lĩnh vực không thể xóa.')
    }
  }

  const deleteModalActions = (
    <>
      <div className="hidden sm:block">
        <Button onClick={handleDeleteModalClose} layout="outline">
          Hủy
        </Button>
      </div>
      <div className="hidden sm:block">
        <Button onClick={handleDeleteCategory}>Đồng ý</Button>
      </div>
      <div className="block w-full sm:hidden">
        <Button
          onClick={handleDeleteModalClose}
          block
          size="large"
          layout="outline"
        >
          Hủy
        </Button>
      </div>
      <div className="block w-full sm:hidden">
        <Button onClick={handleDeleteCategory} block size="large">
          Đồng ý
        </Button>
      </div>
    </>
  )

  return (
    <>
      <div className="flex justify-between">
        <PageTitle>Lĩnh vực</PageTitle>
        <div className="my-6">
          <Link to="/categories/create">
            <Button>
              Tạo lĩnh vực
              <span className="ml-2" aria-hidden="true">
                +
              </span>
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex mb-4">
        <Input
          className="mr-0"
          aria-label="Bad"
          placeholder="Tên lĩnh vực"
          css=""
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
      </div>
      {/* <SectionTitle>Table with actions</SectionTitle> */}
      {categories.length === 0 ? (
        <Spinner />
      ) : (
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>Id</TableCell>
                <TableCell>Tên lĩnh vực</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span>Ngày tạo</span>
                    <button onClick={onSortChange}>
                      <SortIcon className="ml-1" />
                    </button>
                  </div>
                </TableCell>
                <TableCell className="text-center">Thao tác</TableCell>
              </tr>
            </TableHeader>
            <TableBody>
              {dataTable?.map((category: Category, i: number) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <div>
                        <p className="font-semibold">{category.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{category.name}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {new Date(category.createAt).toLocaleDateString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center items-center space-x-2">
                      <Link to={`/categories/${category.id}`}>
                        <Button layout="link" size="small" aria-label="Edit">
                          <EditIcon
                            className="w-5 h-5 text-blue-400"
                            aria-hidden="true"
                          />
                        </Button>
                      </Link>
                      <Button
                        onClick={() => handleDeleteModalOpen(category)}
                        layout="link"
                        size="small"
                        aria-label="Delete"
                      >
                        <TrashIcon
                          className="w-5 h-5 text-red-400"
                          aria-hidden="true"
                        />
                      </Button>
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
      <Modals
        isOpenModal={deleteModalOpen}
        setClose={handleDeleteModalClose}
        header="Chú ý"
        actions={deleteModalActions}
      >
        {`Bạn muốn xóa lĩnh vực ${selectedCategory?.name} ?`}
      </Modals>
    </>
  )
}

export default CategoryPage
