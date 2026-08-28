import { useEffect } from 'react'
import type { MouseEvent } from 'react'
import type { GitHubRepository } from '../../types/github'

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
    <div onClick={handleBackdropClick}>
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="repository-title"
      >
        <button type="button" onClick={onClose} aria-label="Close">
          Close
        </button>
        <h2 id="repository-title">{repository.name}</h2>
        <p>{repository.visibility}</p>
        <p>{repository.description ?? 'Description not provided'}</p>
        <p>{repository.language ?? 'Language not provided'}</p>
        <a href={repository.html_url} target="_blank" rel="noreferrer">
          Open repository
        </a>
      </section>
    </div>
  )
}
