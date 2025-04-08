'use client';

import { useState } from 'react';

type Reserva = {
  id: string;
  quadra: number;
  horario: string;
  nome: string;
  adversario: string;
  classe: string;
  senha: string;
};

const horarios = [
  '10:00', '11:30', '13:00', '14:30', '16:00', '17:30', '19:00', '20:30'
];

const diasValidos = ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function Home() {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [novaReserva, setNovaReserva] = useState<Partial<Reserva>>({});

  const reservar = () => {
    if (!novaReserva.nome || !novaReserva.adversario || !novaReserva.classe || !novaReserva.horario || !novaReserva.quadra || !novaReserva.senha) {
      alert("Preencha todos os campos!");
      return;
    }

    const nova: Reserva = {
      ...(novaReserva as Reserva),
      id: Date.now().toString()
    };

    setReservas([...reservas, nova]);
    setNovaReserva({});
  };

  const cancelar = (id: string, senha: string) => {
    const reserva = reservas.find(r => r.id === id);
    if (reserva?.senha === senha) {
      setReservas(reservas.filter(r => r.id !== id));
    } else {
      alert("Senha incorreta!");
    }
  };

  return (
    <main className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🏸 Reservas de Quadra</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[1, 2, 3].map((quadra) => (
          <div key={quadra} className="border rounded-xl p-4 shadow">
            <h2 className="font-semibold mb-2">Quadra {quadra}</h2>
            {horarios.map((hora) => {
              const reserva = reservas.find(r => r.quadra === quadra && r.horario === hora);
              return (
                <div key={hora} className="mb-2">
                  <div className="flex justify-between items-center text-sm">
                    <span>{hora}</span>
                    {reserva ? (
                      <div className="flex flex-col text-xs">
                        <span>{reserva.nome} vs {reserva.adversario}</span>
                        <span>Classe {reserva.classe}</span>
                        <input
                          placeholder="Senha para cancelar"
                          type="password"
                          className="border rounded px-2 text-xs"
                          onBlur={(e) => cancelar(reserva.id, e.target.value)}
                        />
                      </div>
                    ) : (
                      <button
                        className="text-blue-500 underline text-xs"
                        onClick={() => setNovaReserva({ ...novaReserva, quadra, horario: hora })}
                      >
                        Reservar
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {novaReserva.quadra && novaReserva.horario && (
        <div className="border-t pt-4">
          <h2 className="font-semibold mb-2">Nova Reserva</h2>
          <input placeholder="Seu nome" className="block mb-2 border px-2 py-1 rounded w-full" value={novaReserva.nome || ''} onChange={(e) => setNovaReserva({ ...novaReserva, nome: e.target.value })} />
          <input placeholder="Adversário" className="block mb-2 border px-2 py-1 rounded w-full" value={novaReserva.adversario || ''} onChange={(e) => setNovaReserva({ ...novaReserva, adversario: e.target.value })} />
          <input placeholder="Classe (A, B, C...)" className="block mb-2 border px-2 py-1 rounded w-full" value={novaReserva.classe || ''} onChange={(e) => setNovaReserva({ ...novaReserva, classe: e.target.value })} />
          <input placeholder="Senha para cancelamento" type="password" className="block mb-4 border px-2 py-1 rounded w-full" value={novaReserva.senha || ''} onChange={(e) => setNovaReserva({ ...novaReserva, senha: e.target.value })} />
          <button onClick={reservar} className="bg-blue-600 text-white px-4 py-2 rounded">Confirmar Reserva</button>
        </div>
      )}
    </main>
  );
}