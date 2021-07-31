import React, { useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import DWT from './/services/scan/dwt';
import { DocumentViewer } from './components/viewer/document-viewer';

function App() {
  const [scannersList, setScannersList] = useState(new Array<any>());
  const [pages, setPages] = useState(new Array<string>());
  let dwt: any;

  const onEmitPage = (page: string) => {
    setPages(arr => [...arr, page]);
  }

  return (
    <div>
      <DWT ref={self => dwt = self} hideDisplay={true} getAvailableScanners={(s) => setScannersList(s)} emitNewPage={onEmitPage} />
      <select>
        {scannersList.map((s) => (<option key={s} value={s}>{s}</option>))}
      </select>
      <button onClick={() => (dwt as DWT).acquireImage()}>scan</button>
      <p />
      <DocumentViewer images={pages} mode={'single'} format={'base64'} />
    </div>
  );
}

export default App;
