import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Main from './layout/Main'
import Footer from './layout/Footer'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <div className="flex flex-col min-h-screen">
            <Main>
                <h1>Hello World</h1>
            </Main>
            <Footer stickToBottom>
                <div className="container mx-auto px-4">
                    <p className="text-sm text-muted-foreground">
                        &copy; {new Date().getFullYear()} Component Library. All rights reserved.
                    </p>
                </div>
            </Footer>
        </div>
    </StrictMode>)
