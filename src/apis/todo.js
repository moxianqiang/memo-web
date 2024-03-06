import request from "../utils/http/request.js";

// todo列表
export const todo_list = (data) => {
  return request({
    method: "post",
    url: `/todo/list`,
    data: data
  })
}
// todo新增
export const todo_add = (data) => {
  return request({
    method: "post",
    url: `/todo/add`,
    data: data
  })
}
// todo修改
export const todo_update = (data) => {
  return request({
    method: "post",
    url: `/todo/update`,
    data: data
  })
}
// todo删除
export const todo_delete = (data) => {
  return request({
    method: "post",
    url: `/todo/delete`,
    data: data
  })
}
