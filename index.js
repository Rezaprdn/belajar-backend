const express = require('express')
const pool = require('./db')
const app = express()

app.use(express.json())

app.get('/produk', async function(req, res) {
    try {
        const result = await pool.query('SELECT * FROM produk')
        res.json(result.rows)
    } catch (error) {
        res.status(500).json({ pesan: 'Gagal ambil data' })
    }
})

app.get('/produk/:id', async function (req, res){
    try{
        const id = req.params.id  // ambil ID dari URL dulu
        const result = await pool.query('SELECT * FROM produk WHERE id = $1', [id])
         if (result.rows.length === 0) {
            return res.status(404).json({ pesan: 'Produk tidak ditemukan' })
        }
        res.json(result.rows[0])
    }
    catch(err){
        res.status(404).json({ pesan: 'produk tidak ditemukan' })
    }
})

app.post('/produk', async function(req, res) {
    try {
        const { nama, stok, harga } = req.body
        const result = await pool.query(
            'INSERT INTO produk (nama, stok, harga) VALUES ($1, $2, $3) RETURNING *',
            [nama, stok, harga]
        )
        res.status(201).json(result.rows[0])
        res.json(result.rows[0])
    } catch (err) {
      res.status(500).json({ pesan: 'Gagal tambah data' })
    }
})

app.put('/produk/:id', async function (req, res) {
        try{
            const id = req.params.id
            const {nama, stok, harga} = req.body
            const results = await pool.query('UPDATE produk SET nama = $1, stok = $2, harga = $3 WHERE id = $4 RETURNING *'
            ,[nama, stok, harga, id])
            res.json(results.rows[0])
        }catch(err) {
            res.status(500).json({pesan : 'gagal mengUpdate data'})
        }
    })
app.delete('/produk/:id', async function(req, res){
    try{
        const id = req.params.id
        const hasil = await pool.query('DELETE FROM produk WHERE id = $1 RETURNING *',[id])
        res.json(hasil.rows[0])
    }catch(err){
        res.status(500).json({pesan:'gagal menghapus data'})
    }
})

app.listen(3000, function() {
    console.log('Server jalan di http://localhost:3000')
})
// app.get('/produk/:id', function(req, res) {
   
//     const produkId = req.params.id
//     const produkDetail = produk.find(p => p.id == produkId)
//     if(!produkDetail){
//         return res.status(404).json({message : "produk tidak ditemukan"})
//     }
//     res.json(produkDetail)
// })
// app.post('/produk', function(req, res) {
//     const produkBaru = req.body
//     // tambah ke array
//     produk.push(produkBaru)
//     // kirim response
//     res.status(201).json(produkBaru)
// })
// app.listen(3000, function() {
//     console.log('Server jalan di http://localhost:3000')
// })