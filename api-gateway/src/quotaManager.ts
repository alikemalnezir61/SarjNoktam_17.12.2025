// API throttling ve quota yönetimi için temel altyapı
const userQuota: Record<string, number> = {};
const MAX_QUOTA = 1000;

export const quotaManager = (req: any, res: any, next: any) => {
  const userId = req.headers['x-user-id'];
  if (!userId) return next();
  userQuota[userId] = (userQuota[userId] || 0) + 1;
  if (userQuota[userId] > MAX_QUOTA) {
    return res.status(429).json({ error: 'Quota exceeded' });
  }
  next();
};
