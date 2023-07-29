import { useEffect } from 'react';
import "./Modal.css";

const NotAllowModal = ({ setNotAllowModal, contract }) => {
    const sharing = async () => {
        const address = document.querySelector("#selectNumber").value;
        console.log(address);
        await contract.disallow(address);
        setNotAllowModal(false);
    }

    useEffect(() => {
        const accessList = async () => {
            const accessList = await contract.shareAccess();
            let select = document.querySelector("#selectNumber");
            const options = accessList;

            for (let i = 0; i < options.length; i++) {
                let optAll = options[i];
                console.log("optAll->>>>", optAll);
                let e1 = document.createElement("option");
                e1.textContent = optAll.user;
                e1.value = optAll.user;
                if(optAll.access){
                    select.appendChild(e1);
                }
            }
        }
        accessList();
    }, []);

    return (<>
        <div className='modalBackground'>
            <div className='modalContainer'>
                <div className='title'>Not Allowed to user</div>
                <form id="myForm">
                    <select id="selectNumber">
                        <option className='address'>People with Address</option>
                    </select>
                </form>
                <div className='footer'>
                    <button onClick={() => { setNotAllowModal(false) }} id="cancelBtn">Cancel</button>
                    <button onClick={() => sharing()}>Not Share</button>
                </div>
            </div>
        </div>
    </>);
};

export default NotAllowModal;