import { BaseRecord, useMany } from '@refinedev/core'
import {
  List as RefineList,
  useTable,
  EditButton,
  ShowButton,
  MarkdownField,
  DateField,
  DeleteButton,
  FilterDropdown,
  useSelect
} from '@refinedev/antd'
import { Table, Space, Select } from 'antd'

const List = () => {
  const { tableProps } = useTable({
    syncWithLocation: true
  })

  const { data: categoryData, isLoading: categoryIsLoading } = useMany({
    resource: 'categories',
    ids: tableProps?.dataSource?.map(item => item?.category?.id) ?? [],
    queryOptions: {
      enabled: !!tableProps?.dataSource
    }
  })

  const { selectProps: categorySelectProps } = useSelect({
    resource: 'categories'
  })

  return (
    <RefineList>
      <Table {...tableProps} rowKey='id'>
        <Table.Column dataIndex='id' title='Id' sorter />
        <Table.Column dataIndex='title' title='Title' />
        <Table.Column
          dataIndex='content'
          title='Content'
          render={value => <MarkdownField value={value.slice(0, 80) + '...'} />}
        />
        <Table.Column
          dataIndex={['category', 'id']}
          title='Category'
          render={value =>
            categoryIsLoading ? (
              <>Loading...</>
            ) : (
              categoryData?.data?.find(item => item.id === value)?.title
            )
          }
          filterDropdown={props => (
            <FilterDropdown {...props}>
              <Select
                style={{ minWidth: 200 }}
                mode='multiple'
                placeholder='Select Category'
                {...categorySelectProps}
              />
            </FilterDropdown>
          )}
        />
        <Table.Column dataIndex='status' title='Status' />
        <Table.Column
          dataIndex={['createdAt']}
          title='Created At'
          render={value => <DateField value={value} />}
        />
        <Table.Column
          title='Actions'
          dataIndex='actions'
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size='small' recordItemId={record.id} />
              <ShowButton hideText size='small' recordItemId={record.id} />
              <DeleteButton hideText size='small' recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </RefineList>
  )
}

export default List
