import 'dotenv/config'; // Forma recomendada en TS para reemplazar require('dotenv').config()
import app from './src/app';

const PORT = process.env.PORT || 3560;

app.listen(PORT, () => {
  console.log(`🚀 Servidor ControlLabs corriendo en http://localhost:${PORT}`);
});