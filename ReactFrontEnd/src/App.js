import './App.css';
import Display from './Components/Display/Display.js';
import FileUpload from './Components/FileUpload/FileUpload.js';
import Modal from './Components/Modal/Modal.js';
import NotAllowModal from './Components/Modal/notAllowModel.js';



import GoogleDrive from "../src/artifacts/contracts/GoogleDrive.sol/GoogleDrive.json";
import { useState, useEffect } from 'react';
import { ethers } from "ethers";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [balance, setBalance] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [notAllowModal, setNotAllowModal] = useState(false);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });
        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });

        await provider.send("eth_requestAccounts", []);
        setProvider(provider);

        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);

        let contractAddress = "0x7Fd7F2bD91c327480e47e613b707dCB90eEEb861";
        let contract = new ethers.Contract(contractAddress, GoogleDrive.abi, signer);
        setContract(contract);


        let balance = await provider.getBalance(address);
        let balanceEth = ethers.utils.formatEther(balance);
        setBalance(balanceEth);

      } else {
        alert("Please, First install Metamask!");
      }
    };

    provider && loadProvider();
  }, [])

  return (
    <div className="App">
      {
        !modalOpen &&
        (<button className="share" onClick={() => setModalOpen(true)}> Share </button>)
      }{" "}
      {modalOpen && (<Modal setModalOpen={setModalOpen} contract={contract}></Modal>)}{""}

      <button className="notShare" onClick={() => setNotAllowModal(true)}> Not Share </button>
      {notAllowModal && (<NotAllowModal setNotAllowModal={setNotAllowModal} contract={contract}></NotAllowModal>)}{""}



      <h1 style={{ color: 'white' }}>Google Drive</h1>
      <div className='bg'></div>
      <div className='bg bg2'></div>
      <div className='bg bg3'></div>

      <p style={{ color: 'white' }}>Account : {account ? account : 'Not Connected.'} </p>
      <p style={{ color: 'white' }}>Wallet Balance : {balance ? balance : '0.00'} </p>
      <FileUpload account={account} provider={provider} contract={contract}></FileUpload>
      <Display account={account} contract={contract}></Display>

    </div>
  );
}

export default App;
