<template>
  <div
    class="modal-wrapper"
    :style="{ display: showModal ? 'block' : 'none' }"
  >
    <div class="main">
      <div class="body">
        <img class="image" :src="picture_url" alt="狗图" />
        <div>
          <el-button @click="on_exchange">换一张</el-button>
          <el-button @click="on_confirm">关 闭</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import axios from 'axios'

export default {
  name: 'DogIndex',
  props: {
    showModal: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:showModal'],
  setup(props, { emit }) {
    const picture_url = ref('');

    function on_confirm() {
      emit('update:showModal', false)
    }

    function on_exchange() {
      getDogPicture()
    }

    const URL = 'https://dog.ceo/api/breed/pembroke/images/random'

    function getDogPicture() {
      axios.get(URL).then(res => {
        picture_url.value = res.data.message
      })
    }

    onMounted(() => {
      getDogPicture()
    })

    return {
      picture_url,
      on_confirm,
      on_exchange
    }
  }
}
</script>

<style lang="less" scoped>
.modal-wrapper {
  position: absolute;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.3);
}

.main {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.body {
  width: 500px;
  height: 400px;
  background-color: white;
  margin: 0 auto;
  border-radius: 3px;
  box-shadow: 0 1px 3px rgba(0,0,0,.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}

.image {
  width: 450px;
  height: 320px;
}
</style>
