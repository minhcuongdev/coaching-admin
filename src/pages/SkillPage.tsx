import { Input } from '@windmill/react-ui'
import { useAppDispatch, useAppSelector } from 'app/hook'
import Spinner from 'components/Spinner/Spinner'
import { fetchSkills } from 'features/skill/fetchSkills'
import { selectSkills } from 'features/skill/skillSlice'
import { deleteSkill } from 'features/skill/deleteSkill'
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
import { Skill } from 'models'
import Modals from 'components/Modals/Modals'

const { EditIcon, SortIcon, TrashIcon } = Icons
function SkillPage() {
  const [pageTable, setPageTable] = useState(1)
  const [searchName, setSearchName] = useState('')
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedSkill, setSelecctedSkill] = useState<Skill | null>(null)
  const [isAsc, setIsAsc] = useState(true)
  const dispatch = useAppDispatch()
  const { skills } = useAppSelector(selectSkills)

  useEffect(() => {
    dispatch(fetchSkills())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  let dataTable = skills
  dataTable = dataTable.filter((skill: Skill) => {
    return skill.description.toLowerCase().includes(searchName.toLowerCase())
  })

  dataTable.slice().sort((a, b) => {
    if (isAsc) {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    } else {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
  })

  // pagination setup
  const resultsPerPage = 10
  const totalResults = skills.length

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

  function handleDeleteModalOpen(skill: Skill) {
    setSelecctedSkill(skill)
    setDeleteModalOpen(true)
  }

  function handleDeleteModalClose() {
    setDeleteModalOpen(false)
  }

  async function handleDeleteSkill() {
    console.log('delete')
    const actionResult = await dispatch(deleteSkill(Number(selectedSkill?.id)))
    if (deleteSkill.fulfilled.match(actionResult)) {
      toast.success('Xóa kỹ năng thành công')
      setDeleteModalOpen(false)
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
        <Button onClick={handleDeleteSkill}>Đồng ý</Button>
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
        <Button onClick={handleDeleteSkill} block size="large">
          Đồng ý
        </Button>
      </div>
    </>
  )

  return (
    <>
      <div className="flex justify-between">
        <PageTitle>Kỹ năng</PageTitle>
        <div className="my-6">
          <Link to="/skills/create">
            <Button>
              Tạo kỹ năng
              <span className="ml-2" aria-hidden="true">
                +
              </span>
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex mb-4">
        <Input
          className=""
          aria-label="Bad"
          placeholder="Tên kỹ năng"
          css=""
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
      </div>
      {/* <SectionTitle>Table with actions</SectionTitle> */}
      {skills.length === 0 ? (
        <Spinner />
      ) : (
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>Id</TableCell>
                <TableCell>Tên kỹ năng</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span>Ngày tạo</span>
                    <button onClick={onSortChange}>
                      <SortIcon className="ml-1" />
                    </button>
                  </div>
                </TableCell>
                <TableCell className="text-center">Hành Động</TableCell>
              </tr>
            </TableHeader>
            <TableBody>
              {dataTable?.map((skill: Skill, i: number) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <div>
                        <p className="font-semibold">{skill.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{skill.description}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {new Date(skill.createdAt).toLocaleDateString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-center items-center space-x-2">
                      <Link to={`/skills/${skill.id}`}>
                        <Button layout="link" size="small" aria-label="Edit">
                          <EditIcon
                            className="w-5 h-5 text-blue-400"
                            aria-hidden="true"
                          />
                        </Button>
                      </Link>
                      <Button
                        onClick={() => handleDeleteModalOpen(skill)}
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
        {`Bạn muốn xóa kỹ năng ${selectedSkill?.description} ?`}
      </Modals>
    </>
  )
}

export default SkillPage
