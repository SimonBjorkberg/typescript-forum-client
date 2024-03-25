import axios from "axios";

class ThreadService {
    api: any;
    constructor() {
        this.api = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_URL
        });
    }
    getAll = (pathName: string) => {
        return this.api.get(`/thread/getAll/${pathName}`)
    }
    getOne = (id: string) => {
        return this.api.get(`/thread/getOne/${id}`)
    }
    editOne = (id: string, reqBody: { loggedInUser: string, author: string, title: string, content: string }) => {
        return this.api.post(`/thread/edit/${id}`, reqBody)
    }
    createThread = (reqBody: { title: string, content: string, parentTopic: string, author: string }) => {
        return this.api.post(`/thread/create`, reqBody)
    }
    deleteThread = (id: string) => {
        return this.api.post(`/thread/delete/${id}`)
    }
    getAllComments = (id: string) => {
        return this.api.get(`/comment/getAll/${id}`)
    }
    createComment = (reqBody: { author: string, content: string, parentThread: string }) => {
        return this.api.post(`/comment/create`, reqBody)
    }
}

const threadService = new ThreadService();

export default threadService;