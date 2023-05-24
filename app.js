import http from "http";
import fs from "fs";
import path from "path";

const port = 3000;
const mimeTypesJson = "mimeTypes.json";

const server = http.createServer(requestListener);
const currentPath = new URL(".", import.meta.url).pathname;
const mimeTypesPath = path.join(currentPath, mimeTypesJson);
const mimeTypes = JSON.parse(fs.readFileSync(mimeTypesPath, {encoding: "utf8"})); 

server.listen(port, () => console.log(`Running on http://127.0.0.1:${port}`));

function requestListener(request, response) {
	const splitUrl = request.url.split("/");
	const filterRule = item => item.length > 0 && item !== "..";
	const filteredUrl = splitUrl.filter(filterRule);
	const fileUrl = filteredUrl.join("/");
	
	const filePath = path.join(currentPath, fileUrl);
	const fileExtension = path.extname(filePath);
	const fileMimeType = mimeType(fileExtension);
	
	fs.readFile(filePath, (error, file) => {	
		if(error) response.statusCode = 404;
		response.setHeader("Content-Type", fileMimeType); 
		response.end(file);
	});
}

function mimeType(fileExtension) {
	const mimeIndex = mimeTypes.findIndex(item => item.extension === fileExtension);
	if(mimeIndex == -1) return "text";
	const mimeType = mimeTypes[mimeIndex].type;
	return mimeType;
}
