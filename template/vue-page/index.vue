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


const title = ref<string>('')
const handleClick = (event: MouseEvent) => {
}

</script>

<style lang="scss">
.{{ name }} {

}
</style>
