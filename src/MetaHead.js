import Head from 'next/head'
import React from "react";

export default function MetaHead ({ title, description, image }) {
    return (
        <Head>
            <title>{title}</title>

            <meta name="description" content={ description }/>

            <meta property="og:type" content="website"/>
            <meta property="og:url" content="https://conglomerat.group/"/>
            <meta property="og:title" content={ title }/>
            <meta property="og:description" content={ description }/>
            <meta property="og:image" content={ image }/>

            <meta property="twitter:card" content="summary_large_image"/>
            <meta property="og:url" content="https://conglomerat.group/"/>
            <meta property="twitter:title" content={ title }/>
            <meta property="twitter:description" content={ description }/>
            <meta property="twitter:image" content={ image }/>
        </Head>
    )
}
