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

const payments = [
  {
    id: 1,
    user: 'João Silva',
    property: 'Apartamento Moderno',
    amount: 'R$ 1.500,00',
    date: '2024-03-20',
    status: 'Confirmado',
  },
  {
    id: 2,
    user: 'Maria Santos',
    property: 'Casa com Jardim',
    amount: 'R$ 2.200,00',
    date: '2024-03-19',
    status: 'Pendente',
  },
  {
    id: 3,
    user: 'Pedro Costa',
    property: 'Sala Comercial',
    amount: 'R$ 3.000,00',
    date: '2024-03-18',
    status: 'Confirmado',
  },
];

export default function PaymentsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPayments = payments.filter(payment =>
    payment.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.property.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Pagamentos</h1>

      <Card className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Search className="h-5 w-5 text-gray-400" />
          <Input
            placeholder="Pesquisar pagamentos..."
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
                <TableHead>Valor</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell>{payment.user}</TableCell>
                  <TableCell>{payment.property}</TableCell>
                  <TableCell>{payment.amount}</TableCell>
                  <TableCell>{new Date(payment.date).toLocaleDateString('pt-BR')}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      payment.status === 'Confirmado'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {payment.status}
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