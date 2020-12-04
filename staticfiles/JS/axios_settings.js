window.axios.defaults.headers.common = {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-TOKEN': '{{ csrf_token}}'
};
window.axios.defaults.xsrfCookieName = 'csrftoken';
window.axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";