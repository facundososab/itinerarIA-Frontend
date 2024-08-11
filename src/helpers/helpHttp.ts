type RequestOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
  signal?: AbortSignal;
};

type ErrorResponse = {
  err: boolean;
  status: number | string;
  statusText: string;
};


export const helpHttp = () => {
  const customFetch = async (endpoint: string, options: RequestOptions): Promise<any> => {
    const defaultHeader = {
      accept: 'application/json',
    };

    const controller = new AbortController(); //La peticion fetch detecta que no hay una respuesta del servidor, podemos abortar en cualquier momento la peticion
    options.signal = controller.signal;

    options.method = options.method || 'GET';
    options.headers = options.headers
      ? { ...defaultHeader, ...options.headers }
      : defaultHeader;

    options.body = JSON.stringify(options.body) || false;
    if (!options.body) delete options.body; //delete permite eliminar una propiedad de un objeto
    //se usa el if ya que no se pude mandar un body vacio

    //console.log(options);

    setTimeout(() => controller.abort(), 10000); //abortamos la peticion despues de 10 segundos

    return fetch(endpoint, options)
      .then((res) =>
        res.ok
          ? res.json()
          : Promise.reject<ErrorResponse>({
            err: true,
            status: res.status || '00',
            statusText: res.statusText || 'Ocurrió un error',
          })
      )
      .catch((err) => err);
  };

  const get = (url: string, options: RequestOptions = {}) => customFetch(url, options);

  const post = (url: string, options: RequestOptions) => {
    options.method = 'POST';
    return customFetch(url, options);
  };

  const put = (url: string, options: RequestOptions) => {
    options.method = 'PUT';
    return customFetch(url, options);
  };

  const del = (url: string, options: RequestOptions) => {
    options.method = 'DELETE';
    return customFetch(url, options);
  };

  return {
    get,
    post,
    put,
    del,
  };
};
