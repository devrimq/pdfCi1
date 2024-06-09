import React, { useState } from "react";
import "./ResimdenPdf.css";
import jsPDF from "jspdf";
import CanvasTitle from "./CanvasTitle";

const ResimdenPdf = () => {
  const [image, setImage] = useState(null);
  const [filename, setFilename] = useState("");
  const [imageSelected, setImageSelected] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setImageSelected(true);
    }
  };

  const handleFileNameChange = (e) => {
    setFilename(e.target.value);
  };
  
  const ConvertToPdf = () => {
    const img = new Image();
    img.src = image;
    img.onload = () => {
      const pdf = new jsPDF('p', 'mm', [img.width, img.height]);

      // İmaj boyutu pdf'den büyükse
      if (img.width > pdf.internal.pageSize.getWidth()) {
        const ratio = pdf.internal.pageSize.getWidth() / img.width;
        const height = img.height * ratio;
        pdf.addImage(img, 'JPEG', 0, 0, pdf.internal.pageSize.getWidth(), height);
      } else {
        pdf.addImage(img, 'JPEG', 0, 0, img.width, img.height);
      }

      const finalFilename = filename === '' ? 'pdfim.pdf' : `${filename}.pdf`;
      const blob = pdf.output('blob');
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = finalFilename;
      link.href = url;
      link.click();
      // İndirme sonrası temizle   
      setTimeout(() => {
        URL.revokeObjectURL(url);
        setImage(null);
        setFilename('');
        setImageSelected(false);
      }, 100);
    };
  };

  return (
    <>
      <div className="container">
        <CanvasTitle text="Pdfci" fontSize={60} />
        <div className="subcontainer">
          <CanvasTitle text="Resimden Pdf Oluşturucu" fontSize={30} />
          <div className="input-container">
            <div className="custom-file-input-container">
              <label
                className="custom-file-input-container label"
                htmlFor="file-input"
              >
                Resim Seç
              </label>
              <input
                className="main-input"
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            {imageSelected && (
              <>
                <div className="preview-container">
                  <img className="preview-image" alt="Selected" src={image} />
                  <div className="file-name-input-container">
                    <input
                      placeholder="Dosya adını girin"
                      id="file-name-input"
                      type="text"
                      value={filename}
                      onChange={handleFileNameChange}
                    />
                  </div>
                  <button className="convert-button" onClick={ConvertToPdf}>
                    Dönüştür
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ResimdenPdf;
