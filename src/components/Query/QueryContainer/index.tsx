import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm, SubmitHandler } from "react-hook-form";
import useUrl from '@/hooks/useUrl'

type FormValues = {
  url: string;
};

const QueryContainer = () => {
  const { loading, generateUrl, generatedUrl } = useUrl()

  const [hasCopiedText, setHasCopiedText] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    try {
      const dataToPost = {
        url: data.url,
      };
      generateUrl(dataToPost)
    } catch (err) {
      console.error(err)
    }
  }

  const isValidUrl = (enteredUrl: string) => {
    let url;

    try {
      url = new URL(enteredUrl);
    } catch (_) {
      return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
  };

  const copyText = () => {
    navigator.clipboard.writeText(`${window.location.href}${generatedUrl}`)
    setHasCopiedText(true)
  }

  return (
    <motion.div
      className="query-container"
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative z-0 w-full group">
          <input
            type="text"
            className="input-form peer"
            autoComplete="off"
            {...register("url", { required: true, validate: isValidUrl })}
          />
          <div className="error">
            {errors.url?.type === "validate" && "Please enter a valid URL"}
            {errors.url?.type === "required" && "Please enter something :("}
          </div>
          <label htmlFor="url" className="input-label">
            Enter your URL
          </label>
        </div>
        {!loading && generatedUrl &&
          <>
            <div className='text-gray-500'>
              Shortened Url:
            </div>
            <div className="flex items-center">
              {`${window.location.href}${generatedUrl}`}
              <span className='ml-3 cursor-pointer inline hover:text-gray-600' onClick={copyText}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                </svg>
              </span>
            </div>
            {hasCopiedText && <div className='mt-2 text-sm text-green-500'>Copied to clipboard!</div>}
          </>
        }
        <button type="submit" className="button" disabled={loading}>
          {loading ? (
            <div className="flex items-center justify-center space-x-2 animate-pulse">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33" />
              </svg>
              Shortening...
            </div>
          ) : (
            "Shorten"
          )}
        </button>
      </form>
    </motion.div>
  );
};

export default QueryContainer;