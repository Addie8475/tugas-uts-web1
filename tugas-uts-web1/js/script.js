document.addEventListener('DOMContentLoaded', function() {
  if (document.querySelector('#tblKatalog')) {
    setupStokPage();
  }
});

function setupStokPage() {
  const tbody = document.querySelector('#tblKatalog tbody');

  function render(){
    tbody.innerHTML = '';
    dataKatalogBuku.forEach((b, idx)=>{
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><img src="${b.cover||'img/placeholder.png'}" class="cover-thumb" onerror="this.src='img/placeholder.png'"></td>
        <td>${b.kodeBarang||''}</td>
        <td>${b.namaBarang||''}</td>
        <td>${b.jenisBarang||''}</td>
        <td>${b.edisi||''}</td>
        <td><input type="number" value="${b.stok||0}" data-idx="${idx}" class="input" style="width:90px"></td>
        <td>${b.harga||''}</td>
      `;
      tbody.appendChild(tr);
    });

    // attach onchange untuk stok
    document.querySelectorAll('input[data-idx]').forEach(inp=>{
      inp.onchange = (e)=>{
        const i = +e.target.dataset.idx;
        const val = parseInt(e.target.value) || 0;
        dataKatalogBuku[i].stok = val;
        alert('Stok diperbarui.');
      }
    });
  }

  render();


  const inpHarga = document.getElementById('inpHarga');
  inpHarga.addEventListener('input', (e) => {
    let value = e.target.value;
    // Hapus semua karakter kecuali angka
    let number_string = value.replace(/[^,\d]/g, '').toString();
    if(number_string.length === 0) {
      e.target.value = '';
      return;
    }
    // Format dengan pemisah ribuan
    let formatted = 'Rp ' + parseInt(number_string, 10).toLocaleString('id-ID');
    e.target.value = formatted;
  });

  // Tambah baris baru menggunakan DOM (menambah pada array dataKatalogBuku)
  document.getElementById('btnTambah').onclick = ()=>{
    const kode = document.getElementById('inpKode').value.trim();
    const nama = document.getElementById('inpNama').value.trim();
    if(!kode || !nama){ alert('Kode & nama harus diisi'); return; }
    const jenis = document.getElementById('inpJenis').value.trim() || 'Buku';
    const edisi = document.getElementById('inpEdisi').value.trim() || '1';
    const stok = parseInt(document.getElementById('inpStok').value) || 0;
    const harga = document.getElementById('inpHarga').value.trim() || 'Rp 0';
    const coverInput = document.getElementById('inpCover');
    let cover = 'img/placeholder.png';
    if (coverInput.files && coverInput.files[0]) {
      cover = URL.createObjectURL(coverInput.files[0]);
    }
    const newItem = { kodeBarang: kode, namaBarang: nama, jenisBarang: jenis, edisi: edisi, stok: stok, harga: harga, cover: cover };
    dataKatalogBuku.push(newItem);
    render();
    // reset form
    ['inpKode','inpNama','inpJenis','inpEdisi','inpStok','inpHarga','inpCover'].forEach(id=>document.getElementById(id).value='');
  }
}