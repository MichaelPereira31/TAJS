import { beforeEach, it, jest, describe, expect} from '@jest/globals'
import Service from '../src/server';
import fs from 'node:fs/promises';

describe('#Service Suite', () => {
  let _service;
  const filename = "testfile.ndjson"
  beforeEach(() => {
    _service = new Service({filename})
  });

  describe('#read', () => {
    it('should return an empty array if the file is empty', async () => {
      jest.spyOn(
        fs, fs.readFile.name
      ).mockResolvedValue('')

      const result = await _service.read();

      return expect(result).toEqual([])
    });

    it('should return users without password if file contains users', async () => {
      const dbData = [
        {
          username: 'user1',
          password: 'password1',
          createAt: new Date().toISOString()
        },
        {
          username: 'user2',
          password: 'password2',
          createAt: new Date().toISOString()
        }
      ]

      const fileContent = dbData.map(item => JSON.stringify(item).concat('\n')).join('')

      jest.spyOn(
        fs,
        "readFile"
      ).mockResolvedValue(fileContent)

      const result = await _service.read();

      const expected = dbData.map(({password, ...rest}) => ({...rest}))

      expect(result).toEqual(expected)
    })

      
  });
})