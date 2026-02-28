// Проста перевірка секретного ключа в заголовку
module.exports = (req, res, next) => {
  const adminToken = req.headers['x-admin-token'];
  if (adminToken === process.env.ADMIN_SECRET) {
    next();
  } else {
    res.status(403).json({ error: 'Доступ заборонено' });
  }
};