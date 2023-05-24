import http from "http";
import fs from "fs";
import path from "path";

const port = 3000;

const server = http.createServer(requestListener);

server.listen(port, () => console.log(`Running on http://127.0.0.1:${port}`));

function requestListener(request, response) {
	const splitUrl = request.url.split("/");
	const filterRule = item => item.length > 0 && item !== "..";
	const filteredUrl = splitUrl.filter(filterRule);
	const fileUrl = filteredUrl.join("/");
	
	const currentPath = new URL(".", import.meta.url).pathname;
	const filePath = path.join(currentPath, fileUrl);
	
	fs.readFile(filePath, (error, file) => {
		if(error) response.statusCode = 404;
		response.end(file);
	});
}
