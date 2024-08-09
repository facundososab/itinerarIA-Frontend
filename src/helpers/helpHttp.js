export const helpHttp = () => {
  const customFetch = (endpoint, options) => {
    const defaultHeader = {
      accept: "application/json",
    };

    const controller = new AbortController(); //La peticion fetch detecta que no hay una respuesta del servidor, podemos abortar en cualquier momento la peticion
    options.signal = controller.signal;

    options.method = options.method || "GET";
    options.headers = options.headers
      ? { ...defaultHeader, ...options.headers }
      : defaultHeader;

    options.body = JSON.stringify(options.body) || false;
    if (!options.body) delete options.body; //delete permite eliminar una propiedad de un objeto
    //se usa el if ya que no se pude mandar un body vacio

    //console.log(options);

    setTimeout(() => controller.abort(), 10000); //abortamos la peticion despues de 3 segundos

    return fetch(endpoint, options)
      .then((res) =>
        res.ok
          ? res.json()
          : Promise.reject({
              err: true,
              status: res.status || "00",
              statusText: res.statusText || "Ocurrió un error",
            })
      )
      .catch((err) => err);
  };

  const get = (url, options = {}) => customFetch(url, options);

  const post = (url, options) => {
    options.method = "POST";
    return customFetch(url, options);
  };

  const put = (url, options) => {
    options.method = "PUT";
    return customFetch(url, options);
  };

  const del = (url, options) => {
    options.method = "DELETE";
    return customFetch(url, options);
  };

  return {
    get,
    post,
    put,
    del,
  };
};
