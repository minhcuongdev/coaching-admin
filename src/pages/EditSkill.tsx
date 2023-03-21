import PageTitle from '../components/Typography/PageTitle'
import { Input, HelperText, Label, Button } from '@windmill/react-ui'
import { useForm } from 'react-hook-form'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useAppDispatch, useAppSelector } from 'app/hook'
import { fetchSkill } from 'features/skill/fetchSkill'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { selectSkills } from 'features/skill/skillSlice'
import { editSkill } from 'features/skill/editSkill'

const schema = yup
  .object({
    description: yup.string().required('Tên kỹ năng không được để trống'),
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
  const { skills } = useAppSelector(selectSkills)

  let currentSkill = skills.find(
    (skill) => skill.id.toString() === id?.toString()
  )

  setValue('description', currentSkill?.description)

  useEffect(() => {
    dispatch(fetchSkill(Number(id)))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function onSubmit(data: any) {
    const actionResult = await dispatch(editSkill({ id: Number(id), data }))
    if (editSkill.fulfilled.match(actionResult)) {
      toast.success('Skill updated successfully')
      navigate('/skills')
    } else {
      toast.error(actionResult.payload?.message)
    }
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <PageTitle>Update Skill</PageTitle>
        <div>
          <Link to="/skills">
            <Button>Back</Button>
          </Link>
        </div>
      </div>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Label>
            <span>Tên kỹ năng</span>
            <Input
              {...register('description')}
              css=""
              className="mt-1"
              placeholder="Tên kỹ năng"
              type="text"
              valid={errors.description === undefined}
            />
            <HelperText valid={false}>{errors.description?.message}</HelperText>
          </Label>

          <div className="flex justify-center">
            <Button className="mt-6" type="submit">
              Update
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}

export default SkillCreate
