import { useState } from 'react'
import backIcon from '../assets/logo-kembali.png'

const initialForm = {
  reporterName: '',
  phone: '+62',
  category: '',
  address: '',
  title: '',
  description: '',
  file: null,
  filePreview: '',
}

function ReportPage({ onSubmit, onBack }) {
  const [form, setForm] = useState(initialForm)

  const isComplete =
    form.reporterName.trim() &&
    form.phone.trim().length > 3 &&
    form.category.trim() &&
    form.address.trim() &&
    form.title.trim() &&
    form.description.trim() &&
    form.file

  /* NOMOR TELEPON WAJIB +62 */
  const handlePhoneChange = (e) => {
    let value = e.target.value

    /* Hapus semua selain angka */
    value = value.replace(/[^\d]/g, '')

    /* Paksa selalu diawali 62 */
    if (!value.startsWith('62')) {
      value = `62${value.replace(/^0+/, '')}`
    }

    setForm({
      ...form,
      phone: `+${value}`,
    })
  }

  /* FILE */
  const handleFile = (e) => {
    const file = e.target.files?.[0]

    if (!file) return

    const reader = new FileReader()

    reader.onload = () => {
      setForm((prev) => ({
        ...prev,
        file,
        filePreview: reader.result,
      }))
    }

    reader.readAsDataURL(file)
  }

  /* SUBMIT */
  const handleSubmit = (event) => {
    event.preventDefault()

    if (!isComplete) {
      alert('Semua data laporan wajib diisi.')
      return
    }

    onSubmit({
      reporterName: form.reporterName,
      phone: form.phone,
      category: form.category,
      title: form.title,
      place: form.address,
      description: form.description,
      image: form.filePreview,
      status: 'Diterima',
    })

    /* ALERT BIASA */
    alert('Laporan berhasil dikirim dan masuk tahap Diterima.')

    /* RESET FORM */
    setForm(initialForm)

    /* KEMBALI KE HOME */
    onBack()
  }

  return (
    <form className="public-screen" onSubmit={handleSubmit}>
      <div className="top-row">
        <button
          className="icon-btn icon-btn--image"
          type="button"
          onClick={onBack}
          aria-label="Kembali"
        >
          <img
            src={backIcon}
            alt="Kembali"
            className="back-icon-img"
          />
        </button>

        <h2>Buat Laporan</h2>
      </div>

      <div className="report-table">
        <div className="table-row">
          <label htmlFor="reporterName">Nama Pelapor</label>
          <input
            id="reporterName"
            className="field"
            value={form.reporterName}
            onChange={(e) =>
              setForm({
                ...form,
                reporterName: e.target.value,
              })
            }
            required
          />
        </div>

        <div className="table-row">
          <label htmlFor="phone">Nomor Telepon</label>
          <input
            id="phone"
            className="field"
            type="text"
            inputMode="numeric"
            placeholder="+628123456789"
            value={form.phone}
            onChange={handlePhoneChange}
            maxLength={16}
            required
          />
        </div>

        <div className="table-row">
          <label htmlFor="address">Alamat Lengkap</label>
          <input
            id="address"
            className="field"
            value={form.address}
            onChange={(e) =>
              setForm({
                ...form,
                address: e.target.value,
              })
            }
            required
          />
        </div>

        <div className="table-row">
          <label htmlFor="title">Judul Laporan</label>
          <input
            id="title"
            className="field"
            value={form.title}
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value,
              })
            }
            required
          />
        </div>

        <div className="table-row">
          <label htmlFor="category">Kategori</label>
          <select
            id="category"
            className="field"
            value={form.category}
            onChange={(e) =>
              setForm({
                ...form,
                category: e.target.value,
              })
            }
            required
          >
            <option value="">Pilih kategori</option>
            <option value="Infrastruktur">Infrastruktur</option>
            <option value="Kebersihan">Kebersihan</option>
            <option value="Keamanan">Keamanan</option>
            <option value="Layanan Publik">Layanan Publik</option>
            <option value="Lainnya">Lainnya</option>
          </select>
        </div>

        <div className="table-row textarea-row">
          <label htmlFor="description">Deskripsi</label>
          <textarea
            id="description"
            className="field area"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
            required
          />
        </div>

        <div className="table-row">
          <label htmlFor="doc">Dokumentasi</label>
          <input
            id="doc"
            type="file"
            accept="image/*"
            onChange={handleFile}
            required
          />
        </div>
      </div>

      {form.filePreview && (
        <div style={{ marginBottom: '1rem' }}>
          <img
            src={form.filePreview}
            alt="Pratinjau lampiran"
            style={{
              width: '100%',
              maxHeight: '240px',
              objectFit: 'cover',
              borderRadius: 'var(--aduin-radius)',
            }}
          />
        </div>
      )}

      <button
        className="btn primary full"
        type="submit"
        disabled={!isComplete}
      >
        Kirim Laporan
      </button>
    </form>
  )
}

export default ReportPage