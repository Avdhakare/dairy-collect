
export interface LoginInterFace {
    username:String,
    password:String
}
export interface ResetInterFace {
    username:String,
    email:String,
}
export interface ForgotPasswordInterFace {
    token:String
    password:String,
    confirmPassword:String
}
export interface ForgotPasswordGenerateInterFace {
    usename:String,
    password:String,
    confirmPassword:String
}
export interface crateUserInterFace{
    name:String,
    email:String,
    password:String,
    role:Role
}
enum  Role{
    "ADMINSTRATOR",
    "STUDENT",
    "TEACHER",
    "PARENT"
}

