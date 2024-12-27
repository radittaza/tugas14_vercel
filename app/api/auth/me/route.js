import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET; // Pastikan JWT_SECRET sudah diatur di file .env

export async function GET(req) {
  const authHeader = req.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verifikasi token
    const decoded = verify(token, JWT_SECRET);

    // Data user (contoh hardcoded, sesuaikan dengan database Anda)
    const user = {
      id: decoded.userId,
      username: 'testuser', // Ganti dengan data yang sesuai dari database Anda
      email: decoded.email,
    };

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ message: 'Invalid token' }), { status: 401 });
  }
}
