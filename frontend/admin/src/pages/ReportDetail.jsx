import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useReports } from '../context/ReportsContext.jsx'
import { REPORT_CATEGORIES } from '../data/categories.js'
import { REPORT_STATUSES } from '../data/statuses.js'
import '../App.css'

export default function ReportDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getById, updateReport } = useReports()
  const report = getById(id)

  const [dialogOpen, setDialogOpen] = useState(false)
  const [draftStatus, setDraftStatus] = useState('')
  const [draftKategori, setDraftKategori] = useState('')

  useEffect(() => {
    if (!id || report) return
    navigate('/dashboard', { replace: true })
  }, [id, report, navigate])

  if (!report) {
    return null
  }

  function openDialog() {
    setDraftStatus(report.status)
    setDraftKategori(report.kategori)
    setDialogOpen(true)
  }

  function saveDialog() {
    updateReport(report.id, {
      status: draftStatus,
      kategori: draftKategori,
    })
    setDialogOpen(false)
  }

  return (
    <div className="report-detail">
      <div className="report-detail__pill">Detail Laporan</div>

      <article className="report-detail__card">
        <dl className="report-detail__list">
          <div className="report-detail__row">
            <dt>Pelapor</dt>
          <dd>{report.pelapor}</dd>
          </div>
          <div className="report-detail__row">
            <dt>Alamat</dt>
          <dd>{report.alamat}</dd>
          </div>
          <div className="report-detail__row">
            <dt>Tanggal</dt>
            <dd>{report.tanggalLabel}</dd>
          </div>
          <div className="report-detail__row">
            <dt>Judul</dt>
            <dd>{report.judul}</dd>
          </div>
          <div className="report-detail__row">
            <dt>Kategori</dt>
            <dd>{report.kategori}</dd>
          </div>
          <div className="report-detail__row report-detail__row--block">
            <dt>Deskripsi</dt>
            <dd>{report.deskripsi}</dd>
          </div>
          <div className="report-detail__row report-detail__row--block">
            <dt>Foto</dt>
            <dd className="report-detail__foto">{report.fotoLabel}</dd>
          </div>
          <div className="report-detail__row">
            <dt>Status</dt>
            <dd>{report.status}</dd>
          </div>
        </dl>

        <button type="button" className="aduin-btn aduin-btn--tan report-detail__btn" onClick={openDialog}>
          Ubah Status
        </button>
      </article>

      {dialogOpen ? (
        <div className="report-detail__backdrop" role="presentation">
          <button
            type="button"
            className="report-detail__backdrop-hit"
            aria-label="Tutup"
            onClick={() => setDialogOpen(false)}
          />
          <div
            className="report-detail__modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="report-detail-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="report-detail-modal-title" className="report-detail__modal-title">
              Ubah status &amp; kategori
            </h2>
            <label className="aduin-field">
              <span className="report-detail__label">Status</span>
              <select
                className="aduin-input report-detail__select"
                value={draftStatus}
                onChange={(e) => setDraftStatus(e.target.value)}
              >
                {REPORT_STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
            <label className="aduin-field">
              <span className="report-detail__label">Kategori</span>
              <select
                className="aduin-input report-detail__select"
                value={draftKategori}
                onChange={(e) => setDraftKategori(e.target.value)}
              >
                {REPORT_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
            <div className="report-detail__modal-actions">
              <button type="button" className="aduin-btn aduin-btn--tan" onClick={() => setDialogOpen(false)}>
                Batal
              </button>
              <button type="button" className="aduin-btn aduin-btn--primary" onClick={saveDialog}>
                Simpan
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
