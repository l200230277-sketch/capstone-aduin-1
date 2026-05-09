import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useReports } from '../context/ReportsContext.jsx'
import { REPORT_CATEGORIES } from '../data/categories.js'
import * as XLSX from 'xlsx'
import '../App.css'

function IconSearch() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <circle
        cx="11"
        cy="11"
        r="7"
        stroke="currentColor"
        strokeWidth="2"
      />

      <path
        d="M20 20l-3-3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function Dashboard() {
  const { reports, stats } = useReports()

  const [query, setQuery] = useState('')
  const [kategori, setKategori] = useState('')
  const [filterOpen, setFilterOpen] =
    useState(false)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()

    return reports.filter((r) => {
      if (
        kategori &&
        r.kategori !== kategori
      )
        return false

      if (!q) return true

      return (
        r.judul
          .toLowerCase()
          .includes(q) ||
        r.alamat
          .toLowerCase()
          .includes(q) ||
        r.pelapor
          .toLowerCase()
          .includes(q) ||
        r.kategori
          .toLowerCase()
          .includes(q)
      )
    })
  }, [reports, query, kategori])

  // DOWNLOAD EXCEL
  function handleDownloadExcel() {
    const data = filtered.map((r) => ({
      Tanggal: r.tanggalLabel,
      Pelapor: r.pelapor,
      Judul: r.judul,
      Kategori: r.kategori,
      Status: r.status,
    }))

    const worksheet =
      XLSX.utils.json_to_sheet(data)

    const workbook =
      XLSX.utils.book_new()

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      'Laporan'
    )

    XLSX.writeFile(
      workbook,
      `data-laporan-${Date.now()}.xlsx`
    )
  }

  // HAPUS DATA
  function handleDelete(id) {
  const confirmDelete =
    window.confirm(
      'Yakin ingin menghapus laporan ini?'
    )

  if (!confirmDelete) return

  // TAMBAHAN (INI KUNCI NYA 🔥)
  deleteReport(id)

  // kode lama (biarin aja sesuai permintaan kamu)
  const allReports =
    JSON.parse(
      localStorage.getItem('reports')
    ) || []

  const updatedReports =
    allReports.filter(
      (item) => item.id !== id
    )

  localStorage.setItem(
    'reports',
    JSON.stringify(updatedReports)
  )

  window.location.reload()
}

  return (
    <div className="dashboard">
      {/* STATISTIK */}
      <section
        className="dashboard__stats"
        aria-label="Ringkasan laporan"
      >
        <article className="dashboard__stat-card">
          <p className="dashboard__stat-label">
            Total Laporan
          </p>

          <p className="dashboard__stat-value">
            {stats.total}
          </p>
        </article>

        <article className="dashboard__stat-card">
          <p className="dashboard__stat-label">
            Diproses
          </p>

          <p className="dashboard__stat-value">
            {stats.diproses}
          </p>
        </article>

        <article className="dashboard__stat-card">
          <p className="dashboard__stat-label">
            Selesai
          </p>

          <p className="dashboard__stat-value">
            {stats.selesai}
          </p>
        </article>

        <article className="dashboard__stat-card">
          <p className="dashboard__stat-label">
            Ditolak
          </p>

          <p className="dashboard__stat-value">
            {stats.ditolak}
          </p>
        </article>
      </section>

      {/* TITLE */}
      <div className="dashboard__section-title">
        Data Laporan
      </div>

      {/* TOOLBAR */}
      <div className="dashboard__toolbar">
        <label className="dashboard__search">
          <span className="visually-hidden">
            Cari laporan
          </span>

          <span
            className="dashboard__search-icon"
            aria-hidden
          >
            <IconSearch />
          </span>

          <input
            type="search"
            className="aduin-input dashboard__search-input"
            placeholder="Cari judul, alamat, pelapor, atau kategori…"
            value={query}
            onChange={(e) =>
              setQuery(e.target.value)
            }
            autoComplete="off"
          />
        </label>

        {/* FILTER */}
        <button
          type="button"
          className="aduin-btn aduin-btn--primary dashboard__filter-btn"
          onClick={() =>
            setFilterOpen((v) => !v)
          }
          aria-expanded={filterOpen}
        >
          Filter
        </button>

        {/* DOWNLOAD */}
        <button
          type="button"
          className="aduin-btn aduin-btn--primary dashboard__filter-btn"
          onClick={handleDownloadExcel}
        >
          Unduh File
        </button>
      </div>

      {/* FILTER PANEL */}
      {filterOpen ? (
        <div
          className="dashboard__filter-panel"
          role="region"
          aria-label="Filter kategori"
        >
          <label className="dashboard__filter-field">
            <span>Kategori</span>

            <select
              className="aduin-input dashboard__select"
              value={kategori}
              onChange={(e) =>
                setKategori(
                  e.target.value
                )
              }
            >
              <option value="">
                Semua kategori
              </option>

              {REPORT_CATEGORIES.map(
                (c) => (
                  <option
                    key={c}
                    value={c}
                  >
                    {c}
                  </option>
                )
              )}
            </select>
          </label>

          {kategori ? (
            <button
              type="button"
              className="aduin-link dashboard__filter-clear"
              onClick={() =>
                setKategori('')
              }
            >
              Hapus filter kategori
            </button>
          ) : null}
        </div>
      ) : null}

      {/* TABLE */}
      <div
        className="dashboard__table-wrap"
        role="region"
        aria-label="Daftar laporan"
      >
        <table className="dashboard__table">
          <thead>
            <tr>
              <th scope="col">
                Laporan
              </th>

              <th
                scope="col"
                className="dashboard__th-cat"
              >
                Kategori
              </th>

              <th
                scope="col"
                className="dashboard__th-status"
              >
                Status
              </th>

              {/* AKSI */}
              <th scope="col">
                Keterangan
              </th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((r) => (
              <tr key={r.id}>
                {/* LAPORAN */}
                <td>
                  <div className="dashboard__cell-main">
                    <span className="dashboard__date">
                      {r.tanggalLabel}
                    </span>

                    <span className="dashboard__name">
                      {r.pelapor}
                    </span>

                    <span className="dashboard__title">
                      {r.judul}
                    </span>

                    <span className="dashboard__cat-mobile">
                      {r.kategori}
                    </span>

                    <Link
                      to={`/laporan/${r.id}`}
                      className="dashboard__detail-link"
                    >
                      Detail
                      Laporan…
                    </Link>
                  </div>
                </td>

                {/* KATEGORI */}
                <td className="dashboard__td-cat">
                  {r.kategori}
                </td>

                {/* STATUS */}
                <td className="dashboard__td-status">
                  <span
                    className={`dashboard__badge dashboard__badge--${badgeKind(
                      r.status
                    )}`}
                  >
                    {r.status}
                  </span>
                </td>

                {/* HAPUS */}
                <td>
                  <button
                    type="button"
                    className="dashboard__delete-btn"
                    onClick={() =>
                      handleDelete(
                        r.id
                      )
                    }
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* EMPTY */}
      {filtered.length === 0 ? (
        <p className="dashboard__empty">
          Tidak ada laporan yang cocok
        </p>
      ) : null}
    </div>
  )
}

function badgeKind(status) {
  switch (status) {
    case 'Selesai':
      return 'ok'

    case 'Ditolak':
      return 'bad'

    case 'Diproses':
      return 'progress'

    default:
      return 'new'
  }
}