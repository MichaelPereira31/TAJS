import crypto from 'node:crypto'
import fs from 'node:fs/promises'

export default class Service{
  #filename
  constructor({filename}){
    this.#filename = filename
  }
  #hashPassword(password){
    const hash = crypto.createHash('sha256')
    hash.update(password)

    return hash.digest('hex')
  }

  create({username, password}){
    const data = JSON.stringify({
      username,
      password: this.#hashPassword(password),
      createAt: new Date().toISOString()
    }).concat('\n');
    console.log(data, this.#filename)
    return fs.appendFile(this.#filename, data)
  }
  async read(){
    const lines = (await fs.readFile(this.#filename, 'utf-8'))
    .split('\n')
    .filter(line => !!line)

    if(!lines.length){
      return []
    }

    return lines.map(line => JSON.parse(line)).map(({password, ...rest}) => ({...rest}))
  }
}