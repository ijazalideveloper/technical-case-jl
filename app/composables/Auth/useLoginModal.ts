export function useLoginModal() {
    const isOpen = useState('login_modal_open', () => false)
    const articleTitle = useState<string | null>('login_modal_title', () => null)

    function open(title?: string) {
        if (title !== undefined) articleTitle.value = title
        isOpen.value = true
    }

    function close() {
        isOpen.value = false
        articleTitle.value = null
    }

    return { isOpen, articleTitle, open, close }
}
