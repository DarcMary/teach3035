import { useEffect, useRef } from 'react'
import type { MouseEvent } from 'react'
import type { GitHubRepository } from '../../types/github'
import closeArtwork from '../../assets/repository-modal-close.svg'
import styles from './RepositoryModal.module.css'

type RepositoryModalProps = {
  repository: GitHubRepository | null
  onClose: () => void
}

export function RepositoryModal({ repository, onClose }: RepositoryModalProps) {
  const dialogRef = useRef<HTMLElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!repository) {
      return
    }

    previousFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null

    const focusableElements = () =>
      Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      )

    const closeButton = dialogRef.current?.querySelector<HTMLElement>(
      '[data-close-button]',
    )
    closeButton?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (event.key === 'Tab') {
        const elements = focusableElements()
        const firstElement = elements[0]
        const lastElement = elements.at(-1)

        if (!firstElement || !lastElement) {
          event.preventDefault()
          dialogRef.current?.focus()
        } else if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault()
          lastElement.focus()
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault()
          firstElement.focus()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      previousFocusRef.current?.focus()
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
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={repository.name}
        className={styles.dialog}
        tabIndex={-1}
      >
        <button className={styles.closeButton} type="button" onClick={onClose} aria-label="Fechar" data-close-button>
          <img src={closeArtwork} alt="" />
        </button>
        <h2 className={styles.heading}>Especificações</h2>
        <h3 className={styles.title}>{repository.name}</h3>
        <dl className={styles.details}>
          <div><dt>Link</dt><dd><a href={repository.html_url} target="_blank" rel="noreferrer" aria-label="Abrir repositório">{repository.html_url}</a></dd></div>
          <div><dt>Privacidade</dt><dd>{repository.visibility}</dd></div>
          <div><dt>Linguagem</dt><dd>{repository.language ?? 'Linguagem não informada'}</dd></div>
          <div><dt>Descrição</dt><dd>{repository.description ?? 'Descrição não informada'}</dd></div>
        </dl>
      </section>
    </div>
  )
}
