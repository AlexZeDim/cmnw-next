import Head from 'next/head';
import React from 'react';
import { metaHead } from '../../types/components';
import { domain } from '../../constants/domain';

const MetaHead: React.FC<metaHead> = ({ title, description, image }) => {
  return (
    <Head>
      <title>{title}</title>

      <meta name="description" content={description}/>

      <meta property="og:type" content="website"/>
      <meta property="og:url" content={domain}/>
      <meta property="og:title" content={title}/>
      <meta property="og:description" content={description}/>
      <meta property="og:image" content={image}/>

      <meta property="twitter:card" content="summary_large_image"/>
      <meta property="og:url" content={domain}/>
      <meta property="twitter:title" content={title}/>
      <meta property="twitter:description" content={description}/>
      <meta property="twitter:image" content={image}/>

      <script type="text/javascript" src="../power.js"/>
    </Head>
  )
}

export default MetaHead;
