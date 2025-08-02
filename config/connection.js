import { Sequelize } from 'sequelize';
// Conexión a MySQL
const sequelize = new Sequelize('app', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306, // Cambia a 3307 si usas XAMPP con MySQL en otro puerto
  logging: false, // Desactiva logs en consola (opcional)
});
export default sequelize;