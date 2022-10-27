import React, { Component, useEffect, useRef } from 'react';

function Export() {

    const printDocument = () => {
        let mywindow = window.open('', 'PRINT', 'height=650,width=900,top=100,left=150');

        mywindow!.document.write(`<html><head><title>NotionV2</title>`);
        mywindow!.document.write('</head><body >');
        mywindow!.document.write(document.getElementById("divToPrint")!.innerHTML);
        mywindow!.document.write('</body></html>');
      
        mywindow!.document.close(); // necessary for IE >= 10
        mywindow!.focus(); // necessary for IE >= 10*/
        mywindow!.print();
        mywindow!.close();   
    }

    return (
        <div>
            <div className="mb5">
                <button onClick={printDocument}>Print</button>
            </div>
            <div id="divToPrint" className="mt5">
            
            </div>
        </div>
    );
}



export default Export;