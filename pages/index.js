import styleIndex from 'styles/css/Index.module.css';
import { GlobalHead } from 'heads/GlobalHead';
import { Body, Section, Content } from 'components/Timoideas';
import { useEffect, useState } from 'react';

export default function Index() {
  return (
    <>
      <GlobalHead />
      <Body>
        <Section size={1}>Hola Mundo</Section>
      </Body>
    </>
  );
}
