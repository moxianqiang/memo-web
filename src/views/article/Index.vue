<template>
  <div class="article-wrapper">
    <div class="header">
      <el-button type="primary" @click="open_dialog">发表笔记</el-button>
    </div>

    <div v-for="(v, i) in list" :key="v['id']" class="item">
      <div class="title">
        <span class="left" @click="open_detail(v)">{{ v['title'] }}</span>
        <div class="right">
          <el-popconfirm
            title="删除该笔记？"
            confirm-button-text="确定"
            cancel-button-text="取消"
            @confirm="delete_article(v['id'])"
          >
            <template #reference>
              <span class="delete-button">删除</span>
            </template>
          </el-popconfirm>

          <span>
          发表时间：
          {{
            new Date(v['create_time'].slice(0, v['create_time'].length - 3)).toLocaleDateString()
          }}
          {{
            new Date(v['create_time'].slice(0, v['create_time'].length - 3)).toLocaleTimeString()
          }}
        </span>
        </div>
      </div>
      <div class="content">{{ v['content'] }}</div>
    </div>

    <el-dialog
      v-model="dialog_visible"
      title="笔记"
      width="800"
      center
      :close-on-click-modal="false"
    >
      <div>
        <el-input
          v-model="title"
          style="width: 750px; margin-bottom: 20px"
        >
          <template #prepend>标题</template>
        </el-input>

        <el-input
          v-model="content"
          style="width: 750px; height: 300px"
          type="textarea"
          placeholder="正文..."
          :rows="13"
          resize="none"
        />
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialog_visible = false">取消</el-button>
          <el-button type="primary" @click="on_submit">发布</el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog
      v-model="detail_dialog_visible"
      title="编辑笔记"
      width="800"
      center
      :close-on-click-modal="false"
    >
      <div>
        <el-input
          v-model="detail['title']"
          style="width: 750px; margin-bottom: 20px"
        >
          <template #prepend>标题</template>
        </el-input>

        <el-input
          v-model="detail['content']"
          style="width: 750px; height: 300px"
          type="textarea"
          placeholder="正文..."
          :rows="13"
          resize="none"
        />
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="detail_dialog_visible = false">取消</el-button>
          <el-button type="primary" @click="on_edit">修改</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { article_add, article_list, article_delete, article_update } from '@/apis/article'
import { ElMessage } from '_element-plus@2.6.0@element-plus'

export default {
  name: 'Index',
  setup() {
    const dialog_visible = ref(false)

    const title = ref('')
    const content = ref('')

    const open_dialog = () => {
      dialog_visible.value = true
    }

    const on_submit = () => {
      if (!title.value.trim() || !content.value.trim()) {
        return ElMessage({
          message: '请输入标题和正文内容',
          type: "warning",
          duration: 3 * 1000,
        })
      }

      article_add({
        title: title.value,
        content: content.value
      }).then(() => {
        title.value = ''
        content.value = ''
        dialog_visible.value = false

        get_article_list()
      })
    }

    const list = ref([])

    const get_article_list = () => {
      article_list().then(res => {
        list.value = res.data
      })
    }

    onMounted(() => {
      get_article_list()
    })

    const delete_article = (id) => {
      article_delete({
        id
      }).then(() => {
        list.value = list.value.filter(v => {
          return v.id !== id
        })
      })
    }

    const detail_dialog_visible = ref(false)
    const detail = ref({})

    const open_detail = (v) => {
      detail.value = JSON.parse(JSON.stringify(v))
      detail_dialog_visible.value = true
    }

    const on_edit = () => {
      article_update({
        id: detail.value['id'],
        title: detail.value['title'],
        content: detail.value['content'],
      }).then(() => {
        detail_dialog_visible.value = false
        detail.value = {}
        get_article_list()
      })
    }

    return {
      title,
      content,
      open_dialog,
      dialog_visible,
      on_submit,
      list,
      delete_article,
      detail_dialog_visible,
      open_detail,
      detail,
      on_edit
    }
  }
}
</script>

<style lang="less" scoped>
  .article-wrapper {

    .header {
      text-align: right;
      height: 40px;
    }
  }

  .item {
    box-sizing: border-box;
    padding: 10px 10px 10px 30px;
    border-bottom: 1px dashed #e0e0e0;

    .title {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .left {
        font-weight: 600;
      }

      .left:hover {
        text-decoration: underline;
        cursor: pointer;
      }

      .right {
        color: #999;
        font-size: 12px;
      }
    }

    .title::before {
      display: inline-block;
      content: '';
      width: 4px;
      height: 20px;
      background-color: #409eff;
      border-radius: 2px;
      position: absolute;
      left: -20px;
      top: 0;
    }

    .content {
      color: #777;
      font-size: 14px;
      margin-top: 6px;
      height: 40px;
      overflow: hidden;
    }
  }

  .item:hover {
    background-color: rgba(#409eff, 0.1);
  }

  .delete-button {
    color: #f56c6c;
    margin-right: 10px;
  }

  .delete-button:hover {
    cursor: pointer;
    text-decoration: underline;
  }
</style>
