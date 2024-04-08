import axios from "axios"

const BASE_URL = "https://cv-builder-jg4oudjx5q-uc.a.run.app"
export default axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-type": "application/json"
    }
})