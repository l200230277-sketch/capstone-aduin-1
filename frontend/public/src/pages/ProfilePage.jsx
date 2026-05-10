import { useState } from 'react'
import backIcon from '../assets/logo-kembali.png'
import defaultAvatar from '../assets/default-avatar.png'

function ProfilePage({
  user,
  onBack,
  onPhotoChange,
  onUpdateProfile,
}) {
  const [isEditing, setIsEditing] =
    useState(false)

  const [address, setAddress] =
    useState(user.address || '')

  const [phone, setPhone] =
    useState(
      user.phone?.startsWith('+62')
        ? user.phone
        : '+62'
    )

  const [errorMessage, setErrorMessage] =
    useState('')

  const showError = (message) => {
    setErrorMessage(message)

    setTimeout(() => {
      setErrorMessage('')
    }, 3000)
  }

  const handlePhoneChange = (value) => {
    let cleaned =
      value.replace(/[^\d+]/g, '')

    /* WAJIB DIAWALI +62 */
    if (!cleaned.startsWith('+62')) {
      cleaned =
        '+62' +
        cleaned.replace(/^\+?62?/, '')
    }

    /* BATAS PANJANG */
    if (cleaned.length > 15) return

    setPhone(cleaned)
  }

  const handleSaveProfile = () => {
    if (!address.trim()) {
      showError('Alamat wajib diisi')
      return
    }

    if (
      phone.length < 11 ||
      !phone.startsWith('+62')
    ) {
      showError(
        'Nomor telepon harus diawali +62 dan valid'
      )
      return
    }

    if (onUpdateProfile) {
      onUpdateProfile({
        address: address.trim(),
        phone,
      })
    }

    setIsEditing(false)

    alert('Profil berhasil diperbarui!')
  }

  return (
    <section className="public-screen">
      {/* HEADER */}
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

        <h1 className="page-header-title">
          Profil
        </h1>
      </div>

      {/* ERROR POPUP */}
      {errorMessage && (
        <div className="popup-error">
          {errorMessage}
        </div>
      )}

      {/* FOTO + USER */}
      <div className="profile-header">
        <label className="avatar-wrapper">
          {user.photo ? (
            <img
              src={user.photo}
              alt="Foto Profil"
              className="profile-photo"
            />
          ) : (
            <div className="avatar">
              <img
                src={defaultAvatar}
                alt="Default Avatar"
                className="default-avatar-img"
              />
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            className="upload-photo-input"
            onChange={(event) => {
              const file =
                event.target.files?.[0]

              if (file && onPhotoChange) {
                onPhotoChange(
                  URL.createObjectURL(file)
                )
              }
            }}
          />
        </label>

        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>

      {/* CARD PROFIL */}
      <div className="compact-profile-card">
        <article className="profile-detail">
          <p>
            <strong>Nama Pengguna</strong>
            <span>{user.name}</span>
          </p>

          <p>
            <strong>Alamat</strong>

            {isEditing ? (
              <input
                type="text"
                className="profile-edit-input"
                value={address}
                onChange={(e) =>
                  setAddress(e.target.value)
                }
                placeholder="Masukkan alamat"
              />
            ) : (
              <span>
                {user.address ||
                  'Belum diisi'}
              </span>
            )}
          </p>

          <p>
            <strong>Nomor Telepon</strong>

            {isEditing ? (
              <input
                type="text"
                className="profile-edit-input"
                value={phone}
                onChange={(e) =>
                  handlePhoneChange(
                    e.target.value
                  )
                }
                placeholder="+628123456789"
              />
            ) : (
              <span>
                {user.phone ||
                  'Belum diisi'}
              </span>
            )}
          </p>

          <p>
            <strong>Status</strong>
            <span>
              {user.role || 'Pelapor'}
            </span>
          </p>
        </article>

        {/* BUTTON */}
        {isEditing ? (
          <button
            type="button"
            className="profile-save-btn"
            onClick={handleSaveProfile}
          >
            Simpan Profil
          </button>
        ) : (
          <button
            type="button"
            className="profile-save-btn"
            onClick={() =>
              setIsEditing(true)
            }
          >
            Edit Profil
          </button>
        )}
      </div>
    </section>
  )
}

export default ProfilePage