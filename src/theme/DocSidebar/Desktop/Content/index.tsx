import React, {type ReactNode} from 'react';
import Content from '@theme-original/DocSidebar/Desktop/Content';
import type ContentType from '@theme/DocSidebar/Desktop/Content';
import type {WrapperProps} from '@docusaurus/types';
import SearchBar from '@theme/SearchBar';

type Props = WrapperProps<typeof ContentType>;

export default function ContentWrapper(props: Props): ReactNode {
  return (
    <>
      <div style={{padding: '0.5rem 1rem'}}>
        <SearchBar />
      </div>
      <Content {...props} />
    </>
  );
}
