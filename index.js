const express = require('express')
const app = express()
app.use(express.json())

 const produk = [
        { id: 1, nama: "Baut M8", stok: 500, harga: 2500 },
        { id: 2, nama: "Mur M8", stok: 80, harga: 1500 },
        { id: 3, nama: "Ring M8", stok: 0, harga: 800 },
    ]
app.get('/produk', function(req, res) {
    res.json(produk)
})

app.get('/produk/:id', function(req, res) {
   
    const produkId = req.params.id
    const produkDetail = produk.find(p => p.id == produkId)
    if(!produkDetail){
        return res.status(404).json({message : "produk tidak ditemukan"})
    }
    res.json(produkDetail)
})
app.post('/produk', function(req, res) {
    const produkBaru = req.body
    // tambah ke array
    produk.push(produkBaru)
    // kirim response
    res.status(201).json(produkBaru)
})
app.listen(3000, function() {
    console.log('Server jalan di http://localhost:3000')
})