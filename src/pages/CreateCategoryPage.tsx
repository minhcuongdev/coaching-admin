import PageTitle from '../components/Typography/PageTitle'
import { Input, HelperText, Label, Button } from '@windmill/react-ui'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link } from 'react-router-dom'
import * as yup from 'yup'
import { useAppDispatch } from 'app/hook'
import { toast } from 'react-toastify'
import { createCategory } from 'features/category/createCategory'

const schema = yup
  .object({
    name: yup.string().required('Tên lĩnh vực không được bỏ trống.'),
  })
  .required()

function CreateCategory() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const dispatch = useAppDispatch()

  async function onSubmit(formData: any) {
    const actionResult = await dispatch(createCategory(formData))
    if (createCategory.fulfilled.match(actionResult)) {
      toast.success('Tạo lĩnh vực thành công')
    } else {
      toast.error(actionResult.payload?.message)
    }
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <PageTitle>Tạo lĩnh vực</PageTitle>
        <div>
          <Link to="/categories">
            <Button>Back</Button>
          </Link>
        </div>
      </div>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Label>
            <span>Tên lĩnh vực</span>
            <Input
              {...register('name')}
              css=""
              className="mt-1"
              placeholder="Tên lĩnh vực"
              type="text"
              valid={errors.name === undefined}
            />
            <HelperText valid={false}>{errors.name?.message}</HelperText>
          </Label>

          <div className="flex justify-center">
            <Button className="mt-6" type="submit">
              Tạo
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}

export default CreateCategory
