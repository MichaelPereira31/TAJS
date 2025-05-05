import {describe, expect, it, jest } from '@jest/globals'
import Person from '../src/person'

describe('#Person Suite', () => {
  describe('#validate', ()=> {
    it('should throw if the name is not present', () => {
      const mockInvalidPerson = {
        name: '',
        cpf: '123.456.789-00'
      }

      expect(() => Person.validate(mockInvalidPerson)).toThrow(new Error('name is required'))
    });

    it('should throw if the cpf is not present', () => {
      const mockInvalidPerson = {
        name: 'Michael Pereira da silva',
        cpf: ''
      }

      expect(() => Person.validate(mockInvalidPerson)).toThrow(new Error('cpf is required'))
    });

    it('should not throw person is valid', () => {
      const mockValidPerson = {
        name: 'Michael Pereira da silva',
        cpf: '123.456.789-00'
      }

      expect(() => Person.validate(mockValidPerson)).not.toThrow()
    });
  });

  describe('#format', () => {
    it('should format the person name and cpf', () => {
      // AAA
      // Arrange = Preparar o teste
      const mockPerson = {
        name: 'Michael Pereira da silva',
        cpf: '123.456.789-00'
      }

      // Act = Executar o teste
      const formattedPerson = Person.format(mockPerson)

      // Assert = Validar o resultado
      const expected = {
        name: 'Michael',
        lastName: 'Pereira da silva',
        cpf: '12345678900'
      }

      expect(formattedPerson).toStrictEqual(expected)


    })
  });

  describe('#process', () => {
    it('should process a valid person', () => {
      const mockPerson = {
        cpf: '123.456.789-00',
        name: 'Michael Pereira da silva',
      };
      jest.spyOn(Person, Person.validate.name).mockReturnValue();
      jest.spyOn(Person, Person.format.name).mockReturnValue({
        name: 'Michael',
        lastName: 'Pereira da silva',
        cpf: '12345678900'
      });

      const result = Person.process(mockPerson)

      expect(result).toStrictEqual('ok')
    });
  })

  describe('#save', () => {
    it('should throw if the cpf is not present', () => {
      const mockPerson = {
        name: 'Michael',
        lastName: 'Pereira da silva',
      };

      expect(() => Person.save(mockPerson)).toThrow(new Error('cannot save invalid person: {"name":"Michael","lastName":"Pereira da silva"}'))
    });

    it('should throw if the name is not present', () => {
      const mockPerson = {
        cpf: '123.456.789-00',
        lastName: 'Pereira da silva',
      };

      expect(() => Person.save(mockPerson)).toThrow(new Error('cannot save invalid person: {"cpf":"123.456.789-00","lastName":"Pereira da silva"}'))
    });

    it('should throw if the lastName is not present', () => {
      const mockPerson = {
        name: 'Michael',
        cpf: '123.456.789-00',
      };

      expect(() => Person.save(mockPerson)).toThrow(new Error('cannot save invalid person: {"name":"Michael","cpf":"123.456.789-00"}'))
    });

    it('should save a valid person', () => {
      const mockPerson = {
        name: 'Michael',
        lastName: 'Pereira da silva',
        cpf: '123.456.789-00'
      };

      expect(() => Person.save(mockPerson)).not.toThrow()
    });
  })
})