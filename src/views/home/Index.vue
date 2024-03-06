<template>
  <div class="home-wrapper">
    <div class="header">
      <span class="title">
        欢迎使用备忘录
        <img src="https://www.ricocc.com/todo/img/todo.svg" alt="头图">
      </span>

      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <el-button type="primary" plain size="small">更多</el-button>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>修改信息</el-dropdown-item>
            <el-dropdown-item @click="on_logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <div class="body-wrapper">
      <el-tabs v-model="active_name" class="demo-tabs" @tab-click="handle_click">
        <el-tab-pane label="我的笔记" name="article">
          <Article ref="article_ref" />
        </el-tab-pane>
        <el-tab-pane label="代办事项" name="todo">
          <Todo ref="todo_ref" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { logout } from '@/apis/login'
import { ref } from 'vue'
import Todo from '@/views/todo/Index.vue'
import Article from '@/views/article/Index.vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Index',
  components: {
    Todo,
    Article
  },
  setup () {
    const active_name = ref('article')

    const handle_click = () => {
      todo_ref.value.get_todo_list()
    }

    const article_ref = ref()
    const todo_ref = ref()

    const router = useRouter()

    const on_logout = () => {
      logout().then(() => {
        sessionStorage.removeItem('token')
        router.replace('/login')
      })
    }

    return {
      active_name,
      handle_click,
      article_ref,
      todo_ref,
      on_logout
    }
  }
}
</script>

<style lang="less" scoped>
  .home-wrapper {
    margin: 0 auto;
    width: 1000px;
    height: 100%;
  }

  .header {
    width: 1000px;
    height: 40px;
    line-height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .title {
      font-size: 20px;
      font-weight: 600;
      display: flex;
      align-items: center;

      img {
        height: 24px;
        margin-left: 20px;
      }
    }
  }

  .body-wrapper {
    width: 100%;
    height: calc(100% - 80px);
  }
</style>
