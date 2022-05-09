let apiUrl;
const apiUrls = {
  production: "https://www.lern-tax.com",
  development: "http://localhost:4001",
};

if (window.location.hostname === "localhost") {
  apiUrl = apiUrls.development;
} else {
  apiUrl = apiUrls.production;
}

export default apiUrl;
