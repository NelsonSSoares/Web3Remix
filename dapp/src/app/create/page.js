"use client";
import { useState } from 'react';
import { addCampaign, getLastCampaigns } from '../services/Web3Service';;

export default function Create() {


    const [message, setMessage] = useState("");
    const [campaign, setCampaign] = useState({
        title: "",
        description: "",
        imageUrl: "",
        videoUrl: ""
    });

    function onInputChange(event){
        setCampaign(prevState => ({...prevState, [event.target.id]: event.target.value}));
    }

    function btnSaveClick(){
        setMessage("Salvando campanha...");
        addCampaign(campaign)
            .then(tx => getLastCampaigns())
            .then(id => setMessage(`Campanha criada com sucesso! ID: ${id}, em breve ea estará pronta, use este link para divulga-la: https://localhost:3000/donate/${id}`)) 
            .catch(err => {
                setMessage(err.message);
            });
    }

    return (
        <>
            <div className="container">
                <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3 mt-5">Donate Crypto</h1>
                <p>Preencha os campos para incluir sua campanha na plataforma.</p>
                <p>Ao término do cadastro, você reberá o link para divulga-la e receber as doações</p>
                <hr className="col-6" />
                <div className="form-floating mb-3">
                    <input value={campaign.title || ""} onChange={onInputChange} type="text" className="form-control" id="title" placeholder="Nome da campanha" />
                    <label htmlFor="title" className="">Titulo:</label>
                </div>
                <div className="form-floating mb-3">
                    <textarea value={campaign.description || ""} onChange={onInputChange} type="text" className="form-control" id="description" placeholder="Nome da campanha" />
                    <label htmlFor="description" className="">Descrição:</label>
                </div>
                <div className="form-floating mb-3">
                    <input value={campaign.imageUrl || ""} onChange={onInputChange} type="text" className="form-control" id="imageUrl" placeholder="Nome da campanha" />
                    <label htmlFor="imageUrl" className="">URL da Imagem:</label>
                </div>
                <div className="form-floating mb-3">
                    <input value={campaign.videoUrl ||  ""}onChange={onInputChange} type="text" className="form-control" id="videoUrl" placeholder="Nome da campanha" />
                    <label htmlFor="videoUrl" className="">Url do Video:</label>
                </div>
                <div className="col-12 mb-3">
                    <button className="btn btn-primary col-12 p-3" onClick={btnSaveClick}>Salvar</button>
                </div>

                {
                    message ? <div className="alert alert-success p-3 col-12 mt-3" role="alert">{message}</div> : <> </>
                }


            </div>
        </>
    );
}