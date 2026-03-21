import { describe, test, expect } from 'vitest';
import { Nivel } from '../src/models/niveles';

describe('Tests para comrpobar el funcionamiento de la clase Nivel', () => {
  test('debería crear la instancia correctamente con el límite inferior (1)', () => {
    const nivel = new Nivel(1);
    expect(nivel.nivel).toBe(1);
  });

  test('debería crear la instancia correctamente con el límite superior (10)', () => {
    const nivel = new Nivel(10);
    expect(nivel.nivel).toBe(10);
  });

  test('debería crear la instancia correctamente con un valor intermedio', () => {
    const nivel = new Nivel(5.7);
    expect(nivel.nivel).toBe(5.7);
  });

  test('debería lanzar un error si el nivel proporcionado es menor que 1', () => {
    expect(() => new Nivel(0)).toThrow('El nivel debe estar entre 1 y 10');
    expect(() => new Nivel(-5)).toThrow('El nivel debe estar entre 1 y 10');
  });

  test('debería lanzar un error si el nivel proporcionado es mayor que 10', () => {
    expect(() => new Nivel(11)).toThrow('El nivel debe estar entre 1 y 10');
    expect(() => new Nivel(100)).toThrow('El nivel debe estar entre 1 y 10');
  });
});
