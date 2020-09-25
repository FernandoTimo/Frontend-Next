import styleIndex from 'styles/css/Index.module.css';
import { Header_Main } from 'heads/Header_Main';
import {
  Body,
  Section,
  Content,
  Spinner_Rainbow,
} from 'components/Resources/Timoideas';
import { useEffect, useState } from 'react';
import { useDevice } from 'hooks/useDevice';
import useScroll from 'hooks/useScroll';
import { StoreClient, StoreAdmin, useStore } from 'hooks/useStore';
export default function Index() {
  useEffect(() => {
    setTimeout(function () {
      // Already scrolled?
      if (window.pageYOffset === 0) {
        window.scrollTo(0, 800);
      }
    }, 1000);
  }, []);
  const { InvoiceStore, setInvoiceStore } = useStore();

  let asd = {
    _id: '46sad1v8we411f6a5',
    cover:
      'https://instagram.faqp2-2.fna.fbcdn.net/v/t51.2885-15/e35/s1080x1080/118643918_184506266418940_2231398615849041907_n.jpg?_nc_ht=instagram.faqp2-2.fna.fbcdn.net&_nc_cat=104&_nc_ohc=Ux0iWVhkmjMAX_2W8zC&_nc_tp=15&oh=234703c007ca5859b1c643573c3c2c2c&oe=5F8FE2FC',
    precio: 1.2,
  };
  return (
    <>
      <Header_Main />
      <Body>
        <StoreClient Yape={{ numero: '966682190', nombre: 'Captivant' }} />
        <Section size={3}>
          <Content center flex={0.5}>
            <Content center flex={0.5}>
              <h3>0 = Yape Init</h3>
              <h3>1 = Adjuntar y Enviar</h3>
              <h3>1... = Enviando Adjuntado</h3>
              <h3>1 ✅ = Recivido en server</h3>
              <h3>2... = LlenarDatos</h3>
              <h3>2 = EnviarDatos</h3>
              <h3>2 ✅ = Codigo Recivido</h3>b
              <button
                onClick={() => {
                  console.log(InvoiceStore);
                }}
              >
                Items
              </button>
              <button onClick={() => setInvoiceStore.addProduct(asd)}>1</button>
            </Content>
          </Content>
        </Section>
      </Body>
    </>
  );
}
