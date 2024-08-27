import { createServer } from 'http';
import { fileURLToPath } from 'url';
import { join } from 'path';
import serveHandler from 'serve-handler';

const port = process.env.PORT || 3000;
const __dirname = fileURLToPath(new URL('.', import.meta.url));
const staticDir = join(__dirname, 'dist');

const server = createServer((request, response) => {
  return serveHandler(request, response, {
    public: staticDir,
    cleanUrls: true
  });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
