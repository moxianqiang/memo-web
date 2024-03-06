<template>
  <div class="todo-wrapper">
    <el-input
      v-model="todo_input"
      style="width: 500px"
      placeholder="新增代办事项"
      @keyup.enter="add_todo"
    >
      <template #append>
        <span @click="add_todo" class="submit-button">提交</span>
      </template>
    </el-input>

    <el-divider />

    <div style="margin-bottom: 16px; color: #409eff">
      共{{ list.length }}个任务，已完成{{ list.filter(v => v['is_done']).length }}个
    </div>

    <div @dblclick="on_dblclick(v['id'])" class="item" v-for="(v, i) in list" :key="v.id">
      <div v-if="active_item_id === v['id']">
        <el-input
          v-model="v['content']"
          style="width: 500px; margin-top: 9px;"
          @keyup.enter="update_todo(v, true)"
        />
        <span style="position: absolute; right: 14px; top: 9px">
          <el-button plain size="small" @click="update_todo(v, true)">√</el-button>
        </span>
      </div>
      <div v-else>
        <span class="check-button">
          <el-checkbox v-model="v['is_done']" size="large" @change="update_todo(v)" />
        </span>
        <div :class="v['is_done'] ? 'line-through' : ''">{{ v['content'] }}</div>
        <div class="create-time">
          {{
            new Date(v['create_time'].slice(0, v['create_time'].length - 3)).toLocaleDateString()
          }}
          {{
            new Date(v['create_time'].slice(0, v['create_time'].length - 3)).toLocaleTimeString()
          }}
        </div>
        <span class="delete-button">
          <el-button type="danger" plain size="small" @click="del_todo(v['id'])">删除</el-button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { todo_list, todo_add, todo_update, todo_delete } from '@/apis/todo'
import { onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'

export default {
  name: 'Index',
  setup() {
    const todo_input = ref('')

    const list = ref([])

    const get_todo_list = () => {
      todo_list().then(res => {
        list.value = res.data
      })
    }

    onMounted(() => {
      get_todo_list()
    })

    const add_todo = () => {
      if (!todo_input.value.trim()) {
        return ElMessage({
          message: '请输入内容',
          type: "warning",
          duration: 3 * 1000,
        })
      }

      todo_add({
        content: todo_input.value
      }).then(() => {
        todo_input.value = ''

        get_todo_list()
      })
    }

    const active_item_id = ref(null)

    const on_dblclick = (id) => {
      // 有值，代表双击之前，有todo在编辑中
      if (active_item_id.value) {
        // 更新这条
        const item = list.value.find(v => {
          return v.id === active_item_id.value
        })

        todo_update({
          id: item.id,
          content: item['content'],
          is_done: item['is_done']
        }).then(() => {
          active_item_id.value = id
        })

      } else {
        active_item_id.value = id
      }
    }

    const update_todo = (item, v=false) => {
      todo_update({
        id: item.id,
        content: item.content,
        is_done: item.is_done
      }).then(() => {
        v && (active_item_id.value = null)
      })
    }

    const del_todo = (id) => {
      todo_delete({
        id
      }).then(() => {
        list.value = list.value.filter(v => {
          return v.id !== id
        })
      })
    }

    return {
      get_todo_list,
      todo_input,
      add_todo,
      list,
      on_dblclick,
      active_item_id,
      update_todo,
      del_todo,
    }
  }
}
</script>

<style lang="less" scoped>
  .todo-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .submit-button {
    display: inline-block;
    width: 70px;
    height: 100%;
    text-align: center;
  }

  .submit-button:hover {
    cursor: pointer;
  }

  ::v-deep(.el-input-group__append, .el-input-group__prepend) {
    padding: 0;
  }

  .item {
    width: 520px;
    background-color: rgba(#409eff, 0.1);
    height: 50px;
    line-height: 30px;
    margin-bottom: 10px;
    box-sizing: border-box;
    padding: 0 10px;
    border-radius: 4px;
    position: relative;

    .check-button {
      position: absolute;
      left: -20px;
      top: 4px;
    }

    .delete-button {
      position: absolute;
      right: -60px;
      top: 10px;
    }

    .create-time {
      font-size: 14px;
      color: #999;
      text-align: right;
      line-height: 20px;
    }
  }

  .line-through {
    text-decoration: line-through;
    text-decoration-color: #aaa;
    color: #aaa;
  }
</style>
