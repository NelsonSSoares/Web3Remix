

export default function Create() {
  return (
    <>
      <div className="container">
        <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3 mt-5">Donate Crypto</h1>
        <p>Preencha os campos para incluir sua campanha na plataforma.</p>
        <p>Ao término do cadastro, você reberá o link para divulga-la e receber as doações</p>
        <hr className="col-6" />   
        <div className="form-floating mb-3">
            <input type="text" className="form-control" id="tile" placeholder="Nome da campanha" />
            <label htmlFor="title" className="">Titulo:</label>
        </div>
        <div className="form-floating mb-3">
            <textarea type="text" className="form-control" id="description" placeholder="Nome da campanha" />
            <label htmlFor="description" className="">Descrição:</label>
        </div>
        <div className="form-floating mb-3">
            <input type="text" className="form-control" id="imageUrl" placeholder="Nome da campanha" />
            <label htmlFor="imageUrl" className="">URL da Imagem:</label>
        </div>
        <div className="form-floating mb-3">
            <input type="text" className="form-control" id="videoUrl" placeholder="Nome da campanha" />
            <label htmlFor="videoUrl" className="">Url do Video:</label>
        </div>
        <div className="col-12 mb-3">
            <button className="btn btn-primary col-12 p-3">Salvar</button>
        </div>

        <div className="alert alert-success p-3 col-12" role="alert">Campanha cadastrada com sucesso!</div>
          
      </div>
    </>
  );
}