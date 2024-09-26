import axios from "axios";
import { Adapter } from "./base";

const USERS_API_URL = 'https://jsonplaceholder.typicode.com/users'

export class UsersAdapter<T> implements Adapter<T> {
    async find() {
        const res = await axios.get<T[]>(USERS_API_URL)
        return res.data
    }
}