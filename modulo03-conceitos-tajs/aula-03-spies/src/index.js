import Service from "./server.js";

const data = {
  username: `michaelpereira-${Date.now()}`,
  password: `minhasenhasecreta`
}

const service = new Service({
  filename: "./users.ndjson"
})

await service.create(data)

const users = await service.read()
console.log('users', users)