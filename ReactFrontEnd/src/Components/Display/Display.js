import { useState } from "react";
import "./Display.css";


const Display = ({ account, contract }) => {
    const [data, setData] = useState(null);
    const getData = async () => {


        let dataArray;
        const otherAddress = document.querySelector(".address").value;
        try {
            if (otherAddress) {
                dataArray = await contract.display(otherAddress);
            } else {
                dataArray = await contract.display(account);
            }

            const isEmpty = Object.keys(dataArray).length === 0;
            if (!isEmpty) {
                const str = dataArray.toString();
                const str_array = str.split(",");
                console.log("str->>>", str);
                console.log("str_array->>>", str_array);

                const images = str_array.map((item, i) => {
                    return (
                        <a href={item} key={i} target="_blank" rel="noreferrer">
                            <img key={i} src={`https://gateway.pinata.cloud/ipfs${item.substring(6)}`} alt="new" className="image-list"></img>
                        </a>
                    );
                })

                setData(images);
            } else {
                alert("Not image to display");
            }

        } catch (error) {
            console.log(error);
            alert("No Access this detail");
        }



    }

    return (<>
        <div className="image-list">{data}</div>
        <input type="text" placeholder="Enter Address" className="address" ></input>
        <button className="center button" onClick={getData}>Get Data</button>
    </>);
};

export default Display;