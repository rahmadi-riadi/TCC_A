import { Sequelize } from "sequelize";

const db = new Sequelize ('hrd','root','',(
    host :'localhost',
    dialect: 'mysql'
))

export default db;
    
