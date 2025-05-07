import React, { type ReactNode } from 'react';
import NavbarLayout from '@theme/Navbar/Layout';


import Header from '../../components/global/header/Header'
import { options } from '../../components/global/options'

export default function Navbar(): ReactNode {

  // console.log(options);
  return (

    <NavbarLayout>
      <Header options={options} />

    </NavbarLayout>

  );
}
