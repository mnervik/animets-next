import React, { useEffect, useState } from 'react'

import { Button, Card, Modal as MUIModal, Typography } from '@mui/material'

import { useKey } from 'react-use'

import styles from './modal.module.scss'

export type Modal = {
  visible: boolean
  title: string
  data: React.ReactNode
  filter: boolean
}
export type ModalHandler = (title?: Modal['title'], data?: Modal['data'], filter?: Modal['filter']) => void

export const useModal = () => {
  const [modal, setModal] = useState<Modal>({
    visible: false,
    title: '',
    data: null,
    filter: false
  })

  const handleModal: ModalHandler = (title = '', data = null, filter = false) => {
    setModal(prevModal => ({
      title,
      data,
      visible: !prevModal.visible,
      filter
    }))
  }

  return { modal, setModal: handleModal }
}

type ModalProps = {
  title: string
  visible: boolean
  filter: boolean
  children: React.ReactNode
  onClose: () => void
}

const ModalComponent = ({ title, visible, filter, children, onClose }: ModalProps) => {
  const [query, setQuery] = useState('')

  const isLetter = (e: KeyboardEvent) => /^Key([A-Z])$/.test(e.code)
  const isSpace = (e: KeyboardEvent) => e.code === 'Space'
  const isBackspace = (e: KeyboardEvent) => e.code === 'Backspace'

  useEffect(() => setQuery(''), [filter])

  useKey(
    e => filter && (isLetter(e) || isSpace(e) || isBackspace(e)),
    e => {
      if (isBackspace(e)) {
        setQuery(prevQuery => prevQuery.slice(0, -1))
      } else {
        setQuery(prevQuery => prevQuery + e.key)
      }
    }
  )

  if (!visible) return null

  return (
    <ModalChild title={title} query={query} onClose={onClose} filter={filter}>
      {children}
    </ModalChild>
  )
}

type ModalChildProps = {
  title: string
  children: React.ReactNode
  query: string
  filter: boolean
  onClose: () => void
}

const ModalChild = ({ title, filter, children, query, onClose }: ModalChildProps) => {
  const handleFilter = () => {
    return React.Children.toArray(children)
      .flatMap(child => {
        if (!React.isValidElement(child)) return []

        return typeof child.props.children === 'string' ? [child as React.ReactElement] : []
      })
      .filter(item => item.props.children.toLowerCase().includes(query))
      .sort((a, b) => {
        const valA = a.props.children.toLowerCase()
        const valB = b.props.children.toLowerCase()

        if (query.length > 0) {
          if (valA.startsWith(query) && valB.startsWith(query)) return 0
          else if (valA.startsWith(query)) return -1
          else if (valB.startsWith(query)) return 1
        }

        return valA.localeCompare(valB)
      })
  }

  return (
    <MUIModal open={true} onClose={onClose}>
      <Card id={styles.modal}>
        <div id={styles.header}>
          <Typography variant='h5' id={styles.label}>
            {title}
          </Typography>
          {query.length > 0 && <Typography id={styles.query}>{query}</Typography>}
        </div>

        <div id={styles.body}>
          <div id={styles.content}>{filter ? handleFilter() : children}</div>
          <div id={styles.actions}>
            <Button size='small' variant='contained' color='error' onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </Card>
    </MUIModal>
  )
}

export default ModalComponent
