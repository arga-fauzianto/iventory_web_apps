export default function ({ $axios }) {
  $axios.onResponse((response) => {
    if (response.headers['content-type'] === 'text/html; charset=utf-8') {
      response.headers['content-type'] = 'application/json';
      response.data = {
        html: response.data // Simpan HTML di dalam properti 'html'
      };
    }
    return response;
  });
}