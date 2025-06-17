import React from 'react';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import styles from './styles.module.css';

const PRODUCT_TAG_CONFIG = {
  'netbox-cloud': {
    label: 'NetBox Cloud',
    className: 'pill-cloud',
    color: '#00d9be'
  },
  'netbox-enterprise': {
    label: 'NetBox Enterprise', 
    className: 'pill-enterprise',
    color: '#ffac00'
  },
  'netbox-community': {
    label: 'NetBox Community',
    className: 'pill-community', 
    color: '#00bee0'
  },
  'netbox-airgap': {
    label: 'NetBox Air-Gap',
    className: 'pill-airgap',
    color: '#ff0078'
  }
};

export default function ProductTags({ tags }) {
  // If tags are provided directly, use them; otherwise try to get from doc context
  let tagsToUse = tags;
  
  if (!tagsToUse) {
    try {
      const doc = useDoc();
      tagsToUse = doc?.frontMatter?.tags || [];
    } catch (error) {
      // Not in a doc context, return null
      return null;
    }
  }

  if (!tagsToUse || tagsToUse.length === 0) {
    return null;
  }

  // Filter to only show product-related tags
  const productTags = tagsToUse.filter(tag => {
    const tagKey = typeof tag === 'string' ? tag : tag.label?.toLowerCase().replace(/\s+/g, '-');
    return PRODUCT_TAG_CONFIG[tagKey];
  });

  if (productTags.length === 0) {
    return null;
  }

  return (
    <div className={styles.productTags}>
      {productTags.map((tag, index) => {
        const tagKey = typeof tag === 'string' ? tag : tag.label?.toLowerCase().replace(/\s+/g, '-');
        const config = PRODUCT_TAG_CONFIG[tagKey];
        
        if (!config) return null;
        
        return (
          <span
            key={index}
            className={`${styles.productTag} ${config.className}`}
            style={{ backgroundColor: config.color }}
          >
            {config.label}
          </span>
        );
      })}
    </div>
  );
} 