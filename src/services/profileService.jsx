import http from "./httpServices";
export const ProfileUser=(data)=>{
    return http.get("/user/login",data);
}