import { Request, Response } from 'express';

interface Environment {
  id: number;
  name: string;
  capacity: number;
  location: string;
  active: boolean;
}

let environments: Environment[] = [];
let nextId = 1;


export const getEnvironments = (_req: Request, res: Response) => {
  res.status(200).json(environments);
};

export const createEnvironment = (req: Request, res: Response) => {
  const { name, capacity, location } = req.body;

  if (!name || capacity === undefined || !location) {
    return res.status(400).json({
      message: 'Nombre, capacidad y ubicación son obligatorios'
    });
  }

  if (!Number.isInteger(capacity) || capacity <= 0) {
    return res.status(400).json({
      message: 'La capacidad debe ser un entero positivo'
    });
  }

  const environment: Environment = {
    id: nextId++,
    name,
    capacity,
    location,
    active: true
  };

  environments.push(environment);
  return res.status(201).json(environment);
};


export const updateEnvironment = (req: Request, res: Response) => {
  const environment = environments.find(
    item => item.id === Number(req.params.id)
  );

  if (!environment) {
    return res.status(404).json({ message: 'Ambiente no encontrado' });
  }

  const { name, capacity, location, active } = req.body;

  if (capacity !== undefined &&
      (!Number.isInteger(capacity) || capacity <= 0)) {
    return res.status(400).json({
      message: 'La capacidad debe ser un entero positivo'
    });
  }

  if (name !== undefined) environment.name = name;
  if (capacity !== undefined) environment.capacity = capacity;
  if (location !== undefined) environment.location = location;
  if (active !== undefined) environment.active = active;

  return res.status(200).json(environment);
};