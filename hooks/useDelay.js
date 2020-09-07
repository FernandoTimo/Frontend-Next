import { useState, useEffect } from 'react';
const [act, setact] = useState(false);
useEffect(() => {
  setTimeout(() => {
    setact(true);
  }, 5000);
});
