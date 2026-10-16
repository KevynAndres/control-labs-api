import { Request, Response } from 'express';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'estudiante' | 'docente' | 'administrador';
  active: boolean;
  deleted: boolean;
}

let users: User[] = [];
let nextId = 1;


export const getUsers = (_req: Request, res: Response) => {
  res.status(200).json(users.filter(user => !user.deleted));
};

export const createUser = (req: Request, res: Response) => {
  const { name, email, role } = req.body;

  if (!name || !email || !role) {
    return res.status(400).json({ message: 'Faltan datos obligatorios' });
  }

  const user: User = {
    id: nextId++,
    name,
    email,
    role,
    active: true,
    deleted: false
  };

  users.push(user);
  return res.status(201).json(user);
};


export const getUserById = (req: Request, res: Response) => {
  const user = users.find(
    item => item.id === Number(req.params.id) && !item.deleted
  );

  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  return res.status(200).json(user);
};


export const updateUser = (req: Request, res: Response) => {
  const user = users.find(
    item => item.id === Number(req.params.id) && !item.deleted
  );

  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  const { role, active, password } = req.body;

  if (role !== undefined) user.role = role;
  if (active !== undefined) user.active = active;


  if (password !== undefined) {
    return res.status(501).json({
      message: 'La actualización segura de contraseña requiere implementar autenticación'
    });
  }

  return res.status(200).json(user);
};


export const deleteUser = (req: Request, res: Response) => {
  const user = users.find(
    item => item.id === Number(req.params.id) && !item.deleted
  );

  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  user.deleted = true;
  return res.status(200).json({ message: 'Usuario eliminado lógicamente' });
};