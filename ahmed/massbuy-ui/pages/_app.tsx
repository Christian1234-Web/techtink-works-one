import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { Inter } from '@next/font/google' 

const inter = Inter({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
}) 

export default function App({ Component, pageProps }: AppProps) {
  return(
    <main className={inter.className}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </main>
  )
}
