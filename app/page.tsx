'use client';
import { useState } from 'react';

const horarios = [
  '10:00',
  '11:30',
  '13:00',
  '14:30',
  '16:00',
  '17:30',
  '19:00',
  '20:30',
];

const quadras = ['Quadra 1', 'Quadra 2', 'Quadra 3'];

export default function HomePage() {
  const [dataSelecionada, setDataSelecionada] = useState(() => new Date().toISOString().split('T')[0]);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Reservas de Quadra</h1>
      
      <div className="mb-4">
        <label className="mr-2 font-medium">Escolha a data:</label>
        <input
          type="date"
          value={dataSelecionada}
          onChange={(e) => setDataSelecionada(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      <table className="w-full border text-center">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Horário</th>
            {quadras.map((quadra) => (
              <th key={quadra} className="border p-2">{quadra}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {horarios.map((horario) => (
            <tr key={horario}>
              <td className="border p-2 font-semibold">{horario}</td>
              {quadras.map((quadra, index) => (
                <td key={index} className="border p-2">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
                    Reservar
                  </button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}