import React from 'react';
import Layout from '@theme-original/DocItem/Layout';
import ProductTags from '@theme/ProductTags';

export default function LayoutWrapper(props) {
  return (
    <>
      <ProductTags />
      <Layout {...props} />
    </>
  );
} 