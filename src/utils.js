export const downloadFile=(json, filename)=>{
    const header = Object.keys(json[0]);
    let csv = json.map(row => header.map(fieldName => JSON.stringify(row[fieldName] || '').replace(/\\n/g, "").replace(/[|&;$%@"<>()+\\/"]/g, "")).join(','))
    csv.unshift(header.join(','));
    csv = csv.join('\r\n');
    var blob = new Blob([csv], {type: 'text/csv'});
    if (typeof window.navigator.msSaveBlob !== 'undefined') {
        // IE workaround for "HTML7007: One or more blob URLs were 
        // revoked by closing the blob for which they were created. 
        // These URLs will no longer resolve as the data backing 
        // the URL has been freed."
        window.navigator.msSaveBlob(blob, filename);
    }
    else {
        var csvURL = window.URL.createObjectURL(blob);
        var tempLink = document.createElement('a');
        tempLink.href = csvURL;
        tempLink.setAttribute('download', filename);
        tempLink.setAttribute('target', '_blank');
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
    }
  }
  export const convertDateToString=(date)=>{
    let mm = date.getMonth() + 1; // getMonth() is zero-based
    let dd = date.getDate();
    const mms=mm.toString();
    const dds=dd.toString();
    dd=dds[1]?dds:'0'+dds;
    mm=mms[1]?mms:'0'+mms;
    return [date.getFullYear(), '-', mm , '-', dd].join(''); // padding
  }