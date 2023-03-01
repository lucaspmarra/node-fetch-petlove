// const fetch = require("node-fetch");
const cors = require("cors");
const express = require("express");
const axios = require('axios');

const app = express();
app.use(cors());
const PORT = 8999;


app.get('/', (req, res) => {
  res.send({ message: 'Home' });
});

app.get("/cep/:cep", async function (req, res) {
  try {
    const response = await axios.get(
      `https://viacep.com.br/ws/${req.params.cep}/json/`
    );
    const { cep, logradouro, localidade, uf } = await response.json();
    console.log(cep, logradouro, localidade, uf);
    res.send({
      cep,
      logradouro,
      localidade,
      uf,
    });
  } catch (error) {
    console.log(error);
    res.send({
      error: "Desculpe, não foi possível encontrar o CEP informado.",
    });
  }
});

app.get("/users", async function (req, res) {
  try {
    const response = await axios.get(
      `https://jsm-challenges.s3.amazonaws.com/frontend-challenge.json`
    )
    console.log(response);
    res.send(response);
  } catch (error) {
    res.status(404).send({ error: 'Não foi possível realizar a requisição' })

  }
})

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
