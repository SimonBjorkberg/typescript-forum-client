import axios from "axios";

class SearchService {
    api: any;
    constructor() {
        this.api = axios.create({
            baseURL: process.env.NEXT_PUBLIC_API_URL
        });
    }
    getResults = (searchValue: string) => {
        return this.api.get(`/search/result/${searchValue}`)
    }
}

const searchService = new SearchService();

export default searchService;