import { useMany, getDefaultFilter } from "@refinedev/core";
import {
  useTable,
  EditButton,
  ShowButton,
  getDefaultSortOrder,
  FilterDropdown,
  useSelect,
} from "@refinedev/antd";

import { Table, Space, Input, Select } from "antd";

export const ListProducts = () => {
  const { tableProps,sorters,filters } = useTable({
    sorters: { initial: [{ field: "id", order: "asc" }] },
    filters: {
      initial: [{ field: "category.id", operator: "eq", value: 2 }],
    },
    syncWithLocation: true,
  });

  const { selectProps } = useSelect({
    resource: "categories",
    defaultValue: getDefaultFilter("category.id", filters, "eq"),
  });

  const { data: categories, isLoading } = useMany({
    resource: "categories",
    ids: tableProps?.dataSource?.map((product) => product.category?.id) ?? [],
  });

  return (
    <div>
      <h1>Products</h1>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID"  sorter
          defaultSortOrder={getDefaultSortOrder("id", sorters)} />
        <Table.Column dataIndex="name" title="Name"  sorter
          defaultSortOrder={getDefaultSortOrder("name", sorters)} />
        <Table.Column
          dataIndex={["category", "id"]}
          title="Category"
          render={(value) => {
            if (isLoading) {
              return "Loading...";
            }

            return categories?.data?.find((category) => category.id == value)
              ?.title;
          }}
        />
        <Table.Column dataIndex="material" title="Material" />
        <Table.Column dataIndex="price" title="Price" />
        <Table.Column
          title="Actions"
          render={(_, record) => (
            <Space>
              <ShowButton hideText size="small" recordItemId={record.id} />
              <EditButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </div>
  );
};