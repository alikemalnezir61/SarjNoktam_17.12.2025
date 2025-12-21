import express from 'express';
const router = express.Router();

// Gizlilik politikası endpointi
const privacyPolicy = `
Kullanıcı verileriniz KVKK ve GDPR kapsamında korunmaktadır. 
Verileriniz sadece açık rızanız ile işlenir ve paylaşılır. 
Dilediğiniz zaman verilerinizi silebilir veya anonimleştirebilirsiniz. 
Daha fazla bilgi için destek ekibimize ulaşabilirsiniz.`;

router.get('/privacy-policy', (req, res) => {
  res.type('text').send(privacyPolicy);
});

export default router;
