import Article from "../models/Article";


const saveArticle = async (article: Object) => {
    const res = await new Article(article).save();
    return res;
};

export default {
    saveArticle,
}