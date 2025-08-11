interface SubmitButtonProps {
  loading: boolean
  children: React.ReactNode
}

function SubmitButton({ loading, children }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="rounded bg-blue-600 px-4 py-2 text-sm text-white disabled:opacity-50"
    >
      {loading ? 'Loading...' : children}
    </button>
  )
}

export default SubmitButton
