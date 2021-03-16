import style from 'styles/css/Index.module.css';
import { Header_Main } from 'heads/Header_Main';
import {
  Body,
  Section,
  Content,
  ColorPicker,
} from 'components/Resources/Timoideas';
import BienvenidaSockets from 'components/BienvenidaSockets';
import { useState } from 'react';

export default function Index() {
  const [ShowColorPicker, setShowColorPicker] = useState(false);
  const toggleColorPicker = () => {
    setShowColorPicker(!ShowColorPicker);
  };
  return (
    <>
      <Header_Main />
      <Body>
        <Section size={1}>
          <Content center flex={0.5}>
            <ColorPicker
              position={'0 0 0 0'}
              active={[ShowColorPicker, toggleColorPicker, false]}
            ></ColorPicker>
            <h1 className={style.Title}>Picker</h1>
            {/* <BienvenidaSockets /> */}
          </Content>
        </Section>
      </Body>
    </>
  );
}
