import { useState } from "react";
import urlApi from "@/services/api/urlApi";
import { ApiResponse } from "apisauce";

const useUrl = () => {
  const [generatedUrl, setGeneratedUrl] = useState<string>("");
  const [revertedUrl, setRevertedUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const getUrl = async (shortUrl: string) => {
    setLoading(true);
    const response: ApiResponse<any> = await urlApi.getUrl(shortUrl);
    if (response.ok) {
      setRevertedUrl(response.data.url);
    } else {
      setError(true);
    }
    setLoading(false);
  };

  const generateUrl = async (originalUrl: string) => {
    setLoading(true);
    const response: ApiResponse<any> = await urlApi.generateUrl({
      originalUrl,
    });
    if (response.ok) {
      setGeneratedUrl(response.data.url);
    } else {
      setError(true);
    }
    setLoading(false);
  };

  return {
    generatedUrl,
    revertedUrl,
    loading,
    error,
    getUrl,
    generateUrl,
  };
};

export default useUrl;
