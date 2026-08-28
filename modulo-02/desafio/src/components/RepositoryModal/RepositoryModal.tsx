import { useEffect } from 'react'
import type { MouseEvent } from 'react'
import type { GitHubRepository } from '../../types/github'
import styles from './RepositoryModal.module.css'

type RepositoryModalProps = {
  repository: GitHubRepository | null
  onClose: () => void
}

export function RepositoryModal({ repository, onClose }: RepositoryModalProps) {
  useEffect(() => {
    if (!repository) {
      return
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose, repository])

  function handleBackdropClick(event: MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  if (!repository) {
    return null
  }

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="repository-title"
        className={styles.dialog}
      >
        <button className={styles.closeButton} type="button" onClick={onClose} aria-label="Close">
          ×
        </button>
        <p className={styles.eyebrow}>Repository details</p>
        <h2 className={styles.title} id="repository-title">{repository.name}</h2>
        <dl className={styles.details}>
          <div><dt>Visibility</dt><dd>{repository.visibility}</dd></div>
          <div><dt>Language</dt><dd>{repository.language ?? 'Language not provided'}</dd></div>
          <div><dt>Description</dt><dd>{repository.description ?? 'Description not provided'}</dd></div>
        </dl>
        <a className={styles.link} href={repository.html_url} target="_blank" rel="noreferrer">
          Open repository
        </a>
      </section>
    </div>
  )
}
