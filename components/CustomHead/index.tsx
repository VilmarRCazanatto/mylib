import Head from 'next/head'

interface CustomHeadProps {
    route_title?: string
}

const CustomHead = ({ route_title }: CustomHeadProps) => {
    return (
        <Head>
            <title>MyLib{route_title ? `: ${route_title}` : ''}</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="theme-color" content="#333" />
            <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"/>
            <meta name="apple-mobile-web-app-status-bar-style" content="#333" />
            <link rel="icon" href="/icon.png" />
            <link rel="manifest" href="manifest.webmanifest" />
        </Head>

    )
}

export default CustomHead