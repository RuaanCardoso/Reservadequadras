
'use client';
import { useState, useEffect } from 'react';

type Reserva = {
  nome: string;
  adversario: string;
  classe: string;
  senha: string;
};

const horarios = [
  '10:00', '11:30', '13:00', '14:30',
  '16:00', '17:30', '19:00', '20:30'
];

const quadras = ['Quadra 1', 'Quadra 2', 'Quadra 3'];

export default function Home() {
  const [data, setData] = useState(() => new Date().toISOString().split('T')[0]);
  const [reservas, setReservas] = useState<{ [key: string]: Reserva }>({});
  const [formularioAberto, setFormularioAberto] = useState<string | null>(null);
  const [formData, setFormData] = useState<Reserva>({ nome: '', adversario: '', classe: '', senha: '' });

  useEffect(() => {
    const stored = localStorage.getItem(data);
    if (stored) setReservas(JSON.parse(stored));
    else setReservas({});
  }, [data]);

  const salvarReserva = (chave: string) => {
    const novasReservas = { ...reservas, [chave]: formData };
    setReservas(novasReservas);
    localStorage.setItem(data, JSON.stringify(novasReservas));
    setFormularioAberto(null);
    setFormData({ nome: '', adversario: '', classe: '', senha: '' });
  };

  return (
    <main className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Reserva de Quadras</h1>
      <input
        type="date"
        value={data}
        onChange={(e) => setData(e.target.value)}
        className="mb-4 border p-2 rounded"
      />
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Horário</th>
            {quadras.map((quadra) => (
              <th key={quadra} className="border p-2">{quadra}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {horarios.map((hora) => (
            <tr key={hora}>
              <td className="border p-2">{hora}</td>
              {quadras.map((quadra) => {
                const chave = `${data}-${hora}-${quadra}`;
                const reserva = reservas[chave];
                const aberto = formularioAberto === chave;

                return (
                  <td key={quadra} className="border p-2 text-center">
                    {reserva ? (
                      <div>
                        <div className="font-semibold">{reserva.nome} x {reserva.adversario}</div>
                        <div className="text-sm text-gray-500">Classe {reserva.classe}</div>
                      </div>
                    ) : aberto ? (
                      <div className="space-y-1">
                        <input type="text" placeholder="Seu nome" className="border p-1 w-full text-sm"
                          value={formData.nome} onChange={(e) => setFormData({ ...formData, nome: e.target.value })} />
                        <input type="text" placeholder="Adversário" className="border p-1 w-full text-sm"
                          value={formData.adversario} onChange={(e) => setFormData({ ...formData, adversario: e.target.value })} />
                        <input type="text" placeholder="Classe (A, B, C...)" className="border p-1 w-full text-sm"
                          value={formData.classe} onChange={(e) => setFormData({ ...formData, classe: e.target.value })} />
                        <input type="password" placeholder="Senha" className="border p-1 w-full text-sm"
                          value={formData.senha} onChange={(e) => setFormData({ ...formData, senha: e.target.value })} />
                        <button className="bg-green-500 text-white px-2 py-1 rounded text-sm"
                          onClick={() => salvarReserva(chave)}>Confirmar</button>
                      </div>
                    ) : (
                      <button className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
                        onClick={() => setFormularioAberto(chave)}>Reservar</button>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
