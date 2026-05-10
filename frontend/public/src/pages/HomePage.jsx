import { useState } from 'react'
import searchIcon from '../assets/logo-search.png'
import clearSearchIcon from '../assets/logo-kembali-search.png'

function statusToClass(status) {
  const s = (status || '').toLowerCase()

  /* STATUS YANG TAMPIL DI RIWAYAT */
  if (s.includes('selesai')) return 'selesai'
  if (s.includes('ditolak')) return 'ditolak'
  if (s.includes('diterima')) return 'diterima'

  /* DEFAULT TAMPILAN USER */
  return 'diproses'
}

function HomePage({ greeting, stats = [], reports = [], onDeleteReport }) {
  const [search, setSearch] = useState('')
  const [openDetail, setOpenDetail] = useState(null)

  /* 
    FIX BESAR:
    - laporan baru TANPA status = Diproses
    - "Diterima" hanya muncul kalau admin benar-benar ubah
  */
  const normalizedReports = reports.map((report) => ({
    ...report,
    status:
      report.status && report.status.trim() !== ''
        ? report.status
        : 'Diproses',
  }))

  const filteredReports = normalizedReports.filter((r) => {
    const keyword = search.trim().toLowerCase()

    return (
      (r.title || '').toLowerCase().includes(keyword) ||
      (r.status || '').toLowerCase().includes(keyword) ||
      (r.place || '').toLowerCase().includes(keyword) ||
      (r.date || '').toLowerCase().includes(keyword)
    )
  })

  const clearSearch = () => {
    setSearch('')
  }

  return (
    <section className="public-screen">
      <header className="public-home-header">
        <div>
          <h2>{greeting}</h2>
        </div>
      </header>

      <div className="dashboard__stats">
        {stats.map((item) => (
          <article key={item.label} className="dashboard__stat-card">
            <p className="dashboard__stat-label">{item.label}</p>
            <p className="dashboard__stat-value">{item.value ?? 0}</p>
          </article>
        ))}
      </div>

      {/* HEADER RIWAYAT + SEARCH */}
      <div className="report-header-card">
        <div className="report-header-card__title">
          <h3>Riwayat Laporan</h3>
        </div>

        <div className="report-header-card__search">
          <img
            src={searchIcon}
            alt="Cari"
            className="report-search-icon"
          />

          <input
            type="search"
            placeholder="Cari laporan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {search && (
            <button
              type="button"
              className="report-search-clear"
              onClick={clearSearch}
            >
              <img
                src={clearSearchIcon}
                alt="Hapus pencarian"
                className="report-clear-icon"
              />
            </button>
          )}
        </div>
      </div>

      {/* LIST LAPORAN */}
      <div className="report-list">
        {filteredReports.length > 0 ? (
          filteredReports.map((r) => (
            <article key={r.id} className="card report">
              <div className="report-card__row">
                <div>
                  <strong>{r.title}</strong>
                  <p>
                    {r.place || 'Belum ada lokasi'} •{' '}
                    {r.date || 'Belum ada tanggal'}
                  </p>
                </div>

                <span className={`status-pill ${statusToClass(r.status)}`}>
                  {r.status}
                </span>
              </div>

              <div className="report-card__actions">
                <button
                  type="button"
                  onClick={() =>
                    setOpenDetail(openDetail === r.id ? null : r.id)
                  }
                >
                  {openDetail === r.id ? 'Tutup detail' : 'Detail'}
                </button>

                <button
                  type="button"
                  className="report-card__delete"
                  onClick={() => onDeleteReport(r.id)}
                >
                  Hapus
                </button>
              </div>

              {openDetail === r.id && (
                <div className="report-detail-inline">
                  <p>
                    <strong>Alamat:</strong> {r.place || '—'}
                  </p>

                  <p>
                    <strong>Tanggal:</strong> {r.date || '—'}
                  </p>

                  <p>
                    <strong>Status:</strong> {r.status || 'Diproses'}
                  </p>

                  {r.description ? (
                    <p>
                      <strong>Detail:</strong> {r.description}
                    </p>
                  ) : (
                    <p style={{ opacity: 0.75 }}>
                      Belum ada detail laporan
                    </p>
                  )}
                </div>
              )}
            </article>
          ))
        ) : (
          <p className="report-empty">
            Belum ada laporan yang cocok dengan pencarian.
          </p>
        )}
      </div>
    </section>
  )
}

export default HomePage