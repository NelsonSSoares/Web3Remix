"use client";

import { useEffect } from "react";
import { getCampaign } from "../../services/Web3Service";
import { userParams } from 'next/navigation';
import Web3 from "web3";



export default function Donate() {

    const params = userParams();
    const [campaign, setCampaign] = useState({});
    const [message, setMessage] = useState("");
    const [donation, setDonation] = useState(0);

    useEffect(() => {
        setMessage("Buscando campanha...");
        getCampaign(params.id)
            .then(result => {
                setMessage("");
                console.log(result);
                result.id = params.id;
                setCampaign(result);
            }).catch(err => {
                setMessage(err.message);
            });
    }, []);

    function onDonationChange(event) {
        setDonation(event.target.value);
    }

    function btnDonateClick() {
        setMessage("Doando...");
        donate(campaign.id, donation)
            .then(tx => {
                setMessage(`Doação de ${donation} POL enviada com sucesso!`);
                setDonation(0);
            })
            .catch(err => {
                setMessage(err.message);
            });
    }


    return <>
        <div className="container">
            <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3 mt-5">Donate Crypto</h1>
            <p>Verifique se esta campanha é a correta antes de finalizar a sua doação.</p>
            <hr />
            <div className="row flex-lg-row-reverse align-items-center g-5">
                <div className="col-7 ">
                    {
                        campaign.videoUrl ? <iframe width="560" height="315" src={`https://www.youtube.com/embed/${campaign.videoUrl}`}></iframe>
                            : <img src={campaign.imageUrl} className="d-block mx-lg-auto img-fluid" width="700" height="500" />
                    }
                </div>
                <div className="col-5" style={{ height: 400, scrollbars: true }}>
                    <h2>{campaign.title}</h2>
                    <p><strong>Autor: </strong>{campaign.author}</p>
                    <p className="mb-3">{campaign.description}</p>
                    <p className="fst-italic mt-5">Eai, o que achou do projeto? ja foi arrecadado{Web3.utils.fromWei(campaign.balance || 0, "ether")}
                        O Quanto você quer doar (em POL)?
                    </p>
                    <div className="mb-3">
                        <div className="input-group">
                            <input type="number" className="form-control p-3 w-50" id="donation" value={donation} onChange={onDonationChange} />
                            <span className="input-group-text">POL</span>
                            <button className="btn btn-primary w-25 p-3" onClick={btnDonateClick}>Doar</button>
                        </div>
                    </div>
                    {
                        message ? <div className="alert alert-success p-3 col-12 mt-3" role="alert">{message}</div> : <> </>
                    }

                </div>

            </div>
        </div>
    </>
}