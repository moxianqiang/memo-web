import request from "../utils/http/request.js";

// article列表
export const article_list = (data) => {
  return request({
    method: "post",
    url: `/article/list`,
    data: data
  })
}
// article新增
export const article_add = (data) => {
  return request({
    method: "post",
    url: `/article/add`,
    data: data
  })
}
// article修改
export const article_update = (data) => {
  return request({
    method: "post",
    url: `/article/update`,
    data: data
  })
}
// article删除
export const article_delete = (data) => {
  return request({
    method: "post",
    url: `/article/delete`,
    data: data
  })
}
