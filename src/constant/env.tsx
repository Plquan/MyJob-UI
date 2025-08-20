
const env = {
    API_URL: import.meta.env.API_URL || "http://localhost:5500/api",
    ACCESS_TOKEN: import.meta.env.ACCESS_TOKEN,
    IMAGE_URL: import.meta.env.IMAGE_URL,
    DEFAULT_AVATAR: "/assets/avatar.png",
    APP_NAME:"MyJob"
}
export default env