import request from "../utils/http/request.js";

export const register = (data) => {
  return request({
    method: "post",
    url: `/register`,
    data: data
  })
}

export const login = (data) => {
  return request({
    method: "post",
    url: `/login`,
    data: data
  })
}

export const logout = () => {
  return request({
    method: "post",
    url: `/logout`
  })
}
