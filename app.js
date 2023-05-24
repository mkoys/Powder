import http from "http";

const port = 3000;

const server = http.createServer(requestListener);

server.listen(port, () => console.log(`Running on http://127.0.0.1:${port}`));

function requestListener(request, response) {
	response.end("Hello World!");
}
