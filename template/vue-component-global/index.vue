<!--
 * @Author: {{ author }}
 * @Date: {{ date }}
 * @Description: {{ name }}
-->
<template>
    <div class="{{ name }}" @click="handleClick">
        {{ name }}
    </div>
</template>

<script lang="ts" setup>
defineOptions({
    name: '{{ name }}'
})

interface IProps {
    id?: string
}

const model = defineModel()

const props = withDefaults(defineProps<IProps>(), {
    id: ''
})

const emits = defineEmits({
    'click': (e: MouseEvent) => void
})

const title = ref<string>('')
const handleClick = (event: MouseEvent) => {
    emits('click', event)
}

</script>

<style lang="scss">
@import './style/index';
</style>
