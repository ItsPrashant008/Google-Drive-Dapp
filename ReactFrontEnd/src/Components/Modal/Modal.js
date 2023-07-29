import { useEffect } from 'react';
import "./Modal.css";

const Modal = ({ setModalOpen, contract }) => {
    const sharing = async () => {
        const address = document.querySelector(".address").value;
        await contract.allow(address);
        setModalOpen(false);
    }


    useEffect(() => {
        const accessList = async () => {
            const accessList = await contract.shareAccess();
            let select = document.querySelector("#selectNumber");
            const options = accessList;

            for (let i = 0; i < options.length; i++) {
                let opt = options[i];
                console.log(opt);
                let e1 = document.createElement("option");
                e1.textContent = opt;
                e1.value = opt;
                select.appendChild(e1);
            }
        }
        accessList();
    }, []);

    return (<>
        <div className='modalBackground'>
            <div className='modalContainer'>
                <div className='title'>Share With</div>
                <div className='body'>
                    <input type="text" className='address' placeholder='Enter Shared Person Address'></input>
                </div>
                <form id="myForm">
                    <select id="selectNumber">
                        <option className='address'>People with Address</option>
                    </select>
                </form>
                <div className='footer'>
                    <button onClick={() => { setModalOpen(false) }} id="cancelBtn">Cancel</button>
                    <button onClick={() => sharing()}>Share</button>
                </div>
            </div>
        </div>
    </>);
};

export default Modal;