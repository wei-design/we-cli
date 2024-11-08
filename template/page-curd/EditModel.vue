<!--
 * @Author: {{ author }}
 * @Date: {{ date }}
 * @Description: {{ name }}Edit
-->
<script setup lang="ts">
defineOptions({
    name: '{{ name }}Edit'
})
import {
  postCreate,
  getDetail,
  type IFormItem,
  postUpdate
} from '@/services/users'
import { message } from 'ant-design-vue'

const emits = defineEmits<{
  success: [],
  cancel: []
}>()

const formDetail: any = defineModel<IFormItem>()

const formRef = ref<any>()
let loading = ref<boolean>(false)

const handleConfirm = async () => {
  formRef.value.validate().then(async () => {
    try {
      const request = formDetail.value.id ? postUpdate : postCreate
      loading.value = true
      const {
        data: { code, message: msg }
      } = await request(formDetail.value)
      loading.value = false
      if (code === 0) {
        message.success('保存成功！')
        emits('success')
      } else {
        message.error(msg)
      }
    } catch (e) {
      loading.value = false
    }
  })
}

const getDetail = async (id: number) => {
  try {
    const {
      data: { code, message: msg, data }
    } = await getDetail({
      id
    })
    if (code === 0) {
      formDetail.value = {
        ...formDetail.value,
        ...data
      }
    } else {
      message.error(msg)
    }
  } catch (e) {
    console.log(e)
  }
}

defineExpose({
  getDetail
})
</script>

<template>
  <a-modal
    v-bind="$attrs"
    width="600px"
    ok-text="保存"
    @ok="handleConfirm"
    :confirm-loading="loading"
    centered
  >
    <template #title>
      <div class="title" v-if="formDetail.id">
        编辑
      </div>
      <div class="title">
        添加
      </div>
    </template>
    <div class="content">
      <a-form :model="formDetail" ref="formRef" :label-col="{ span: 5 }" size="large">
        <a-form-item name="account" label="ID" required>
          <a-input
            v-model:value="formDetail.account"
            :maxlength="20"
            allow-clear
            placeholder="请输入"
            :disabled="!!formDetail.id"
          ></a-input>
        </a-form-item>
        <a-form-item name="name" label="名称" required>
          <a-input
            v-model:value="formDetail.name"
            :maxlength="20"
            allow-clear
            placeholder="请输入"
          ></a-input>
        </a-form-item>
        <a-form-item name="description" label="描述" required>
          <a-textarea
            v-model:value="formDetail.description"
            placeholder="请输入"
            :auto-size="{ minRows: 3, maxRows: 3 }"
          />
        </a-form-item>
      </a-form>
    </div>
  </a-modal>
</template>

<style lang="scss">
.{{ name }}Edit {

}
</style>
