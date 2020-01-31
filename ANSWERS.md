- Explain what a token is used for.

`A token is used for authenticating a user. When a user logs in to an app with valid credentials, a token is received and stored. Whenever that user needs to request a resource requiring authentication, the token is sent with the request so the server can authenticate.`

- What steps can you take in your web apps to keep your data secure?

`Ensure that there is both server-side and client-side authentication. On the server, resources should be protected with token authentication. On the client, pages should be protected by routing unauthenticated users away from protected content.`

- Describe how web servers work.

`A browser makes a request via a URL. The domain of the URL is resolved into an IP address through a DNS lookup, and then the request is sent to the server that owns that IP. The server responds with an HTTP response that returns whatever is found at that requested URL.`

- Which HTTP methods can be mapped to the CRUD acronym that we use when interfacing with APIs/Servers.

- `C - POST`
- `R - GET`
- `U - PUT`
- `D - DELETE`