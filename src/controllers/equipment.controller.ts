import { Request, Response } from 'express';

interface Equipment {
  id: number;
  name: string;
  type: string;
  environmentId: number;
  status: 'operativo' | 'mantenimiento' | 'dañado';
  location: string;
}

let equipmentList: Equipment[] = [];
let nextId = 1;

export const getEquipment = (req: Request, res: Response) => {
  const { environmentId } = req.query;

  const result = environmentId
    ? equipmentList.filter(
        item => item.environmentId === Number(environmentId)
      )
    : equipmentList;

  return res.status(200).json(result);
};

export const createEquipment = (req: Request, res: Response) => {
  const { name, type, environmentId, location } = req.body;

  if (!name || !type || environmentId === undefined || !location) {
    return res.status(400).json({
      message: 'Nombre, tipo, ambiente y ubicación son obligatorios'
    });
  }

  if (!Number.isInteger(environmentId) || environmentId <= 0) {
    return res.status(400).json({
      message: 'El ID del ambiente debe ser un entero positivo'
    });
  }

  const equipment: Equipment = {
    id: nextId++,
    name,
    type,
    environmentId,
    location,
    status: 'operativo'
  };

  equipmentList.push(equipment);
  return res.status(201).json(equipment);
};


export const updateEquipment = (req: Request, res: Response) => {
  const item = equipmentList.find(
    equipment => equipment.id === Number(req.params.id)
  );

  if (!item) {
    return res.status(404).json({
      message: 'Equipo no encontrado'
    });
  }

  const { name, type, environmentId, status, location } = req.body;

  if (
    status !== undefined &&
    !['operativo', 'mantenimiento', 'dañado'].includes(status)
  ) {
    return res.status(400).json({
      message: 'Estado no válido'
    });
  }

  if (name !== undefined) item.name = name;
  if (type !== undefined) item.type = type;
  if (environmentId !== undefined) item.environmentId = environmentId;
  if (status !== undefined) item.status = status;
  if (location !== undefined) item.location = location;

  return res.status(200).json(item);
};