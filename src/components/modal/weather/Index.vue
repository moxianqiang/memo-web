<template>
  <div class="modal-wrapper">
    <div class="main">
      <div class="body">
        <h3>{{ title }}</h3>
        <h4>{{ weather_list[0]['province'] }} / {{ weather_list[0]['area'] }}</h4>

        <div style="box-sizing: border-box; padding: 0 20px">
          <div style="margin-bottom: 10px" v-for="(weather, i) in weather_list" :key="i">
            <div>
              <span style="color: #409eff">{{ weather['date'] }}</span>
              ，{{ weather['lowest'] }} ~
              {{ weather['highest'] }}，
              {{ weather['weather'] }}
            </div>
            <span style="font-size: 13px">
            {{ weather['tips'] }}
          </span>
          </div>
        </div>

        <div>
          <el-button @click="on_cancel">{{ cancel_text }}</el-button>
          <el-button @click="on_confirm">{{ confirm_text }}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import axios from 'axios'

export default {
  name: 'WeatherIndex',
  props: {
    // 标题
    title: {
      type: String,
      default: '标题'
    },
    city: {
      type: String,
      default: '佛山市'
    },
    // 取消按钮文本
    cancel_text: {
      type: String,
      default: '取消'
    },
    // 确定按钮文本
    confirm_text: {
      type: String,
      default: '确定'
    },
    // 取消回调
    cancel: {
      type: Function,
      default: () => {}
    },
    // 确定回调
    confirm: {
      type: Function,
      default: () => {}
    },
    dom: {
      type: Element,
      default: null
    }
  },
  setup(props) {
    const URL = 'https://api.tianapi.com/tianqi/index?key=c92241aa4eb0c6cd321c7cfd9f51f183&city='

    let weather_list = ref([{
      province: '省份',
      area: '城市'
    }])

    function getDogPicture() {
      axios
        .get(URL + props.city)
        .then(res => {
          console.log('天气', res.data['newslist'])
          weather_list.value = res.data['newslist']
        })
    }

    onMounted(() => {
      getDogPicture()
    })

    function on_cancel() {
      props.cancel()
      document.querySelector('#app').removeChild(props.dom)
    }

    function on_confirm() {
      props.confirm()
      document.querySelector('#app').removeChild(props.dom)
    }

    return {
      on_cancel,
      on_confirm,
      weather_list
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
  width: 800px;
  height: 500px;
  background-color: white;
  margin: 0 auto;
  border-radius: 3px;
  box-shadow: 0 1px 3px rgba(0,0,0,.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}
</style>
