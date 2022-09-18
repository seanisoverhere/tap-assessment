import { useState } from "react";
import urlApi from "@/services/api/urlApi";
import { ApiResponse } from "apisauce";
import { IGenerateUrl } from "@/types/url";

const useUrl = () => {
  const [generatedUrl, setGeneratedUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const getUrl = async (shortUrl: string) => {
    setLoading(true);
    const response: ApiResponse<any> = await urlApi.getUrl(shortUrl);
    if (response.ok) {
      window.location = response.data.data;
    } else {
      setError(true);
    }
    setLoading(false);
  };

  const generateUrl = async (data: IGenerateUrl) => {
    setLoading(true);
    const response: ApiResponse<any> = await urlApi.generateUrl(data);
    if (response.ok) {
      setGeneratedUrl(response.data.data);
    } else {
      setError(true);
    }
    setLoading(false);
  };

  return {
    generatedUrl,
    loading,
    error,
    getUrl,
    generateUrl,
  };
};

export default useUrl;
