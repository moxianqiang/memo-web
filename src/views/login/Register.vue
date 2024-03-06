<template>
  <div class="register-wrapper">

    <div class="title">注册账号</div>

    <form>
      <div class="form-wrapper">
        <div class="row">
          <el-input v-model="email" style="width: 300px">
            <template #prepend>设置账号</template>
          </el-input>
        </div>
        <div class="row">
          <el-input
            v-model="password"
            style="width: 300px"
            type="password"
            show-password
          >
            <template #prepend>设置密码</template>
          </el-input>
        </div>
        <div class="row">
          <el-input
            v-model="password2"
            style="width: 300px"
            type="password"
            show-password
          >
            <template #prepend>确认密码</template>
          </el-input>
        </div>
        <div class="row">
          <el-button @click="on_register" style="width: 300px" type="primary">提交注册</el-button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { register } from '@/apis/login.js'
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

export default {
  name: 'Register',
  setup() {
    const form_state = reactive({
      email: '',
      password: '',
      password2: ''
    })

    const router = useRouter()

    const on_register = () => {
      const { email, password, password2 } = form_state
      register({
        email,
        password,
        password2,
      }).then(res => {
        // ElMessage({
        //   message: res['msg'],
        //   type: 'success',
        //   duration: 2 * 1000,
        // });

        router.push('/login')
      })
    }

    return {
      ...toRefs(form_state),
      on_register
    }
  }
}
</script>

<style lang="less" scoped>
  .register-wrapper {
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
</style>
