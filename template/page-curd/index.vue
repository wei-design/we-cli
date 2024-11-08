<!--
 * @Author: {{ author }}
 * @Date: {{ date }}
 * @Description: {{ name }}Edit
-->
<script setup lang="ts">
defineOptions({
    name: '{{ name }}List'
})
import { ref, createVNode } from 'vue'
import PageView from '@/views/layout/PageView.vue'
import { message, Modal } from 'ant-design-vue'
import { postDelete, getlList, type IFormItem } from '@/services/openapi'
import { useBreadcrumbStore } from '@/stores'
import { usePagination } from '@/hooks'
import EditModal from './EditModal.vue'
import dayjs from 'dayjs'

const { pagination } = usePagination()
const store = useBreadcrumbStore()
store.breadcrumbs = [
  {
    name: '系统'
  },
  {
    name: '列表'
  }
]
const columns = [
  {
    title: 'ID',
    align: 'center',
    dataIndex: 'id'
  },
  {
    title: '名称',
    align: 'center',
    dataIndex: 'name'
  },
    {
      title: '创建时间',
      dataIndex: 'ctime',
      align: 'center',
      customRender({ record }: any) {
        if (record.ctime) {
          return dayjs(record.ctime * 1000).format('YYYY-MM-DD HH:mm:ss')
        }
        return '-'
      }
    },
  {
    title: '操作',
    align: 'center',
    key: 'action'
  }
]

const initForm = {
  id: 0, // 可选
  name: '', // 可选
  description: '', // 可选
}
const formDetailRef = ref<HTMLElement | any>()
const formDetail = ref<IFormItem>({
  ...initForm
})
const dataSource = ref<IFormItem[]>([])
const visible = ref(false)
// 获取用户列表
const reqGetList = async () => {
  try {
    const params = {
      page: pagination.current,
      per_page: pagination.size
    }
    const {
      data: { code, message: msg, data }
    } = await getlList(params)
    if (code === 0) {
      dataSource.value = data.items ?? []
      pagination.total = data.total
    } else {
      message.error(msg)
    }
  } catch (e) {
    console.log(e)
  }
}
reqGetList()

// 查询
const handleSearch = () => {
  pagination.current = 1
  reqGetList()
}
// 重置
const handleReset = () => {
  pagination.current = 1
  reqGetList()
}
//分页
const onChangePagination = () => {
  reqGetList()
}

const handleAdd = () => {
  visible.value = true
  formDetail.value = {
    ...initForm
  }
}

/**
 * 编辑
 */
const handleEdit = async (record: IFormItem) => {
  try {
    visible.value = true
    formDetail.value = {
      ...record
    }
    nextTick(() => {
      formDetailRef.value?.getDetail(record.id)
    })
  } catch (e) {
    console.log(e)
  }
}

const handleRemove = (id: number) => {
  Modal.confirm({
    title: `确认删除 ${id}`,
    content: createVNode(
      'div',
      { style: 'color:#757B81;' },
      '删除后将无法恢复，请谨慎操作！'
    ),
    async onOk() {
      try {
        const {
          data: { code, message: msg }
        } = await postDelete({
          id
        })
        if (code === 0) {
          message.success('已删除！')
          await reqGetList()
        } else {
          message.error(msg)
        }
      } catch (e) {
        console.log(e)
      }
    },
    onCancel() {
      console.log('Cancel')
    },
    okText: '删除'
  })
}

/**
 * 确认更新角色
 */
const handleUpdateSuccess = async () => {
  visible.value = false
  await reqGetList()
}
</script>

<template>
  <PageView
    title="管理"
    :pagination="pagination"
    v-model="pagination.current"
    @change-pagination="onChangePagination"
  >
    <template #title>
      <div>管理</div>
    </template>
    <template #search>
      <div class="search">
        <a-button type="primary" size="large" class="add-button" @click="handleAdd">
          <template #icon>
            <iconpark-icon name="tianjia" class="icon-button"></iconpark-icon>
          </template>
          添加
        </a-button>
      </div>
    </template>
    <template #content>
      <a-table :columns="columns" :data-source="dataSource" :pagination="false" :sticky="true">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <div class="button-group">
              <a-button
                size="small"
                @click="handleEdit(record)"
                :disabled="record.default"
              >
                编辑
              </a-button>
              <a-button
                size="small"
                danger
                @click="handleRemove(record.id)"
                v-if="!record.default"
              >
                删除
              </a-button>
            </div>
          </template>
        </template>
      </a-table>
    </template>
  </PageView>
  <template v-if="visible">
    <EditModal
      ref="formDetailRef"
      v-model:open="visible"
      v-model="formDetail"
      @success="handleUpdateSuccess"
    />
  </template>
</template>

<style lang="scss">
.{{ name }}List {

}
</style>