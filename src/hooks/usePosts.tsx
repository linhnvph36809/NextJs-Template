import { useRequest } from "ahooks";
import { tokenManagerInstance } from "../api/request";

const usePosts = () => {
  const fetchData = async (
    api: string,
    method: string,
    params: any = undefined
  ) => {
    const { data } = await tokenManagerInstance(api, {
      method,
      data: params,
    });
    return data;
  };

  const {
    data,
    error,
    loading,
    run: fetchPosts,
  } = useRequest(fetchData, {
    manual: true,
  });

  return { data, error, loading, fetchPosts };
};

export default usePosts;
