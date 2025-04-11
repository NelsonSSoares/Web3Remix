//SPDX - License-Identifiers: MIT

pragma solidity ^0.8.17;

//Objetos no Solidity
struct Campaign{
    // tipo endereço com  validadores e funcções para pagmento
    address author;
    string title;
    string description;
    string videoUrl;
    string imageUrl;
    uint256 balance;
    bool active;
}

contract DonateCrypto {
   //valores financeiros, u = unsigned/sem sinal - numeros positivos
   uint256  public fee = 100;//wei, menor fração da moeda Ether

   // incrementador
   uint256 public nextId = 0;

    // mapeamento de ID para campanha
    mapping(uint256 => Campaign) public campaigns;

    // calldata (string calldata title) para não persistir em disco, somente leitura
    function addCampaign(string  calldata title, string calldata description , string calldata videoUrl, string calldata imageUrl ) public {

        // valor temporario em memoria, mas nao permite escrita
        Campaign memory newCampaign;
        newCampaign.title = title;
        newCampaign.description = description;
        newCampaign.videoUrl= videoUrl;
        newCampaign.imageUrl = imageUrl;
        newCampaign.active = true;
        
        // msg = blockchain massage, Objeto com dados sobre a requisisão foi a blockchain
        // toda chamada de função por debaixo dos panos é passado este parametro
        newCampaign.author = msg.sender;

        nextId++;
        campaigns[nextId] = newCampaign;
    }

    //payable | junto com a função, a carteira pode enviar uma quantia em dinheiro
    function donate(uint256 id) public payable  {

        // é um validador semelhante ao if, 1 param = condição, 2 param error message
        require(msg.value > 0, "You must send a donation value greater than zero; ");

        require(campaigns[id].active == true, " Cannot donate to this campaign");

        campaigns[id].balance += msg.value;

    }


    function withdraw(uint256 id) public  {
        Campaign memory campaign = campaigns[id];
        require(campaign.author == msg.sender, "You fo not have permission");
        require(campaign.active == true, " This campaign is closed");
        require(campaign.balance > fee, "This Campaign does not enough have balance");

        address payable recipient = payable(campaign.author);
        /// valor que sera tranferido jnt coma chamada, ja descontando a taxa da plataforma
        recipient.call{value: campaign.balance - fee}("");


        campaigns[id].active = false;
    }

}