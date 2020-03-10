import Prismic from "prismic-javascript";
import config from "../config/prismic.config";

const _initApi = async() => await Prismic.getApi(config.apiEndpoint);

export const getAllPosts = async(documentType, value) => {
  const api = await _initApi();
  return await api.query(
    Prismic.Predicates.at(documentType, value)
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
    Prismic.Predicates.fulltext(type, text)
  ], { pageSize : 10 })
};


