import axios from "axios"

let AxiosFetch= axios.create({
    baseURL:"http://localhost:5000",
    headers:{
    "content-type":"application/json"
}
})

export default AxiosFetch;