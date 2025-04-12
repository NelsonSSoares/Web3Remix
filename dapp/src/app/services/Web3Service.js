import Web3 from 'web3';
import ABI from '../services/abi.json';

const CONTRACT_ADDRESS = "0x0FA43757f700641B7Ccc6132b05651B40633C467";

// esta função conecta a carteira do usuário com o site
// ela é chamada quando o usuário clica no botão de conectar a carteira

export async function doLogin(){
    if(!window.ethereum) throw new Error("MetaMask not installed");

    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.requestAccounts();

    if(!accounts || !accounts.length) throw new Error("Carteira não encontrada");

    localStorage.setItem("wallet", accounts[0]);

    return accounts[0];

}
// esta função configura o contrato, passando o endereço e a ABI
// ela é chamada quando o usuário clica no botão de criar campanha
function getContract(){
    const web3 = new Web3(window.ethereum);

    const from = localStorage.getItem("wallet");

    return new web3.eth.Contract(ABI, CONTRACT_ADDRESS, {from});
}

export async function addCampaign(campaign){

    const contract = getContract();
    return contract.methods.addCampaign(
        campaign.title,
        campaign.description,
        campaign.imageUrl,
        campaign.videoUrl
).send(); // envia a transação para a rede Ethereum

}

export async function getLastCampaigns(){
    const contract = getContract();
    return contract.methods.nextId().call(); // chama o método nextId do contrato, que retorna o id da próxima campanha
}

export async function donate(id, donation){
    await doLogin();
    const contract = getContract();
    return contract.methods.donate(id).send({
        value: Web3.utils.donate(id).send({
            value: Web3.utils.toWei(donation, "ether")
        })
    });
}
