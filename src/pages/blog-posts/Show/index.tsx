import { useShow, useOne } from '@refinedev/core'
import {
  Show as RefineShow,
  NumberField,
  TextField,
  MarkdownField,
  DateField
} from '@refinedev/antd'
import { Typography } from 'antd'

const { Title } = Typography

const Show = () => {
  const { queryResult } = useShow()
  const { data, isLoading } = queryResult

  const record = data?.data

  const { data: categoryData, isLoading: categoryIsLoading } = useOne({
    resource: 'categories',
    id: record?.category?.id || '',
    queryOptions: {
      enabled: !!record
    }
  })

  return (
    <RefineShow isLoading={isLoading}>
      <Title level={5}>Id</Title>
      <NumberField value={record?.id ?? ''} />
      <Title level={5}>Title</Title>
      <TextField value={record?.title} />
      <Title level={5}>Content</Title>
      <MarkdownField value={record?.content} />
      <Title level={5}>Category</Title>
      {categoryIsLoading ? <>Loading...</> : <>{categoryData?.data?.title}</>}
      <Title level={5}>Status</Title>
      <TextField value={record?.status} />
      <Title level={5}>Created At</Title>
      <DateField value={record?.createdAt} />
    </RefineShow>
  )
}

export default Show
