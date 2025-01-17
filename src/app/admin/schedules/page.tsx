'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Search, Eye } from 'lucide-react';

const schedules = [
  {
    id: 1,
    user: 'João Silva',
    property: 'Apartamento Moderno',
    date: '2024-03-25',
    time: '14:00',
    type: 'Visita',
    status: 'Agendado',
  },
  {
    id: 2,
    user: 'Maria Santos',
    property: 'Casa com Jardim',
    date: '2024-03-26',
    time: '10:30',
    type: 'Vistoria',
    status: 'Confirmado',
  },
  {
    id: 3,
    user: 'Pedro Costa',
    property: 'Sala Comercial',
    date: '2024-03-27',
    time: '16:00',
    type: 'Visita',
    status: 'Pendente',
  },
];

export default function SchedulesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSchedules = schedules.filter(schedule =>
    schedule.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    schedule.property.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Agendamentos</h1>

      <Card className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Search className="h-5 w-5 text-gray-400" />
          <Input
            placeholder="Pesquisar agendamentos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuário</TableHead>
                <TableHead>Imóvel</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Horário</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSchedules.map((schedule) => (
                <TableRow key={schedule.id}>
                  <TableCell>{schedule.user}</TableCell>
                  <TableCell>{schedule.property}</TableCell>
                  <TableCell>{new Date(schedule.date).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell>{schedule.time}</TableCell>
                  <TableCell>{schedule.type}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      schedule.status === 'Confirmado'
                        ? 'bg-green-100 text-green-800'
                        : schedule.status === 'Agendado'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {schedule.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}