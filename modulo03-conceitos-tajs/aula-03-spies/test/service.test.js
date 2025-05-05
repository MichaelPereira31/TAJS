import { beforeEach, it, jest, describe, expect} from '@jest/globals'
import Service from '../src/server';
import fs from 'node:fs/promises';
import crypto from 'node:crypto'
import { create } from 'node:domain';

describe('#Service Suite', () => {
  let _service;
  const filename = "testfile.ndjson";
  const MOCKED_HASH_PWD = 'hashedpassword';

  
  describe('#create - spies', () => {
    beforeEach(() => {
      jest
        .spyOn(
          crypto,
          crypto.createHash.name
        )
        .mockReturnValue(
          {
            update: jest.fn().mockReturnThis(),
            digest: jest.fn().mockReturnValue(MOCKED_HASH_PWD)
          }
        );
      
      jest
        .spyOn(
          fs,
          fs.appendFile.name    
        ).mockResolvedValue();
      
      _service = new Service({filename})
    });

    it('should call appendFile with right params', async () => {
      const expectedCreatedAt = new Date().toISOString();
      const input = {
        username: 'user1',
        password: 'password1'
      };

      jest.spyOn(
        Date.prototype,
        Date.prototype.toISOString.name
      ).mockReturnValue(expectedCreatedAt);

      await _service.create(input);

      expect(crypto.createHash).toHaveBeenCalledWith('sha256');
      expect(crypto.createHash).toHaveBeenCalledTimes(1);

      const hash = crypto.createHash('sha256');
      expect(hash.update).toHaveBeenCalledWith(input.password);
      expect(hash.digest).toHaveBeenCalledWith('hex');

      const expected = JSON.stringify({
        ...input,
        createAt: expectedCreatedAt,
        password: MOCKED_HASH_PWD
      }).concat('\n');
      expect(fs.appendFile).toHaveBeenCalledWith(filename, expected);

      expect(fs.appendFile).toHaveBeenCalledTimes(1);
    })

  });
})