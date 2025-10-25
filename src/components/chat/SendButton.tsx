
import Button from "@/components/button"
import type { SendButtonProps } from "./types"
import Loader from "@/components/loader"



function SendButton(props: SendButtonProps) {
    const { loading = false, loadingText = 'Sending...', children, className, ...rest } = props
    return (
        <Button type="submit" variant="primary" size="sm" disabled={loading} className={className} {...rest}>
            <Loader variant="spinner" size="sm" color="primary" loading={loading} text={loadingText}>
                {children}
            </Loader>
        </Button>
    )
}

export default SendButton