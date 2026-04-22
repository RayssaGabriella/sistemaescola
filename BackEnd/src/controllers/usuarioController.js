import conexao from "../config/db.js";
import bcrypt from "bcryptjs";

export const listarUsuarios = async (req, res)=>{
    let conn;

    try{
        conn = await conexao.getConnection();

        const [usuarios] = await conn.query(`
            SELECT id, nome, email, perfil, criado_em FROM usuarios`)
            res.json(usuarios)
    } catch (error){
        res.status(500).json({msg:"Erro ao listar usuarios", erro: error.message})
    }finally{
        if(conn) conn.release();
    }
}