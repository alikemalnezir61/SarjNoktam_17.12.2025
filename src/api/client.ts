// Bu dosya: API'ye istek atmayı tek yerden yönetir.
// Backend (PHP) hazır olduğunda sadece base URL ve endpointleri güncelleyeceğiz.

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Her istekte cookie/session kullanılacaksa true yapılır.
// PHP tarafında session ile çalışacaksanız genelde gerekir.
const USE_CREDENTIALS = true;

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

async function request<T>(
  path: string,
  method: HttpMethod,
  body?: unknown
): Promise<T> {
  const url = `${BASE_URL}${path}`;

  const res = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: USE_CREDENTIALS ? 'include' : 'omit',
    body: body ? JSON.stringify(body) : undefined,
  });

  // Backend hata döndürürse burada yakalıyoruz
  if (!res.ok) {
    let message = `HTTP ${res.status}`;
    try {
      const data = await res.json();
      if (data?.message) message = data.message;
    } catch {
      // JSON değilse boş geç
    }
    throw new Error(message);
  }

  // Bazı endpointler boş dönebilir; o durumda null dönelim
  const text = await res.text();
  return (text ? JSON.parse(text) : null) as T;
}

export const apiClient = {
  get: <T>(path: string) => request<T>(path, 'GET'),
  post: <T>(path: string, body?: unknown) => request<T>(path, 'POST', body),
  put: <T>(path: string, body?: unknown) => request<T>(path, 'PUT', body),
  del: <T>(path: string) => request<T>(path, 'DELETE'),
};
