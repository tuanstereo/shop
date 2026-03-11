'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:4000';

type User = {
  id: number;
  name: string;
  email: string;
};

export default function HomePage() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>(`${apiBaseUrl}/api/users`);
        setUsers(response.data);
      } catch {
        setError('Không gọi được nhưng buil deploy được rồi');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <main>
      <section className="card">
        <h1 className="title">Next.js 16 + NestJS</h1>
        <p className="desc">Danh sách users từ backend:</p>
        {loading && <p>Đang tải users...</p>}
        {!loading && users.length === 0 && !error && <p>Chưa có users.</p>}
        {!loading && users.length > 0 && (
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.id}. {user.name} - {user.email}
              </li>
            ))}
          </ul>
        )}
        {error && <p>{error}</p>}
      </section>
    </main>
  );
}
