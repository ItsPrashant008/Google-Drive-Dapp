import { useState } from "react";
import axios from "axios";
import "./FileUpload.css";

const FileUpload = ({ account, provider, contract }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No Image Selected");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `8e861ac0bc2d2740a4d0`,
            pinata_secret_api_key: `5e87bef9cb1419a586e9f052f690cef83d732a4d13dacc75bd154e16a8fd0a23`,
            "Content-Type": "multipart/form-data",
          },
        });

        const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
        contract.add(account, ImgHash);
        alert("Successfully Image Uploaded!");

        setFileName("No Image Selected");
        setFile(null);
      } catch (error) {
        // console.log("error", error);
        alert("Something went wrong!");
      }
    }
  };

  const retriveFile = async (e) => {
    e.preventDefault();

    const data = e.target.files[0];
    console.log("data->>>", data);
    if (data) {
      const reader = new window.FileReader();
      reader.readAsArrayBuffer(data);
      reader.onloadend = () => {
        setFile(e.target.files[0]);
      };

      setFileName(e.target.files[0].name);
    } else {
      setFileName("No Image Selected");
      setFile(null);
      alert("Image not Selected");
    }
  };

  return (
    <>
      <div className="top">
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="file-upload" className="choose">
            Choose a File
          </label>
          <input
            type="file"
            disabled={!account}
            name="data"
            id="file-upload"
            onChange={retriveFile}
          />
          <span className="textarea">Image: {fileName}</span>
          <button type="submit" className="upload" disabled={!file}>
            Upload
          </button>
        </form>
      </div>
    </>
  );
};

export default FileUpload;
