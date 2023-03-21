import PageTitle from '../components/Typography/PageTitle'
import { Input, HelperText, Label, Button } from '@windmill/react-ui'
import { useForm } from 'react-hook-form'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useAppDispatch, useAppSelector } from 'app/hook'
import { fetchCategoryById } from 'features/category/fetchCategoryById'
import { updateCategory } from 'features/category/updateCategory'
import { selectCategories } from 'features/category/categorySlice'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

const schema = yup
  .object({
    name: yup.string().required('Name is required'),
  })
  .required()

function SkillCreate() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  })

  let { id } = useParams()
  let navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { categories } = useAppSelector(selectCategories)

  let currentCategory = categories.find(
    (category) => category.id.toString() === id?.toString()
  )

  setValue('name', currentCategory?.name)

  useEffect(() => {
    dispatch(fetchCategoryById(Number(id)))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function onSubmit(formData: any) {
    const actionResult = await dispatch(
      updateCategory({ categoryId: Number(id), formData })
    )
    if (updateCategory.fulfilled.match(actionResult)) {
      toast.success('Cập nhật danh mục thành công')
      navigate('/categories')
    } else {
      toast.error(actionResult.payload?.message)
    }
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <PageTitle>Cập nhật danh mục</PageTitle>
        <div>
          <Link to="/categories">
            <Button>Back</Button>
          </Link>
        </div>
      </div>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Label>
            <span>Tên danh mục</span>
            <Input
              {...register('name')}
              css=""
              className="mt-1"
              placeholder="Tên danh mục"
              type="text"
              valid={errors.name === undefined}
            />
            <HelperText valid={false}>{errors.name?.message}</HelperText>
          </Label>

          <div className="flex justify-center">
            <Button className="mt-6" type="submit">
              Cập nhật
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}

export default SkillCreate
