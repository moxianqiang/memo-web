<template>
  <div class="login-wrapper">

    <div class="title">欢迎使用备忘录</div>

    <form>
      <div class="form-wrapper">
        <div class="row">
          <el-input v-model="email" style="width: 300px">
            <template #prepend>账号</template>
          </el-input>
        </div>
        <div class="row">
          <el-input
            v-model="password"
            style="width: 300px"
            type="password"
            show-password
          >
            <template #prepend>密码</template>
          </el-input>
        </div>
        <div class="row">
          <el-button @click="on_login" style="width: 300px" type="primary">登录</el-button>
        </div>
      </div>
    </form>

    <div class="register" @click="to_page_register">注册账号</div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/apis/login.js'

export default {
  name: 'Login',
  setup() {
    const form_state = reactive({
      email: '',
      password: ''
    })

    const router = useRouter()

    const to_page_register = () => {
      router.push('/register')
    }

    const on_login = () => {
      const { email, password } = form_state
      login({
        email,
        password
      }).then(res => {
        // 存储 token
        if (res['token']) {
          sessionStorage.setItem('token', res['token'])
        }
        router.replace('/home')
      })
    }

    return {
      ...toRefs(form_state),
      to_page_register,
      on_login
    }
  }
}
</script>

<style lang="less" scoped>
  .login-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .title {
    margin-top: 30px;
    font-size: 24px;
    font-weight: 600;
  }

  .form-wrapper {
    width: 400px;
    height: 300px;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .row {
    margin-bottom: 20px;
  }

  .register {
    color: #409eff;
    margin-left: 300px;
    margin-top: 10px;
    cursor: pointer;
  }

  .register:hover {
    text-decoration: underline;
  }
</style>
