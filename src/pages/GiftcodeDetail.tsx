import { yupResolver } from '@hookform/resolvers/yup'
import { Button, HelperText, Input, Label } from '@windmill/react-ui'
import { useAppDispatch } from 'app/hook'
import { createGiftCode } from 'features/giftcode/createGiftCode'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as yup from 'yup'
import PageTitle from '../components/Typography/PageTitle'

// const containerStyles = {
//   maxWidth: 400,
// }

// const initialState = {
//   value: new Date('2019-10-25 10:44'),
//   locale: { name: 'en-US', label: 'English (US)' },
// }

const schema = yup
  .object({
    type: yup.string().required('Tên kỹ năng không được bỏ trống'),
    validFrom: yup
      .date()
      .default(new Date())
      .required('Ngày bắt đầu không được bỏ trống'),
    validTo: yup
      .date()
      .required('Ngày kết thúc không được bỏ trống')
      .min(yup.ref('validFrom'), 'Ngày kết thúc phải lớn hơn ngày bắt đầu'),
    usageLeft: yup
      .number()
      .min(1)
      .required('Số lượng sử dụng không được bỏ trống'),
    coin: yup.number().required('Số coin không được bỏ trống'),
  })
  .required()

function CreateGiftCode() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const dispatch = useAppDispatch()

  async function onSubmit(data: any) {
    const actionResult = await dispatch(createGiftCode(data))
    if (createGiftCode.fulfilled.match(actionResult)) {
      toast.success('Tạo mã quà thành công')
    } else {
      toast.error('Tạo mã quà thất bại')
    }
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <PageTitle>Tạo mã quà</PageTitle>
        <div>
          <Link to="/giftcodes">
            <Button>Quay lại</Button>
          </Link>
        </div>
      </div>

      <div className="flex justify-center items-center gap-4">
        <div className="px-4 py-3 mb-4 bg-white rounded-lg shadow-md dark:bg-gray-800 w-full">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Label>
              <span>Loại giftcode</span>
              <Input
                {...register('type')}
                placeholder="Loại giftcode"
                css=""
                className="mt-1"
              />
              <HelperText valid={false}>{errors.type?.message}</HelperText>
            </Label>

            <Label>
              <span>Coin</span>
              <Input
                {...register('coin')}
                placeholder="Coin"
                type="text"
                css=""
                className="mt-1"
              />
              <HelperText valid={false}>{errors.coin?.message}</HelperText>
            </Label>

            <Label>
              <span>Lượt sử dụng</span>
              <Input
                {...register('usageLeft')}
                placeholder="Lượt sử dụng"
                type="text"
                css=""
                className="mt-1"
              />
              <HelperText valid={false}>{errors.usageLeft?.message}</HelperText>
            </Label>

            <Label>
              <span>Ngày hiệu lực</span>
              <Input
                {...register('validFrom')}
                placeholder="Ngày hiệu lực"
                css=""
                className="mt-1"
                type="datetime-local"
              />
              <HelperText valid={false}>{errors.validFrom?.message}</HelperText>
            </Label>

            <Label>
              <span>Ngày hết hạn</span>
              <Input
                {...register('validTo')}
                placeholder="Ngày hết hạn"
                css=""
                className="mt-1"
                type="datetime-local"
              />
              <HelperText valid={false}>{errors.validTo?.message}</HelperText>
            </Label>

            <div className="flex justify-center">
              <Button className="mt-6" type="submit">
                Tạo
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default CreateGiftCode
