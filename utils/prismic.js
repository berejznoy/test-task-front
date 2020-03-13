import Prismic from "prismic-javascript";
import config from "../config/prismic.config";
import axios from "axios"

const _initApi = async() => await Prismic.getApi(config.apiEndpoint, {accessToken: config.accessToken});

export const getAllPosts = async(documentType, value) => {
  const api = await _initApi();
  return await api.query(
    Prismic.Predicates.at(documentType, value),
    { orderings : '[document.first_publication_date desc]' }
  );
};

export const getTopPosts = async(documentType, value) => {
  const getTopPostsUIDs = await axios.get("/blog/posts/top", {
    baseURL: process.env.API_URL
  });
  const topUIDs = getTopPostsUIDs.data.map(item => item.prismicId);
  const api = await _initApi();
  return await api.query(
    Prismic.Predicates.in('document.id', topUIDs)
  );
};

export const getPostByUid = async(type, uid) => {
  const api = await _initApi();
  return await api.getByUID(type, uid)
};

export const findPostByText = async(documentType, value, type, text) => {
  const api = await _initApi();
  return api.query([
    Prismic.Predicates.at(documentType, value),
    Prismic.Predicates.fulltext(type, text),
  ], { pageSize : 10,   orderings : '[document.last_publication_date desc]' })
};
export const getPostsByTag = async(documentType, tag) => {
  const api = await _initApi();
  return api.query([
    Prismic.Predicates.at(documentType, [tag])
  ], {  orderings : '[document.last_publication_date desc]' })
};
export const getPostsByField = async(field) => {
  const api = await _initApi()
  return api.query([
    Prismic.Predicates.at('document.type', 'post'),
    Prismic.Predicates.at('my.post.results.data.category.name', 'Разное')
  ]);
};



