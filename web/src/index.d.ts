interface ModalType {
  showModal: () => void
  close: () => void
}
declare let window:
  | (Window &
      typeof globalThis & {
        [id: string]: ModalType
      })
  | undefined

export {}
