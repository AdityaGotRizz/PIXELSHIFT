import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image, url, type = 'website' }) => {
    const siteTitle = 'BoltStudio | Bolt Your Brand to the Future';
    const defaultDescription = 'Scale your business at Bolt speed with BoltStudio. We specialize in AI automation, creative design, and digital transformation.';
    const defaultKeywords = 'bolt, bolt studio, ai automation, creative agency, digital growth, artificial intelligence';
    const defaultImage = 'https://boltstudio.ai/og-image.jpg';
    const siteUrl = 'https://boltstudio.ai';

    const metaTitle = title ? `${title} | BoltStudio` : siteTitle;
    const metaDescription = description || defaultDescription;
    const metaKeywords = keywords || defaultKeywords;
    const metaImage = image || defaultImage;
    const metaUrl = url ? `${siteUrl}${url}` : siteUrl;

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{metaTitle}</title>
            <meta name="description" content={metaDescription} />
            <meta name="keywords" content={metaKeywords} />
            <meta name="author" content="BoltStudio" />
            <link rel="canonical" href={metaUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={metaUrl} />
            <meta property="og:title" content={metaTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={metaImage} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={metaUrl} />
            <meta name="twitter:title" content={metaTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={metaImage} />

            {/* Verification Tags (Placeholders) */}
            <meta name="google-site-verification" content="YOUR_GOOGLE_VERIFICATION_CODE" />
            <meta name="msvalidate.01" content="YOUR_BING_VERIFICATION_CODE" />
        </Helmet>
    );
};

export default SEO;
