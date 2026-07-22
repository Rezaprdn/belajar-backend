const express = require ('express')
const bcrypt = require ('bcrypt')
const jwt = require ('jsonwebtoken')
const pool = require('../../db')

const router = express.Router()

//register
router.post('/register', async function(req, res){
    try {
        const {username, password, role} = req.body
        //hash password
        const hashedPassword = await bcrypt.hash(password, 10)
        // Terus kirim hashedPassword, bukan password 
        const result = await pool.query(
             'INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING *',
             [username, hashedPassword, role])
            // Tambah ini SEBELUM query INSERT
            return res.status(201).json({ pesan: 'Register berhasil' })
        }catch(err){
            console.error('Register error:', err)
            res.status(500).json({ pesan: 'Gagal registrasi' })
    }
})

router.post('/login', async function(req, res){
    try{
        const {username, password} =req.body
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username])
        const user = result.rows[0]
        if (!user) {
            return res.status(401).json({ pesan: 'Username tidak ditemukan' })
        }
        const valid = await bcrypt.compare(password, user.password)
        if(!valid){
            return res.status(401).json({pesan : 'username atau password tidak sesuai'})
        }
        const token = jwt.sign({ id: user.id, role: user.role }, 'SECRET_KEY', { expiresIn: '1d' })
        return res.status(200).json({pesan : 'login berhasil',
                                     token : token
        })
        // authorisation
        }catch{
            return res.status(500).json({pesan : 'terjadi masalah dengan internal server'})
        }
})
module.exports = router
