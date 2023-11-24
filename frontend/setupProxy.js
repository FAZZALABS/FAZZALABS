import { createProxyMiddleware } from "http-proxy-middleware";

export default function setupProxy(app) {
	app.use(
		"/api", // Change this to the path you want to proxy
		createProxyMiddleware({
			target: "http://161.35.234.141/", // Change this to your API server's URL
			changeOrigin: true,
		})
	);
}
